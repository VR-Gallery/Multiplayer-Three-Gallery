import { PublicApi } from '@react-three/cannon';
import { button, useControls } from 'leva';
import { RefObject, useEffect } from 'react';
import { Object3D, Event, Vector3Tuple } from 'three';

export const useColiderEditor = (
  api: PublicApi,
  defaultValue?: {
    position: Vector3Tuple;
    rotation: Vector3Tuple;
  },
) => {
  const { position, rotation } = useControls({
    position: {
      value: defaultValue?.position ?? [0, 0, 0],
      step: 0.025,
    },
    rotation: {
      value: defaultValue?.rotation ?? [0, 0, 0],
      step: 0.005,
    },
    print: button((get) => {
      // 去掉 {}
      const text =
        JSON.stringify({
          position: get('position').map((v: number) =>
            v ? Number(v.toFixed(4)) : 0,
          ),
          rotation: get('rotation').map((v: number) =>
            v ? Number(v.toFixed(4)) : 0,
          ),
        }).slice(1, -1) + ',';
      navigator.clipboard.writeText(text);
    }),
  });

  useEffect(() => {
    api.position.set(...position);
  }, [api.position, position]);

  useEffect(() => {
    api.rotation.set(...rotation);
  }, [api.rotation, rotation]);

  return null;
};
