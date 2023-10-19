'use client';

import { useGLTF, CameraControls } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';
import { useAnimationController } from '@/hooks/useAnimationController';
import { ManModel, GLTFResult } from './components/Man';
import { FC, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { usePlayerControl } from './hooks/usePlayerControl';
import { Group, Quaternion, Vector3 } from 'three';
import { useFrame, useGraph } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';
import { socket } from '@/utils/socket';
import { usePlayerEventHandler } from './hooks/usePlayerEventHandler';

type ActionName = 'idle' | 'walk';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const Player: FC<JSX.IntrinsicElements['group']> = (props) => {
  const { scene, animations } = useGLTF(
    '/player/man.glb',
  ) as unknown as GLTFResult;
  const copiedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(copiedScene) as GLTFResult;

  const { ref, onChangeAction, playAction, lastAction } =
    useAnimationController<GLTFActions>(animations, {
      idle: {
        defaultAction: true,
        fadeIn: 0.2,
        fadeOut: 0.2,
      },
      walk: {
        fadeIn: 0.2,
        fadeOut: 0.5,
      },
    });

  const cameraControlRef = useRef<CameraControls | null>(null);

  const [cylindeRef, api] = useCylinder(() => ({
    mass: 10,
    fixedRotation: true,
    position: [-4, 2, -2],
    args: [0.1, 0.1, 0.9],
    material: {
      friction: 0.01,
    },
  }));

  const { isFirstPerson, animation } = usePlayerControl({
    playerPysicsApi: api,
    cameraControlRef,
  });

  usePlayerEventHandler(api);

  useEffect(() => {
    if (playAction !== animation) {
      onChangeAction(animation as ActionName);
    }
  }, [animation]);

  const currenPostion = useRef([0, 0, 0]);
  const [isJoin, setIsJoin] = useState(false);

  useEffect(() => {
    const newPlayer: any = {
      id: socket.id,
      name: 'Test',
      useModelType: null,
      position: [
        currenPostion.current[0],
        currenPostion.current[1] - 0.2,
        currenPostion.current[2],
      ],
      rotation: [0, 0, 0],
      playAnimation: 'idle',
      dailySessionId: null,
    };
    socket.emit('player:join', newPlayer);
    setIsJoin(true);
  }, []);

  useFrame(() => {
    if (!isJoin) return;
    const camera = cameraControlRef.current?.camera;
    const forward = new Vector3(0, 0, -1);
    const quaternion = new Quaternion();

    api.position.subscribe((v) => (currenPostion.current = v));

    camera?.getWorldQuaternion(quaternion);
    forward.applyQuaternion(quaternion);

    const yRotation = Math.atan2(forward.x, forward.z) + Math.PI;
    const player: any = {
      id: socket.id,
      name: 'Test',
      position: [
        currenPostion.current[0],
        currenPostion.current[1] - 0.4,
        currenPostion.current[2],
      ],
      rotation: [0, yRotation ?? 0, 0],
      playAnimation: animation,
      dailySessionId: null,
      useModelType: null,
    };
    socket.emit('player:updateState', player);
  });

  return (
    <>
      <CameraControls ref={cameraControlRef} makeDefault />
      <group ref={cylindeRef as RefObject<Group>}>
        <ManModel
          {...props}
          scale={0.5}
          position={[0, -0.4, 0]}
          nodes={nodes}
          materials={materials}
          animationRef={ref}
          visible={!isFirstPerson}
        />
      </group>
    </>
  );
};

export default Player;
