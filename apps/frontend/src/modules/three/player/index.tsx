import React, {
  useState,
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Model as FemaleModel } from "./ModelFemale";
import { Model as MaleModel } from "./ModelMale";
import { PlayerActionName } from "models";

import { Euler, useFrame, useThree, Vector3 } from "@react-three/fiber";
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
import {
  RapierRigidBody,
  useRapier,
  MeshCollider,
  RigidBody,
} from "@react-three/rapier";
import { folder, useControls } from "leva";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

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
  const rigidBody = useRef<RapierRigidBody>(null);

  const localParticipant = useLocalParticipant();
  const { camera } = useThree();

  const bodyRef = useRef<RapierRigidBody>(null);

  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  const gui = useControls({
    Ball: folder(
      {
        radius: { value: 1 },
        body: folder({
          restitution: 0.2,
          friction: 1,
          linearDamping: 0.5,
          angularDamping: 0.5,
        }),
        impulseStrength: 50,
        torqueStrength: 30,
        jumpStrength: 90,
      },
      { collapsed: true }
    ),
  });

  //
  // 🎮 wasd
  //

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = new THREE.Vector3(0, 0, 0);
    const torque = new THREE.Vector3(0, 0, 0);

    const impulseStrength = gui.impulseStrength * delta;
    const torqueStrength = gui.torqueStrength * delta;

    if (forward) {
      impulse.z = -1;
      torque.x = -1;
    }
    if (backward) {
      impulse.z = 1;
      torque.x = 1;
    }
    if (rightward) {
      impulse.x = 1;
      torque.z = -1;
    }
    if (leftward) {
      impulse.x = -1;
      torque.z = 1;
    }

    const { current: body } = bodyRef;

    if (body && impulse.length() > 0) {
      impulse.applyMatrix4(camera.matrixWorld).sub(camera.position);
      impulse.setY(0);
      impulse.normalize().setLength(impulseStrength);
      body.applyImpulse(impulse, true);
    }

    if (body && torque.length() > 0) {
      torque.applyMatrix4(camera.matrixWorld).sub(camera.position);
      torque.setY(0);
      torque.normalize().setLength(torqueStrength);
      body.applyTorqueImpulse(torque, true);
    }
  });

  //
  // 🦘 jump
  //

  const jump = useCallback(() => {
    // console.log("jump");

    const { current: body } = bodyRef;

    if (body) {
      const origin = body.translation();

      origin.y -= gui.radius + 0.05;
      const direction = { x: 0, y: -1, z: 0 };
      const ray = new rapier.Ray(origin, direction);
      const hit = world.castRay(ray, 10, true);

      if (hit && hit.toi < 0.15) {
        body.applyImpulse({ x: 0, y: gui.jumpStrength, z: 0 }, true);
      }
    }
  }, [gui.jumpStrength, gui.radius, rapier.Ray, world]);

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state: any) => state.jump,
      (value) => {
        if (value) jump();
      }
    );

    return () => {
      unsubscribeJump();
    };
  }, [subscribeKeys, jump]);

  // useCamaeraControl(controlType, CameraControlRef, isPlaying, position, motion);

  // useEffect(() => {
  //   if (!isJoined) {
  //     return;
  //   }
  //   const newPlayer: Player = {
  //     id: socket.id,
  //     name: name,
  //     useModelType: useModelType,
  //     position: position as [number, number, number],
  //     rotation: rotation as [number, number, number],
  //     playAnimation: playAnimation as PlayerActionName,
  //     dailySessionId: localParticipant?.session_id ?? null,
  //   };
  //   socket.emit("player:join", newPlayer);
  // }, [isJoined]);

  // useFrame(() => {
  //   if (!isJoined) {
  //     return;
  //   }
  //   const player: Player = {
  //     id: socket.id,
  //     name: name,
  //     useModelType: useModelType,
  //     position: position as [number, number, number],
  //     rotation: rotation as [number, number, number],
  //     playAnimation: playAnimation as PlayerActionName,
  //     dailySessionId: localParticipant?.session_id ?? null,
  //   };
  //   socket.emit("player:updateState", player);
  // });

  return (
    <RigidBody
      scale={1}
      colliders="ball"
      ref={bodyRef}
      position={[0, 5, 0]} // ⚠️ `position` props on <RigidBody> (not on <mesh>)
      restitution={gui.restitution}
      friction={gui.friction}
      linearDamping={gui.linearDamping}
      angularDamping={gui.angularDamping}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[gui.radius, 1]} />
        <meshStandardMaterial color="red" flatShading />
      </mesh>
      {/* {match(useModelType)
          .with("male", () => (
            <MaleModel visible={true} playAnimation={"waving"} />
          ))
          .with("female", () => (
            <FemaleModel visible={true} playAnimation={"waving"} />
          ))
          .otherwise(() => null)} */}
    </RigidBody>
  );
};

export default GameObject;
