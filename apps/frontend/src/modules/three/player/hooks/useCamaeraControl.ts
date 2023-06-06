import { MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { Clock, Vector3 } from "three";
import { match, P } from "ts-pattern";
import { ControlType } from "@/modules/three/sence";

const thirdPersonCameraControl = (
  CameraControlRef: MutableRefObject<CameraControls>,
  position: number[],
  motion: number[]
) => {
  const cameraPosition = CameraControlRef.current.camera.position;
  const minDistance = 3;
  const maxDistance = 64;
  const distance = match(
    Math.pow(cameraPosition.x - position[0], 2) +
      Math.pow(cameraPosition.y - position[1], 2) +
      Math.pow(cameraPosition.z - position[2], 2)
  )
    .with(
      P.when((value) => value < minDistance),
      () => minDistance
    )
    .with(
      P.when((value) => value > maxDistance),
      () => maxDistance
    )
    .otherwise((value) => value);

  const targetPosition = new Vector3(
    position[0] - Math.sqrt(distance / 3),
    position[1] + Math.sqrt(distance / 3),
    position[2] - Math.sqrt(distance / 3)
  );

  const distanceToTarget = Math.sqrt(
    Math.pow(cameraPosition.x - targetPosition.x, 2) +
      Math.pow(cameraPosition.y - targetPosition.y, 2) +
      Math.pow(cameraPosition.z - targetPosition.z, 2)
  );

  CameraControlRef.current.setPosition(
    ...(match(distanceToTarget)
      .with(
        P.when((value) => value > 0.3),
        () => [
          cameraPosition.x +
            (targetPosition.x - cameraPosition.x) * 0.05 +
            motion[0],
          cameraPosition.y + (targetPosition.y - cameraPosition.y) * 0.05,
          cameraPosition.z +
            (targetPosition.z - cameraPosition.z) * 0.05 +
            motion[2],
        ]
      )
      .otherwise(() => [
        cameraPosition.x + motion[0],
        cameraPosition.y,
        cameraPosition.z + motion[2],
      ]) as [number, number, number])
  );

  CameraControlRef.current.setTarget(
    position[0],
    position[1] + 0.3,
    position[2]
  );
};

const firstPersonCameraControl = (
  CameraControlRef: MutableRefObject<CameraControls>,
  position: number[],
  motion: number[]
) => {
  CameraControlRef.current.camera.position.set(
    position[0],
    position[1] + 0.8,
    position[2]
  );
};

const useCamaeraControl = (
  controlType: ControlType,
  CameraControlRef: MutableRefObject<CameraControls | null>,
  isPlaying: boolean,
  position: number[],
  motion: number[]
) => {
  useFrame(({ clock }) => {
    if (!CameraControlRef.current) {
      return;
    }
    const elapsed = clock.getElapsedTime();

    if (isPlaying) {
      CameraControlRef.current.setPosition(
        -4 + (position[0] - 3 + 4) * (elapsed / 2.7),
        6 + (position[1] + 3 - 6) * (elapsed / 2.7),
        -4 + (position[2] - 3 + 4) * (elapsed / 2.7)
      );
      CameraControlRef.current.setTarget(
        position[0],
        position[1] + 0.3,
        position[2]
      );
      return;
    }

    if (controlType === "ThirdPerson") {
      thirdPersonCameraControl(
        CameraControlRef as MutableRefObject<CameraControls>,
        position,
        motion
      );
    }
    if (controlType === "FirstPerson") {
      firstPersonCameraControl(
        CameraControlRef as MutableRefObject<CameraControls>,
        position,
        motion
      );
    }
  });
};

export default useCamaeraControl;
