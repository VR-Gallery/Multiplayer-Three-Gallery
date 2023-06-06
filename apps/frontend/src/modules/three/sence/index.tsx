import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import FloorBlock from "@/modules/three/floorBlock";
import WallBlock from "@/modules/three/wallBlock";
import Player from "@/modules/three/player";
import OtherPlayer from "@/modules/three/otherPlayer";
import PictureFrame from "@/modules/three/pictureFrame";
import { Player as TypePlayer } from "models";
import { Stats, OrbitControls, CameraControls } from "@react-three/drei";
import { socket } from "@/utils/socket";
import { match, P } from "ts-pattern";
import { atom } from "recoil";
export type ControlType = "FirstPerson" | "ThirdPerson";

export const joinState = atom<{
  isJoined: boolean;
  isDailyJoined: boolean;
}>({
  key: "isJoined",
  default: {
    isJoined: false,
    isDailyJoined: false,
  },
});

const useControlType = () => {
  const [controlType, setControlType] = useState<ControlType>("ThirdPerson");

  useEffect(() => {
    function keydown(e: KeyboardEvent) {
      if (e.key === "e") {
        setControlType((prev) =>
          prev === "FirstPerson" ? "ThirdPerson" : "FirstPerson"
        );
      }
    }

    window.addEventListener("keydown", keydown);

    return () => {
      window.removeEventListener("keydown", keydown);
    };
  }, []);

  return controlType;
};

const useOtherPlayersUpdate = () => {
  const [otherPlayers, setOtherPlayers] = useState<TypePlayer[]>([]);

  useEffect(() => {
    function playerUpdate(playersList: TypePlayer[]) {
      const players = playersList.filter((player) => player.id !== socket.id);
      setOtherPlayers(players);
    }

    socket.on("player:update", playerUpdate);

    return () => {
      socket.off("player:update", playerUpdate);
    };
  }, []);

  return otherPlayers;
};

const galleryPictures = [
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2813.jpg`,
    position: [7.6, 1.3, 6.5],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 2,
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2814.jpg`,
    position: [7.6, 1.3, 4.4],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 1.1,
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2815.jpg`,
    position: [7.6, 1.3, 2.4],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 2,
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2816.jpg`,
    position: [7.6, 1.3, 0.8],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 1.5,
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2817.jpg`,
    position: [6.1, 1.3, 7.5],
    rotation: [0, Math.PI * 1, 0],
    scale: 1.1,
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2818.jpg`,
    position: [3.8, 1.3, 7.5],
    rotation: [0, Math.PI * 1, 0],
    scale: 1.1,
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2819.jpg`,
    position: [2, 1.3, 7.5],
    rotation: [0, Math.PI * 1, 0],
    scale: 0.78,
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2820.jpg`,
    position: [0.5, 1.3, 7.5],
    rotation: [0, Math.PI * 1, 0],
    scale: 0.78,
  },
];

const Sence = () => {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const otherPlayers = useOtherPlayersUpdate();
  const controlType = useControlType();

  return (
    <Canvas camera={{ fov: 45, position: [-4, 6, -4] }}>
      {match(process.env.ENV)
        .with("DEV", () => <OrbitControls target={[4, 0, 4]} />)
        .otherwise(() => (
          <CameraControls ref={cameraControlRef} makeDefault />
        ))}
      {/* 建立 8x8 的地板 */}
      {Array.from({ length: 8 }, (_, x) =>
        Array.from({ length: 8 }, (_, y) => (
          <FloorBlock key={`${x}${y}`} x={x} y={y} />
        ))
      )}
      <ambientLight intensity={0.2} />
      <WallBlock />
      <Player CameraControlRef={cameraControlRef} controlType={controlType} />
      {galleryPictures.map(({ url, position, rotation, scale }) => (
        <PictureFrame
          key={url}
          url={url}
          position={position as [number, number, number]}
          rotation={rotation as [number, number, number]}
          scale={scale}
        />
      ))}
      {otherPlayers.map(
        ({
          id,
          position,
          rotation,
          playAnimation,
          dailySessionId,
          name,
          useModelType,
        }) => (
          <OtherPlayer
            key={id}
            position={position}
            rotation={rotation}
            name={name}
            playAnimation={playAnimation}
            dailySessionId={dailySessionId}
            CameraControlRef={cameraControlRef}
            useModelType={useModelType ?? ""}
          />
        )
      )}
    </Canvas>
  );
};

export default Sence;
