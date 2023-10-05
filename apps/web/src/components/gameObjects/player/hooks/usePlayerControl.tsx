import { PublicApi } from '@react-three/cannon';
import { CameraControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MutableRefObject, useRef } from 'react';
import { Vector3 } from 'three';
import { useMoveInput } from './useMoveInput';

const Speed = 100;
const CameraStep = 0.1;

type Props = {
  playerPysicsApi: PublicApi;
  cameraControlRef: MutableRefObject<CameraControls | null>;
};

export const usePlayerControl = ({
  playerPysicsApi,
  cameraControlRef,
}: Props) => {
  const { goRight, goForward, cameraDistance } = useMoveInput({
    maxCameraDistance: 20,
    minCameraDistance: 8,
  });
  const currenPostion = useRef([0, 0, 0]);
  const currenVelocity = useRef([0, 0, 0]);

  useFrame((_, delta) => {
    const camera = cameraControlRef.current?.camera;
    if (!camera) {
      return;
    }

    playerPysicsApi.position.subscribe((v) => (currenPostion.current = v));
    playerPysicsApi.velocity.subscribe((v) => (currenVelocity.current = v));

    const velocity = new Vector3(0, 0, 0);
    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);

    const forward = new Vector3();
    forward.setFromMatrixColumn(camera.matrix, 0);
    forward.crossVectors(camera.up, forward);

    const right = new Vector3();
    right.setFromMatrixColumn(camera.matrix, 0);

    if (goRight !== 0 && goForward !== 0) {
      velocity
        .add(forward.clone().multiplyScalar(Speed * goForward))
        .add(right.clone().multiplyScalar(Speed * goRight));
      velocity.clampLength(-Speed, Speed);
    } else if (goRight !== 0) {
      velocity.add(right.clone().multiplyScalar(Speed * goRight));
    } else if (goForward !== 0) {
      velocity.add(forward.clone().multiplyScalar(Speed * goForward));
    }

    playerPysicsApi.velocity.set(
      velocity.x * delta,
      currenVelocity.current[1],
      velocity.z * delta,
    );
    /** Updates camera position */
    camera.position.set(
      currenPostion.current[0] -
        cameraDistance * cameraDirection.x * CameraStep,
      currenPostion.current[1] + cameraDistance * 0.5 * CameraStep + 0.3,
      currenPostion.current[2] -
        cameraDistance * cameraDirection.z * CameraStep,
    );
    /** Updates player rotation */
    playerPysicsApi.rotation.set(
      0,
      Math.atan2(-cameraDirection.x, -cameraDirection.z),
      0,
    );

    /** 避免玩家飛出去 */
    if (currenPostion.current[1] < 0) {
      playerPysicsApi.position.set(
        currenPostion.current[0],
        0,
        currenPostion.current[2],
      );
      playerPysicsApi.velocity.set(0, 0, 0);
    }

    if (currenPostion.current[1] > 10) {
      playerPysicsApi.position.set(
        currenPostion.current[0],
        10,
        currenPostion.current[2],
      );

      playerPysicsApi.velocity.set(0, -1, 0);
    }
  });

  return {
    isFirstPerson: cameraDistance < 0.5,
    animation: goRight || goForward ? 'walk' : 'idle',
  };
};
