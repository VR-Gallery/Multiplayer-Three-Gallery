'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';

const Player = dynamic(() => import('@/components/gameObjects/player'), {
  ssr: false,
});

const Gallery = dynamic(() => import('@/components/gameObjects/gallery'), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        {/* <Perf /> */}
        <Environment files='/sky.hdr' background={true} />
        {/* <OrbitControls /> */}

        <Player scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
        <Gallery />
      </Suspense>
    </>
  );
}
