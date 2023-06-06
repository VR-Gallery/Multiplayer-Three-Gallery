import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
export type ControlType = "FirstPerson" | "ThirdPerson";
import { useLoader } from "@react-three/fiber";
import useAnimation from "./hooks/useAnimation";

type PictureFrameProps = {
  url: string;
  pixelPerMeter?: number;
} & JSX.IntrinsicElements["mesh"];

// 這是一個將圖片放在 three 的場景中的元件
const pictureFrame = (props: PictureFrameProps) => {
  const ref = useRef<THREE.Mesh>(null!);
  // 加載圖片
  const texture = useLoader(TextureLoader, props.url);

  // 取得圖片大小
  const [width, height] = [texture.image.width, texture.image.height];

  const pixelPerMeter = props.pixelPerMeter ?? 1000;

  return (
    <mesh {...props} ref={ref}>
      <planeBufferGeometry
        args={[width / pixelPerMeter, height / pixelPerMeter, 1, 1]}
      />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default pictureFrame;
