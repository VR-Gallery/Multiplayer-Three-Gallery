import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
export type ControlType = "FirstPerson" | "ThirdPerson";
import { useLoader } from "@react-three/fiber";
import useAnimation from "./hooks/useAnimation";
import { useRecoilState } from "recoil";
import { coursorInfoPopupState } from "@/modules/ui/CursorInfoPopup";
import { useVideoTexture } from "@react-three/drei";

const VideoTexture = (props: { videoURL: string }) => {
  const video = useVideoTexture(props.videoURL);
  return <meshBasicMaterial map={video} />;
};

type PictureFrameProps = {
  url: string;
  videoURL: string;
  pixelPerMeter?: number;
  description: string;
} & JSX.IntrinsicElements["mesh"];

// 這是一個將圖片放在 three 的場景中的元件
const pictureFrame = (props: PictureFrameProps) => {
  const [coursorInfoPopup, setCoursorInfoPopup] = useRecoilState(
    coursorInfoPopupState
  );

  const ref = useRef<THREE.Mesh>(null!);
  // 加載圖片
  const texture = useLoader(TextureLoader, props.url);

  // 取得圖片大小
  const [width, height] = [texture.image.width, texture.image.height];
  const pixelPerMeter = props.pixelPerMeter ?? 1000;

  const [playAnim, setPlayAnim] = useState(false);

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() => {
        if (props.videoURL) {
          setPlayAnim(!playAnim);
        }
      }}
      onPointerOver={() => {
        setCoursorInfoPopup({
          text: props.description,
          id: props.url,
          show: true,
        });
        if (props.videoURL) {
          document.body.style.cursor = "pointer";
        }
      }}
      onPointerOut={() => {
        setCoursorInfoPopup({
          text: coursorInfoPopup.text,
          id: "",
          show: false,
        });
        document.body.style.cursor = "auto";
      }}
    >
      <planeBufferGeometry
        args={[width / pixelPerMeter, height / pixelPerMeter, 1, 1]}
      />
      {props.videoURL && playAnim ? (
        <VideoTexture videoURL={props.videoURL} />
      ) : (
        <meshBasicMaterial map={texture} />
      )}
    </mesh>
  );
};

export default pictureFrame;
