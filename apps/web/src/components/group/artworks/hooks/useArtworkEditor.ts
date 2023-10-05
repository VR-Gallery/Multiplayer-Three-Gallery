import { button, useControls } from 'leva';
import { Vector3Tuple } from 'three';
import { ArtworkData } from '../index';
import { useEffect } from 'react';

export const useArtworkEditor = (
  artworkData: ArtworkData,
  setArtworkData: (data: ArtworkData) => void,
) => {
  const { url, position, rotation, scale } = useControls({
    url: {
      value: artworkData?.url ?? '',
      label: 'URL',
    },
    position: {
      value: artworkData?.position ?? [0, 0, 0],
      step: 0.025,
    },
    rotation: {
      value: artworkData?.rotation ?? [0, 0, 0],
      step: 0.005,
    },
    scale: {
      value: artworkData?.scale ?? [1, 1, 1],
      step: 0.005,
    },
    print: button((get) => {
      const text = JSON.stringify({
        position: get('position').map((v: number) =>
          v ? Number(v.toFixed(4)) : 0,
        ),
        rotation: get('rotation').map((v: number) =>
          v ? Number(v.toFixed(4)) : 0,
        ),
        scale: get('scale').map((v: number) => (v ? Number(v.toFixed(4)) : 0)),
        url: get('url'),
      });
      navigator.clipboard.writeText(text);
    }),
  });

  useEffect(() => {
    setArtworkData({
      ...artworkData,
      url,
      position: position as Vector3Tuple,
      rotation: rotation as Vector3Tuple,
      scale: scale as Vector3Tuple,
    });
  }, [url, position, rotation, scale, setArtworkData, artworkData]);

  return null;
};
