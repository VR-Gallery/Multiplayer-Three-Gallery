import React, {
  useState,
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Model as FemaleModel } from "./ModelFemale";
import { Model as MaleModel } from "./ModelMale";
import { PlayerActionName } from "models";

import { Euler, useFrame, useThree } from "@react-three/fiber";
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
import { folder, useControls } from "leva";
import { useKeyboardControls } from "@react-three/drei";
import { useBox, useSphere } from "@react-three/cannon";
import { Controls } from "@/pages";
import { Vector3, Raycaster, MathUtils, Quaternion } from "three";

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

const speed = 150;
const jumpSpeed = 5;
const jumpCoolDown = 40;

const GameObject: FC<Props> = ({ controlType, CameraControlRef }) => {
  const forwardPressed = useKeyboardControls<Controls>(
    (state) => state.forward
  );
  const backPressed = useKeyboardControls<Controls>((state) => state.back);
  const leftPressed = useKeyboardControls<Controls>((state) => state.left);
  const rightPressed = useKeyboardControls<Controls>((state) => state.right);
  const jumpPressed = useKeyboardControls<Controls>((state) => state.jump);
  const camera = CameraControlRef.current?.camera;
  const playAction = useRef<PlayerActionName>("waving");

  const [sphereRef, api] = useSphere(() => ({
    mass: 100,
    fixedRotation: true,
    position: [0, 1, 0],
    args: [0.2],
    material: {
      friction: 0,
    },
  }));

  /** Player movement constants */
  const { scene } = useThree();

  /** Player state */
  const state = useRef({
    timeToShoot: 0,
    timeTojump: 0,
    vel: [0, 0, 0],
    jumping: false,
    position: [0, 0, 0],
  });

  useEffect(() => {
    api.velocity.subscribe((v) => (state.current.vel = v));
    api.position.subscribe((v) => (state.current.position = v));
  }, [api]);

  /** Player loop */
  useFrame((_, delta) => {
    if (!camera) {
      return;
    }
    const velocity = new Vector3(0, 0, 0);
    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);

    const forward = new Vector3();
    forward.setFromMatrixColumn(camera.matrix, 0);
    forward.crossVectors(camera.up, forward);

    const right = new Vector3();
    right.setFromMatrixColumn(camera.matrix, 0);

    let [horizontal, vertical] = [0, 0];

    if (forwardPressed) {
      vertical += 1;
    }
    if (backPressed) {
      vertical -= 1;
    }
    if (leftPressed) {
      horizontal -= 1;
    }
    if (rightPressed) {
      horizontal += 1;
    }

    if (horizontal !== 0 && vertical !== 0) {
      velocity
        .add(forward.clone().multiplyScalar(speed * vertical))
        .add(right.clone().multiplyScalar(speed * horizontal));
      velocity.clampLength(-speed, speed);
    } else if (horizontal !== 0) {
      velocity.add(right.clone().multiplyScalar(speed * horizontal));
    } else if (vertical !== 0) {
      velocity.add(forward.clone().multiplyScalar(speed * vertical));
    }

    /** Updates player velocity */
    api.velocity.set(
      velocity.x * delta,
      state.current.vel[1],
      velocity.z * delta
    );

    /** Updates camera position */
    camera.position.set(
      state!.current!.position[0],
      state!.current!.position[1] + 0.7,
      state!.current!.position[2]
    );

    /** Handles jumping */
    if (state.current.jumping && state.current.vel[1] < 0) {
      /** Ground check */
      const raycaster = new Raycaster(
        new Vector3(
          state.current.position[0],
          state.current.position[1],
          state.current.position[2]
        ),
        new Vector3(0, -1, 0),
        0,
        0.2
      );
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length !== 0) {
        state.current.jumping = false;
      }
    }

    if (jumpPressed && !state.current.jumping) {
      const now = Date.now();
      if (now > state.current.timeTojump) {
        state.current.timeTojump = now + jumpCoolDown;
        state.current.jumping = true;
        api.velocity.set(state.current.vel[0], jumpSpeed, state.current.vel[2]);
      }
    }

    /** Updates player animation */
    if (velocity.length() > 0) {
      playAction.current = "walk";
    } else {
      playAction.current = "idle";
    }
  });

  const { name, useModelType } = useRecoilValue(playerState);
  const { isJoined, isDailyJoined } = useRecoilValue(joinState);

  const localParticipant = useLocalParticipant();

  useEffect(() => {
    if (!isJoined) {
      return;
    }
    const forward = new Vector3(0, 0, -1);
    const quaternion = new Quaternion();
    camera?.getWorldQuaternion(quaternion);
    forward.applyQuaternion(quaternion);

    const yRotation = Math.atan2(forward.x, forward.z);
    const newPlayer: Player = {
      id: socket.id,
      name: name,
      useModelType: useModelType,
      position: state.current.position as [number, number, number],
      rotation: [0, yRotation ?? 0, 0],
      playAnimation: playAction.current,
      dailySessionId: localParticipant?.session_id ?? null,
    };
    socket.emit("player:join", newPlayer);
  }, [isJoined]);

  useFrame(() => {
    if (!isJoined) {
      return;
    }
    const forward = new Vector3(0, 0, -1);
    const quaternion = new Quaternion();
    camera?.getWorldQuaternion(quaternion);
    forward.applyQuaternion(quaternion);

    const yRotation = Math.atan2(forward.x, forward.z);
    const player: Player = {
      id: socket.id,
      name: name,
      useModelType: useModelType,
      position: [
        state.current.position[0],
        state.current.position[1] - 0.2,
        state.current.position[2],
      ],
      rotation: [0, yRotation ?? 0, 0],
      playAnimation: playAction.current,
      dailySessionId: localParticipant?.session_id ?? null,
    };
    socket.emit("player:updateState", player);
  });

  return <></>;
};

export default GameObject;
