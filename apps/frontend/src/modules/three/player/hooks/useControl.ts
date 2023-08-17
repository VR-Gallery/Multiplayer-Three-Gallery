import { MutableRefObject, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import usePersonControls from "@/modules/three/player/hooks/usePersonControls";
import { PlayerActionName } from "models";
import { CameraControls } from "@react-three/drei";
import { ControlType } from "@/modules/three/sence";
import { RapierRigidBody, quat, vec3, euler } from "@react-three/rapier";

const useControl = (
  rigidBody: RapierRigidBody | null,
  controlType: ControlType,
  CameraControlRef: MutableRefObject<CameraControls | null>
) => {
  const speed = 0.03;
  const floorHeight = 0;
  const motion = useRef([0, 0, 0]);
  const [position, setPosition] = useState([3.5, floorHeight, 3.5]);
  const [rotation, setRotation] = useState([0, Math.PI * -0.75, 0]);
  const [scale, setScale] = useState(0.5);
  const [playAnimation, setPlayAnimation] = useState<PlayerActionName>("idle");
  const { forward, backward, left, right, jump } = usePersonControls();

  useFrame((state, delta) => {
    const [mx, my, mz] = motion.current;
    if (!rigidBody) return;

    // ThirdPerson
    if (controlType === "ThirdPerson") {
      if (jump) {
        return [mx * 0.95, 0, mz * 0.95];
      }
      const forwardVector = [forward ? speed : 0, 0, forward ? speed : 0];
      const backwardVector = [backward ? -speed : 0, 0, backward ? -speed : 0];
      const leftVector = [left ? speed : 0, 0, left ? -speed : 0];
      const rightVector = [right ? -speed : 0, 0, right ? speed : 0];
      const vector = [
        forwardVector[0] + backwardVector[0] + leftVector[0] + rightVector[0],
        0,
        forwardVector[2] + backwardVector[2] + leftVector[2] + rightVector[2],
      ];
      const newMx = mx + (vector[0] - mx) * 0.15;
      const newMz = mz + (vector[2] - mz) * 0.15;

      motion.current = [
        Math.abs(newMx) < 0.001 ? 0 : newMx,
        0,
        Math.abs(newMz) < 0.001 ? 0 : newMz,
      ];

      const targetRotation =
        mx || mz
          ? [0, Math.atan2(motion.current[0], motion.current[2]), 0]
          : rotation;

      setRotation((rotation) => [
        rotation[0] + (targetRotation[0] - rotation[0]) * 0.1,
        rotation[1] + (targetRotation[1] - rotation[1]) * 0.1,
        rotation[2] + (targetRotation[2] - rotation[2]) * 0.1,
      ]);
    }

    // // FirstPersonda
    // if (controlType === "FirstPerson") {
    //   if (!CameraControlRef.current) {
    //     return;
    //   }
    //   const cameraPosition = CameraControlRef.current?.camera.position;

    //   const cameraForwardVector = CameraControlRef.current?.camera
    //     .getWorldDirection(cameraPosition)
    //     .multiplyScalar(1);

    //   // 計算鏡頭前後左右的向量與速度的乘積
    //   const forwardVector = [
    //     cameraForwardVector.x,
    //     0,
    //     cameraForwardVector.z,
    //   ].map((v) => v * (forward ? 1 : 0) * speed);

    //   const backwardVector = [
    //     cameraForwardVector.x,
    //     0,
    //     cameraForwardVector.z,
    //   ].map((v) => v * (backward ? -1 : 0) * speed);

    //   const leftVector = [cameraForwardVector.z, 0, -cameraForwardVector.x].map(
    //     (v) => v * (left ? 1 : 0) * speed
    //   );

    //   const rightVector = [
    //     cameraForwardVector.z,
    //     0,
    //     -cameraForwardVector.x,
    //   ].map((v) => v * (right ? -1 : 0) * speed);

    //   // 計算鏡頭前後左右的向量與速度的乘積的總和
    //   const forwardSpeed = [
    //     forwardVector[0] + backwardVector[0] + leftVector[0] + rightVector[0],
    //     forwardVector[1] + backwardVector[1] + leftVector[1] + rightVector[1],
    //     forwardVector[2] + backwardVector[2] + leftVector[2] + rightVector[2],
    //   ];

    //   setMotion(forwardSpeed);

    //   setRotation([
    //     0,
    //     Math.atan2(cameraForwardVector.x, cameraForwardVector.z),
    //     0,
    //   ]);
    // }

    console.log("motion", motion.current);
    rigidBody.addForce(
      {
        x: motion.current[0] * 0.001,
        y: motion.current[1] * 0.001,
        z: motion.current[2] * 0.001,
      },
      true
    );
    motion.current = [0, 0, 0];

    if (jump) {
      setPlayAnimation("jump");
    } else if (mx !== 0 || mz !== 0) {
      setPlayAnimation("walk");
    } else {
      setPlayAnimation("idle");
    }
  });

  return { motion, rotation, position, scale, playAnimation };
};

export default useControl;
