import React, { useRef, useState } from 'react';
import { TextureLoader } from 'three';
export type ControlType = 'FirstPerson' | 'ThirdPerson';
import { useLoader } from '@react-three/fiber';
import { ArtworkData } from '@/components/group/artworks';
import { Artwork } from '../artwork';
import dynamic from 'next/dynamic';
import { UI } from '@/components/dom/UI';

const Guide = dynamic(() => import('@/components/gameObjects/guide'), {
  ssr: false,
});

const artwork: ArtworkData = {
  position: [0, 1.6, 1.3],
  rotation: [0, 3.14, 0],
  scale: [0.8, 0.8, 1],
  url: '/artworks/翻案屋.jpg',
};

type Props = JSX.IntrinsicElements['mesh'];

export const ArtworkWithGuide = (props: Props) => {
  const [isStart, setIsStart] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleStart = () => {
    if (isStart) return;
    setIsStart(true);
    audioRef.current?.play();
    setTimeout(() => {
      setIsStart(false);
    }, 43000);
  };

  return (
    <group>
      <UI>
        <audio ref={audioRef}>
          <source src='/audio/guide/110820046.mp3' type='audio/mpeg' />
        </audio>
      </UI>
      <Artwork
        url={artwork.url}
        position={artwork.position}
        rotation={artwork.rotation}
        scale={artwork.scale}
        pixelPerMeter={artwork.pixelPerMeter}
        onClick={handleStart}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      />
      {isStart && <Guide scale={0.5} position={[0.8, 0.4, 0.8]} />}
    </group>
  );
};
