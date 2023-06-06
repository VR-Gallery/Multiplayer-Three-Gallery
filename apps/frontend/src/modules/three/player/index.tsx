import React, { useState, FC, MutableRefObject, useEffect } from "react";
import { Model as FemaleModel } from "./ModelFemale";
import { Model as MaleModel } from "./ModelMale";
import { PlayerActionName } from "models";

import { Euler, useFrame, Vector3 } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { socket } from "@/utils/socket";
import { Player, PlayerModels } from "models";
import useCamaeraControl from "./hooks/useCamaeraControl";
import useControl from "./hooks/useControl";
import { ControlType } from "@/modules/three/sence";
import useAnimation from "./hooks/useAnimation";
import { useLocalParticipant } from "@daily-co/daily-react";
import { atom, useRecoilValue } from "recoil";
import { match, P } from "ts-pattern";
import { joinState } from "@modules/three/sence";

export const playerState = atom<{
  name: string;
  useModelType: keyof typeof PlayerModels;
}>({
  key: "player",
  default: {
    name: "尚未命名",
    useModelType: "male",
  },
});

type Props = {
  controlType: ControlType;
  CameraControlRef: MutableRefObject<CameraControls | null>;
};

const GameObject: FC<Props> = ({ controlType, CameraControlRef }) => {
  const { name, useModelType } = useRecoilValue(playerState);
  const { isJoined, isDailyJoined } = useRecoilValue(joinState);
  const { motion, position, rotation, scale, playAnimation } = useControl(
    controlType,
    CameraControlRef
  );
  const localParticipant = useLocalParticipant();

  const {
    scale: startingScale,
    position: startingPosition,
    playAnimation: startingPlayAnimation,
    isPlaying,
  } = useAnimation(position[0], position[2]);

  useCamaeraControl(controlType, CameraControlRef, isPlaying, position, motion);

  useEffect(() => {
    if (!isJoined) {
      return;
    }
    const newPlayer: Player = {
      id: socket.id,
      name: name,
      useModelType: useModelType,
      position: position as [number, number, number],
      rotation: rotation as [number, number, number],
      playAnimation: playAnimation as PlayerActionName,
      dailySessionId: localParticipant?.session_id ?? null,
    };
    socket.emit("player:join", newPlayer);
  }, [isJoined]);

  useFrame(() => {
    if (!isJoined) {
      return;
    }
    const player: Player = {
      id: socket.id,
      name: name,
      useModelType: useModelType,
      position: position as [number, number, number],
      rotation: rotation as [number, number, number],
      playAnimation: playAnimation as PlayerActionName,
      dailySessionId: localParticipant?.session_id ?? null,
    };
    socket.emit("player:updateState", player);
  });

  return match(useModelType)
    .with("male", () => (
      <MaleModel
        visible={controlType === "ThirdPerson"}
        position={isPlaying ? startingPosition : (position as Vector3)}
        rotation={rotation as Euler}
        scale={isPlaying ? startingScale : scale}
        playAnimation={isPlaying ? startingPlayAnimation : playAnimation}
      />
    ))
    .with("female", () => (
      <FemaleModel
        visible={controlType === "ThirdPerson"}
        position={isPlaying ? startingPosition : (position as Vector3)}
        rotation={rotation as Euler}
        scale={isPlaying ? startingScale : scale}
        playAnimation={isPlaying ? startingPlayAnimation : playAnimation}
      />
    ))
    .otherwise(() => null);
};

export default GameObject;
