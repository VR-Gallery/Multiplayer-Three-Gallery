import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
import { CubeTextureLoader } from "three";
import { CursorInfoPopup } from "@/modules/ui/CursorInfoPopup";

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
    videoURL: "",
    position: [13.9, 1.6, 12.0],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 2,
    description: "平靜",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2814.jpg`,
    videoURL: "",
    position: [13.9, 1.6, 8.0],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 1.1,
    description: "田園",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2815.jpg`,
    videoURL: "",
    position: [13.9, 1.6, 4.0],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 2,
    description: "迎春",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2816.jpg`,
    videoURL: "",
    position: [13.9, 1.6, 0.4],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 1.5,
    description: "金秋",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2817.jpg`,
    videoURL: "",
    position: [12.1, 1.6, 13.9],
    rotation: [0, Math.PI * 1, 0],
    scale: 1.1,
    description: "黃沙天",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2818.jpg`,
    videoURL: "",
    position: [8.0, 1.6, 13.9],
    rotation: [0, Math.PI * 1, 0],
    scale: 1.1,
    description: "曠野",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2819.jpg`,
    videoURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2819.mp4`,
    position: [4, 1.6, 13.9],
    rotation: [0, Math.PI * 1, 0],
    scale: 0.78,
    description: "第53號構圖—紅雨村白雲舍 點擊以播放動畫",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2820.jpg`,
    videoURL: "",
    position: [0.5, 1.6, 13.9],
    rotation: [0, Math.PI * 1, 0],
    scale: 0.78,
    description: "第 25 號構圖—秋",
  },
];

const Sence = () => {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const otherPlayers = useOtherPlayersUpdate();
  const controlType = useControlType();

  const [usePictureAnimPlay, setUsePictureAnimPlay] = useState(false);

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
          <FloorBlock key={`${x}${y}`} x={x * 2 - 1} y={y * 2 - 1} />
        ))
      )}
      <ambientLight intensity={0.2} />
      <WallBlock usePictureAnimPlay={usePictureAnimPlay} />
      <Player CameraControlRef={cameraControlRef} controlType={controlType} />
      {galleryPictures.map(
        ({ url, videoURL, description, position, rotation, scale }) => (
          <PictureFrame
            key={url}
            url={url}
            position={position as [number, number, number]}
            rotation={rotation as [number, number, number]}
            scale={scale}
            videoURL={videoURL}
            description={description}
            usePictureAnimPlay={usePictureAnimPlay}
            setUsePictureAnimPlay={setUsePictureAnimPlay}
          />
        )
      )}

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
