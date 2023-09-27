import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Gallery from "@/modules/three/gallery";
import Player from "@/modules/three/player";
import OtherPlayer from "@/modules/three/otherPlayer";
import PictureFrame from "@/modules/three/pictureFrame";
import { Player as TypePlayer } from "common-type";
import { OrbitControls, CameraControls, Environment } from "@react-three/drei";
import { socket } from "@/utils/socket";
import { match, P } from "ts-pattern";
import { atom } from "recoil";
import { Debug, Physics, useBox } from "@react-three/cannon";
import { useControls } from "leva";

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
    position: [4.4, 0.1, 12.6],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 2,
    description: "平靜",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2814.jpg`,
    videoURL: "",
    position: [4.4, 0.12, 20.3],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 1.1,
    description: "田園",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2815.jpg`,
    videoURL: "",
    position: [-4.69, 0.03, 10.7],
    rotation: [0, 0.5, 0],
    scale: 2,
    description: "迎春",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2816.jpg`,
    videoURL: "",
    position: [-6.7, 0.03, 11.8],
    rotation: [0, 0.5, 0],
    scale: 1.5,
    description: "金秋",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2817.jpg`,
    videoURL: "",
    position: [-9.2, 0.03, 13.2],
    rotation: [0, 0.5, 0],
    scale: 1.1,
    description: "黃沙天",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2818.jpg`,
    videoURL: "",
    position: [-10.16, 0.03, 16.03],
    rotation: [0, 1.79, 0],
    scale: 1.1,
    description: "曠野",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2819.jpg`,
    videoURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2819.mp4`,
    position: [-8.9, 2.03, 21.0],
    rotation: [0, 1.79, 0],
    scale: 3.0,
    description: "第53號構圖—紅雨村白雲舍 點擊以播放動畫",
  },
  {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/gallery/2820.jpg`,
    videoURL: "",
    position: [-7.9, 0.03, 26.06],
    rotation: [0, 1.79, 0],
    scale: 1.1,
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
      <Suspense>
        <Physics
          gravity={[0, -9, 0]}
          tolerance={0}
          iterations={50}
          broadphase={"SAP"}
        >
          {match(process.env.ENV)
            .with("DEV", () => <OrbitControls target={[4, 0, 4]} />)
            .otherwise(() => (
              <CameraControls ref={cameraControlRef} makeDefault />
            ))}

          <Environment files="/skybox/sky.hdr" background={true} />
          <OrbitControls target={[4, 0, 4]} />
          <Player
            CameraControlRef={cameraControlRef}
            controlType={controlType}
          /> 
          <Gallery />
          {galleryPictures.map(
            (
              { url, videoURL, description, position, rotation, scale },
              index
            ) => (
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
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default Sence;
