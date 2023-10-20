'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { Artworks } from '@/components/group/artworks';
import { socket } from '@/utils/socket';
import OtherPlayer from '@/components/gameObjects/otherPlayer';
import { ArtworkWithGuide } from '@/components/gameObjects/artworkWithGuide';

const Player = dynamic(() => import('@/components/gameObjects/player'), {
  ssr: false,
});

const Gallery4F = dynamic(() => import('@/components/gameObjects/gallery_4f'), {
  ssr: false,
});

const Gallery1F = dynamic(() => import('@/components/gameObjects/gallery_1f'), {
  ssr: false,
});

const Teleportation = dynamic(
  () =>
    import('@/components/gameObjects/teleportation').then(
      (mod) => mod.Teleportation,
    ),
  {
    ssr: false,
  },
);
const useOtherPlayersUpdate = () => {
  const [otherPlayers, setOtherPlayers] = useState<any[]>([]);

  useEffect(() => {
    function playerUpdate(playersList: any[]) {
      const players = playersList.filter((player) => player.id !== socket.id);
      setOtherPlayers(players);
    }

    socket.on('player:update', playerUpdate);

    return () => {
      socket.off('player:update', playerUpdate);
    };
  }, []);

  return otherPlayers;
};

export default function Page() {
  const otherPlayers = useOtherPlayersUpdate();

  return (
    <Suspense fallback={null}>
      {/* <Perf /> */}
      <Environment files='/sky.hdr' background={true} />
      <OrbitControls position={[100, 0, 100]} />
      <Artworks />
      <Player scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
      <Gallery4F position={[0, 0, 0]} />
      <Gallery1F position={[100, 0, 100]} scale={0.5} />
      <ArtworkWithGuide />
      <Teleportation
        position={[3, 1.2, -0.5]}
        fontScale={0.2}
        rotation={[0, -0.5 * Math.PI, 0]}
        gotoPosition={[96, 0.8, 96]}
        text='前往一樓'
      />
      <Teleportation
        position={[98, 1.2, 96]}
        fontScale={0.2}
        rotation={[0, -0.5 * Math.PI, 0]}
        gotoPosition={[1, 0.8, -0.5]}
        text='前往四樓'
      />
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
          />
        ),
      )}
    </Suspense>
  );
}
