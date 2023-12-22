import React, { useRef, useState } from 'react';
export type ControlType = 'FirstPerson' | 'ThirdPerson';
import { ArtworkData } from '@/components/group/artworks';
import { Artwork } from '../artwork';
import dynamic from 'next/dynamic';
import { UI } from '@/components/dom/UI';

const Guide = dynamic(() => import('./guide/index'), {
  ssr: false,
});

const artwork: ArtworkData = {
  position: [4.85, 1.5, -1.6],
  rotation: [0, 3.14, 0],
  scale: [0.6, 0.6, 1],
  url: '/artworks/雨過碧山.jpg',
};
type Props = JSX.IntrinsicElements['mesh'];

export const ArtworkWithGuide111C52018 = (props: Props) => {
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
      {isStart && (
        <Guide scale={0.5} position={[5.2, 0.35, -2]} rotation={[0, 2, 0]} />
      )}
    </group>
  );
};
