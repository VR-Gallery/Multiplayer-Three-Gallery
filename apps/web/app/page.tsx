'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';
import { Environment, OrbitControls } from '@react-three/drei';

const Player = dynamic(() => import('@/components/gameObects/player'), {
  ssr: false,
});

const Floor = dynamic(() => import('@/components/gameObects/floor'), {
  ssr: false,
});

const Gallery = dynamic(() => import('@/components/gameObects/gallery'), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <Perf />
        <Environment files='/sky.hdr' background={true} />
        <OrbitControls />
        <Perf />
        <Player scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
        <Floor position={[0, -1.6, 0]} />
        <Gallery />
      </Suspense>
    </>
  );
}
