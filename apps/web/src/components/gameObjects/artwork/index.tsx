import React, { useRef } from 'react';
import { TextureLoader } from 'three';
export type ControlType = 'FirstPerson' | 'ThirdPerson';
import { useLoader } from '@react-three/fiber';

type Props = {
  url: string;
  pixelPerMeter?: number;
} & JSX.IntrinsicElements['mesh'];

export const Artwork = (props: Props) => {
  const ref = useRef<THREE.Mesh>(null!);
  // 加載圖片
  const texture = useLoader(TextureLoader, props.url);

  // 取得圖片大小
  const [width, height] = [texture.image.width, texture.image.height];
  const pixelPerMeter = props.pixelPerMeter ?? 1000;

  return (
    <mesh {...props} ref={ref}>
      <planeGeometry
        args={[width / pixelPerMeter, height / pixelPerMeter, 1, 1]}
      />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};
