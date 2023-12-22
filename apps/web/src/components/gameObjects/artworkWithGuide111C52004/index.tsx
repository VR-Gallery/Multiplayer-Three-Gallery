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
  position: [13.475, 1.475, -6.65],
  rotation: [0, -1.555, 0],
  scale: [1.1, 1.1, 1],
  url: '/artworks/太平鳥.jpg',
};
type Props = JSX.IntrinsicElements['mesh'];

export const ArtworkWithGuide111C52004 = (props: Props) => {
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
      {isStart && <Guide scale={0.5} position={[12.475, 0.35, -7.65]} />}
    </group>
  );
};
