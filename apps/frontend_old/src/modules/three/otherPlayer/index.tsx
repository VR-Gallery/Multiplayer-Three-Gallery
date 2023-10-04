import React, { FC, MutableRefObject, useMemo, useState } from "react";
import { Model as FemaleModel } from "@/modules/three/player/ModelFemale";
import { Model as MaleModel } from "@/modules/three/player/ModelMale";
import { PlayerActionName } from "common-type";

import VideoScreen from "./VideoScreen";
import NameDisplay from "./NameDisplay";
import { Euler, useFrame, Vector3 } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useRecoilValue } from "recoil";
import { joinState } from "@modules/three/sence";
import { match } from "ts-pattern";

type Props = {
  position: [number, number, number];
  rotation: [number, number, number];
  name: string | null;
  playAnimation: string;
  useModelType: string;
  dailySessionId: string | null;
  CameraControlRef: MutableRefObject<CameraControls | null>;
};

const GameObject: FC<Props> = ({
  position: realPosition,
  rotation: realRotation,
  name,
  useModelType,
  playAnimation,
  dailySessionId,
  CameraControlRef,
}) => {
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  useFrame(() => {
    setPosition((position) => {
      const [x, y, z] = position;
      const [realX, realY, realZ] = realPosition;
      const dx = realX - x;
      const dy = realY - y;
      const dz = realZ - z;
      return [x + dx / 10, y + dy / 10, z + dz / 10];
    });
    setRotation((rotation) => {
      const [x, y, z] = rotation;
      const [realX, realY, realZ] = realRotation;
      const dx = realX - x;
      const dy = realY - y;
      const dz = realZ - z;
      return [x + dx / 10, y + dy / 10, z + dz / 10];
    });
  });
  const { isJoined, isDailyJoined } = useRecoilValue(joinState);

  return (
    <>
      {isDailyJoined && dailySessionId && (
        <VideoScreen position={position} dailySessionId={dailySessionId} />
      )}

      <NameDisplay
        position={position}
        name={name}
        CameraControlRef={CameraControlRef}
      />
      {match(useModelType)
        .with("male", () => (
          <MaleModel
            position={position as Vector3}
            rotation={rotation as Euler}
            scale={0.5}
            playAnimation={playAnimation as PlayerActionName}
          />
        ))
        .with("female", () => (
          <FemaleModel
            position={position as Vector3}
            rotation={rotation as Euler}
            scale={0.5}
            playAnimation={playAnimation as PlayerActionName}
          />
        ))
        .otherwise(() => null)}
    </>
  );
};

export default GameObject;
