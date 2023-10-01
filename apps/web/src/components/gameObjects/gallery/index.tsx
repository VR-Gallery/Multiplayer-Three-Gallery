'use client';

import * as THREE from 'three';
import React, { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF, RGBELoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';
import { useColider } from './hooks/useColider';

type GLTFResult = GLTF & {
  nodes: {
    平面: THREE.Mesh;
    平面_1: THREE.Mesh;
    stairs3t4: THREE.Mesh;
    ['room?']: THREE.Mesh;
    stairs4t5: THREE.Mesh;
    wall021: THREE.Mesh;
    wall022: THREE.Mesh;
    wall023: THREE.Mesh;
    wall024: THREE.Mesh;
    wall025: THREE.Mesh;
    wall026: THREE.Mesh;
    wall027: THREE.Mesh;
    wall028: THREE.Mesh;
    wall029: THREE.Mesh;
    wall030: THREE.Mesh;
    wall012: THREE.Mesh;
    wall009: THREE.Mesh;
    wall010: THREE.Mesh;
    wall011: THREE.Mesh;
    wall013: THREE.Mesh;
    wall014: THREE.Mesh;
    wall031: THREE.Mesh;
    wall032: THREE.Mesh;
    wall033: THREE.Mesh;
    wall016: THREE.Mesh;
    wall017: THREE.Mesh;
    wall018: THREE.Mesh;
    wall019: THREE.Mesh;
    wall020: THREE.Mesh;
    wall007: THREE.Mesh;
    wall003: THREE.Mesh;
    wall015: THREE.Mesh;
    wall035: THREE.Mesh;
    wall036: THREE.Mesh;
    平面001: THREE.Mesh;
    平面001_1: THREE.Mesh;
    平面001_2: THREE.Mesh;
    wall034: THREE.Mesh;
    wall037: THREE.Mesh;
    wall038: THREE.Mesh;
    wall001: THREE.Mesh;
    wall002: THREE.Mesh;
    wall004: THREE.Mesh;
    Cube: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cube002: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube011: THREE.Mesh;
    Cube015: THREE.Mesh;
    Cube016: THREE.Mesh;
    Cube017: THREE.Mesh;
    Cube018: THREE.Mesh;
    Cube022: THREE.Mesh;
    Cube023: THREE.Mesh;
    Cube024: THREE.Mesh;
    Cube025: THREE.Mesh;
    Cube026: THREE.Mesh;
    Cube027: THREE.Mesh;
    Cube004: THREE.Mesh;
    Cube005: THREE.Mesh;
    Cube006: THREE.Mesh;
    Cube007: THREE.Mesh;
    Cube008: THREE.Mesh;
    Cube010: THREE.Mesh;
    Cube012: THREE.Mesh;
    Cube013: THREE.Mesh;
    Cube014: THREE.Mesh;
    Cube009: THREE.Mesh;
    Cube019: THREE.Mesh;
    Cube020: THREE.Mesh;
    Cube021: THREE.Mesh;
    Cube028: THREE.Mesh;
    Cube029: THREE.Mesh;
    Cube030: THREE.Mesh;
    Cube032: THREE.Mesh;
    Cube031: THREE.Mesh;
    Cube033: THREE.Mesh;
    Cube034: THREE.Mesh;
    Cube035: THREE.Mesh;
    Cube036: THREE.Mesh;
    Cube037: THREE.Mesh;
    Cube038: THREE.Mesh;
    Cube039: THREE.Mesh;
    Cube040: THREE.Mesh;
    Cube041: THREE.Mesh;
    Cube042: THREE.Mesh;
  };
  materials: {
    深色水泥: THREE.MeshStandardMaterial;
    淺色水泥: THREE.MeshStandardMaterial;
    砂岩磚: THREE.MeshStandardMaterial;
    灰色漆包金屬: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const texture = useLoader(RGBELoader, '/sky.hdr');
  const { nodes, materials } = useGLTF(
    '/gallery-transformed.glb',
  ) as unknown as GLTFResult;

  // 為了讓模型能跟著環境貼圖的光來反射
  useEffect(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.flipY = false;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;

    Object.values(materials).forEach((material) => {
      material.envMap = texture;
    });
  }, [texture]);

  useColider();

  return (
    <group {...props} dispose={null}>
      <group position={[-4.84, -1.49, -2.19]}>
        <mesh geometry={nodes.平面.geometry} material={materials.淺色水泥} />
        <mesh geometry={nodes.平面_1.geometry} material={materials.淺色水泥} />
      </group>
      <mesh
        geometry={nodes.stairs3t4.geometry}
        material={materials.深色水泥}
        position={[-14.94, -1.84, 0.74]}
        scale={[1.02, 1, 1]}
      />
      <mesh
        geometry={nodes['room?'].geometry}
        material={materials.淺色水泥}
        position={[-11.18, 1.38, 1.2]}
        scale={[1, 1.27, 1]}
      />
      <mesh
        geometry={nodes.stairs4t5.geometry}
        material={materials.淺色水泥}
        position={[4.72, 1.42, -0.55]}
        rotation={[0, -1.57, 0]}
        scale={[1.02, 1, 0.65]}
      />
      <mesh
        geometry={nodes.wall021.geometry}
        material={materials.淺色水泥}
        position={[8.11, 1.48, 2.78]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.25, 1, 2.57]}
      />
      <mesh
        geometry={nodes.wall022.geometry}
        material={materials.淺色水泥}
        position={[7.1, 1.45, 1.36]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.57, 1, 5.54]}
      />
      <mesh
        geometry={nodes.wall023.geometry}
        material={materials.淺色水泥}
        position={[9.07, 1.48, 2.78]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.25, 1, 2.57]}
      />
      <mesh
        geometry={nodes.wall024.geometry}
        material={materials.淺色水泥}
        position={[10.01, 1.48, 2.04]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.25, 1, 4.06]}
      />
      <mesh
        geometry={nodes.wall025.geometry}
        material={materials.淺色水泥}
        position={[9.07, 1.48, 1.5]}
        rotation={[0, -1.57, 0]}
        scale={[0.25, 1, 0.53]}
      />
      <mesh
        geometry={nodes.wall026.geometry}
        material={materials.淺色水泥}
        position={[8.1, 1.48, 1.5]}
        rotation={[0, -1.57, 0]}
        scale={[0.25, 1, 0.53]}
      />
      <mesh
        geometry={nodes.wall027.geometry}
        material={materials.淺色水泥}
        position={[9.89, 1.48, 1.5]}
        rotation={[0, -1.57, 0]}
        scale={[0.25, 1, 0.3]}
      />
      <mesh
        geometry={nodes.wall028.geometry}
        material={materials.淺色水泥}
        position={[7.88, 1.48, 0.03]}
        rotation={[Math.PI, -1.57, 0]}
        scale={[-0.25, -1, -1.56]}
      />
      <mesh
        geometry={nodes.wall029.geometry}
        material={materials.淺色水泥}
        position={[8.62, 1.48, 0.29]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.25, 1, 0.61]}
      />
      <mesh
        geometry={nodes.wall030.geometry}
        material={materials.淺色水泥}
        position={[10.38, 1.48, -0.03]}
        rotation={[0, -1.57, 0]}
        scale={[0.25, 1, 0.83]}
      />
      <mesh
        geometry={nodes.wall012.geometry}
        material={materials.淺色水泥}
        position={[10.74, 1.45, 1.36]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.57, 1, 5.54]}
      />
      <mesh
        geometry={nodes.wall009.geometry}
        material={materials.淺色水泥}
        position={[13.36, 1.45, 1.49]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.57, 1, 5.54]}
      />
      <mesh
        geometry={nodes.wall010.geometry}
        material={materials.淺色水泥}
        position={[16.75, 1.45, 1.49]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.57, 1, 5.54]}
      />
      <mesh
        geometry={nodes.wall011.geometry}
        material={materials.淺色水泥}
        position={[16.58, 1.45, 4.21]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.57, 1, 6.57]}
      />
      <mesh
        geometry={nodes.wall013.geometry}
        material={materials.淺色水泥}
        position={[14.02, 1.48, 0.1]}
        rotation={[Math.PI, -1.57, 0]}
        scale={[-0.25, -1, -1.32]}
      />
      <mesh
        geometry={nodes.wall014.geometry}
        material={materials.淺色水泥}
        position={[16.23, 1.48, 0.1]}
        rotation={[Math.PI, -1.57, 0]}
        scale={[-0.25, -1, -0.99]}
      />
      <mesh
        geometry={nodes.wall031.geometry}
        material={materials.淺色水泥}
        position={[17.41, 1.45, -1.25]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.57, 1, 2.85]}
      />
      <mesh
        geometry={nodes.wall032.geometry}
        material={materials.淺色水泥}
        position={[14, 1.45, -1.25]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.57, 1, 1.49]}
      />
      <mesh
        geometry={nodes.wall033.geometry}
        material={materials.淺色水泥}
        position={[-6.58, 1.45, 4.08]}
        rotation={[0, -1.57, 0]}
        scale={[0.57, 1, 6.39]}
      />
      <mesh
        geometry={nodes.wall016.geometry}
        material={materials.淺色水泥}
        position={[-14.47, 1.45, -2.29]}
        rotation={[0, -1.57, 0]}
        scale={[0.57, 1, 6.43]}
      />
      <mesh
        geometry={nodes.wall017.geometry}
        material={materials.淺色水泥}
        position={[-13.24, 1.45, 0.91]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.57, 1, 6.23]}
      />
      <mesh
        geometry={nodes.wall018.geometry}
        material={materials.淺色水泥}
        position={[-17.49, 1.45, -6.08]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.57, 1, 2.75]}
      />
      <mesh
        geometry={nodes.wall019.geometry}
        material={materials.淺色水泥}
        position={[-18.77, 1.45, -4.37]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.57, 1, 3.62]}
      />
      <mesh
        geometry={nodes.wall020.geometry}
        material={materials.淺色水泥}
        position={[-16.2, 1.45, -6.76]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.57, 1, 1.57]}
      />
      <mesh
        geometry={nodes.wall007.geometry}
        material={materials.淺色水泥}
        position={[8.92, 1.45, 4.08]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.57, 1, 3.79]}
      />
      <mesh
        geometry={nodes.wall003.geometry}
        material={materials.淺色水泥}
        position={[-15.11, 1.45, 4.08]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.57, 1, 3.83]}
      />
      <mesh
        geometry={nodes.wall015.geometry}
        material={materials.深色水泥}
        position={[3.77, 1.45, 4.08]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.57, 1, 1.88]}
      />
      <mesh
        geometry={nodes.wall035.geometry}
        material={materials.淺色水泥}
        position={[1.32, 1.45, -1.39]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.57, 1, 0.77]}
      />
      <mesh
        geometry={nodes.wall036.geometry}
        material={materials.淺色水泥}
        position={[-2.58, 1.45, -1.42]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.57, 1, 0.77]}
      />
      <group position={[-4.84, -1.49, -2.19]}>
        <mesh geometry={nodes.平面001.geometry} material={materials.淺色水泥} />
        <mesh geometry={nodes.平面001_1.geometry} material={materials.砂岩磚} />
        <mesh geometry={nodes.平面001_2.geometry} material={materials.砂岩磚} />
      </group>
      <mesh
        geometry={nodes.wall034.geometry}
        material={materials.淺色水泥}
        position={[-1.31, 1.45, 3.35]}
        scale={[0.57, 1, 0.77]}
      />
      <mesh
        geometry={nodes.wall037.geometry}
        material={materials.淺色水泥}
        position={[1.32, 1.45, 1.44]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.57, 1, 0.77]}
      />
      <mesh
        geometry={nodes.wall038.geometry}
        material={materials.淺色水泥}
        position={[-2.54, 1.45, 3.92]}
        scale={[0.57, 1, 0.77]}
      />
      <mesh
        geometry={nodes.wall001.geometry}
        material={materials.淺色水泥}
        position={[1.62, 1.45, 3.35]}
        scale={[0.57, 1, 0.77]}
      />
      <mesh
        geometry={nodes.wall002.geometry}
        material={materials.淺色水泥}
        position={[-2.87, 1.45, 1.51]}
        scale={[0.57, 1, 0.77]}
      />
      <mesh
        geometry={nodes.wall004.geometry}
        material={materials.砂岩磚}
        position={[3.3, 1.45, -6.08]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.57, 1, 5.54]}
      />
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.灰色漆包金屬}
        position={[-4.59, 0.32, -11.33]}
        rotation={[0, -1.24, 0]}
      />
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials.灰色漆包金屬}
        position={[2.36, 0.32, -3.39]}
      />
      <mesh
        geometry={nodes.Cube002.geometry}
        material={materials.灰色漆包金屬}
        position={[-5.75, 0.32, -11.38]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube003.geometry}
        material={materials.灰色漆包金屬}
        position={[-4.83, 0.32, -11.71]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube011.geometry}
        material={materials.灰色漆包金屬}
        position={[-6.67, 0.32, -11.05]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube015.geometry}
        material={materials.灰色漆包金屬}
        position={[-9.44, 0.32, -10.07]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube016.geometry}
        material={materials.灰色漆包金屬}
        position={[-8.52, 0.32, -10.4]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube017.geometry}
        material={materials.灰色漆包金屬}
        position={[-7.59, 0.32, -10.73]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube018.geometry}
        material={materials.灰色漆包金屬}
        position={[-10.35, 0.32, -9.75]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube022.geometry}
        material={materials.灰色漆包金屬}
        position={[-13.12, 0.32, -8.77]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube023.geometry}
        material={materials.灰色漆包金屬}
        position={[-11.28, 0.32, -9.42]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube024.geometry}
        material={materials.灰色漆包金屬}
        position={[-12.2, 0.32, -9.09]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube025.geometry}
        material={materials.灰色漆包金屬}
        position={[-14.04, 0.32, -8.44]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube026.geometry}
        material={materials.灰色漆包金屬}
        position={[-14.95, 0.32, -8.11]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube027.geometry}
        material={materials.灰色漆包金屬}
        position={[-15.87, 0.32, -7.79]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube004.geometry}
        material={materials.灰色漆包金屬}
        position={[-4.29, 0.32, -10.49]}
        rotation={[0, -1.24, 0]}
      />
      <mesh
        geometry={nodes.Cube005.geometry}
        material={materials.灰色漆包金屬}
        position={[-1.86, 0.32, -3.72]}
        rotation={[0, -1.24, 0]}
      />
      <mesh
        geometry={nodes.Cube006.geometry}
        material={materials.灰色漆包金屬}
        position={[-3.3, 0.32, -7.73]}
        rotation={[0, -1.24, 0]}
      />
      <mesh
        geometry={nodes.Cube007.geometry}
        material={materials.灰色漆包金屬}
        position={[-3.63, 0.32, -8.65]}
        rotation={[0, -1.24, 0]}
      />
      <mesh
        geometry={nodes.Cube008.geometry}
        material={materials.灰色漆包金屬}
        position={[-3.96, 0.32, -9.57]}
        rotation={[0, -1.24, 0]}
      />
      <mesh
        geometry={nodes.Cube010.geometry}
        material={materials.灰色漆包金屬}
        position={[-2.97, 0.32, -6.81]}
        rotation={[0, -1.24, 0]}
      />
      <mesh
        geometry={nodes.Cube012.geometry}
        material={materials.灰色漆包金屬}
        position={[-1.97, 0.32, -4.05]}
        rotation={[0, -1.24, 0]}
      />
      <mesh
        geometry={nodes.Cube013.geometry}
        material={materials.灰色漆包金屬}
        position={[-2.31, 0.32, -4.97]}
        rotation={[0, -1.24, 0]}
      />
      <mesh
        geometry={nodes.Cube014.geometry}
        material={materials.灰色漆包金屬}
        position={[-2.64, 0.32, -5.89]}
        rotation={[0, -1.24, 0]}
      />
      <mesh
        geometry={nodes.Cube009.geometry}
        material={materials.灰色漆包金屬}
        position={[-1.96, 0.32, -4.11]}
        rotation={[0, -1.24, 0]}
      />
      <mesh
        geometry={nodes.Cube019.geometry}
        material={nodes.Cube019.material}
        position={[3.34, 0.32, -3.4]}
      />
      <mesh
        geometry={nodes.Cube020.geometry}
        material={materials.灰色漆包金屬}
        position={[-11.2, 0.32, -9.44]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube021.geometry}
        material={materials.灰色漆包金屬}
        position={[1.38, 0.32, -3.38]}
      />
      <mesh
        geometry={nodes.Cube028.geometry}
        material={materials.灰色漆包金屬}
        position={[-1.55, 0.32, -3.34]}
      />
      <mesh
        geometry={nodes.Cube029.geometry}
        material={materials.灰色漆包金屬}
        position={[-0.57, 0.32, -3.35]}
      />
      <mesh
        geometry={nodes.Cube030.geometry}
        material={materials.灰色漆包金屬}
        position={[0.41, 0.32, -3.36]}
      />
      <mesh
        geometry={nodes.Cube032.geometry}
        material={materials.灰色漆包金屬}
        position={[-3.42, 0.32, -3.32]}
      />
      <mesh
        geometry={nodes.Cube031.geometry}
        material={materials.灰色漆包金屬}
        position={[-10.86, 2.61, -8.89]}
        rotation={[0, 0.32, 0]}
      />
      <mesh
        geometry={nodes.Cube033.geometry}
        material={materials.灰色漆包金屬}
        position={[-4.59, 2.61, -11.33]}
        rotation={[0, -1.24, 0]}
      />
      <mesh
        geometry={nodes.Cube034.geometry}
        material={materials.灰色漆包金屬}
        position={[-3.42, 2.61, -3.65]}
      />
      <mesh
        geometry={nodes.Cube035.geometry}
        material={materials.灰色漆包金屬}
        position={[-3.42, 0.32, -6.1]}
      />
      <mesh
        geometry={nodes.Cube036.geometry}
        material={materials.灰色漆包金屬}
        position={[0.41, 0.32, -6.14]}
      />
      <mesh
        geometry={nodes.Cube037.geometry}
        material={materials.灰色漆包金屬}
        position={[-0.57, 0.32, -6.13]}
      />
      <mesh
        geometry={nodes.Cube038.geometry}
        material={materials.灰色漆包金屬}
        position={[-1.55, 0.32, -6.12]}
      />
      <mesh
        geometry={nodes.Cube039.geometry}
        material={materials.灰色漆包金屬}
        position={[1.38, 0.32, -6.16]}
      />
      <mesh
        geometry={nodes.Cube040.geometry}
        material={materials.灰色漆包金屬}
        position={[2.36, 0.32, -6.17]}
      />
      <mesh
        geometry={nodes.Cube041.geometry}
        material={materials.灰色漆包金屬}
        position={[-2.52, 0.32, -6.12]}
      />
      <mesh
        geometry={nodes.Cube042.geometry}
        material={materials.灰色漆包金屬}
        position={[-3.42, 1.15, -6.1]}
      />
    </group>
  );
}

useGLTF.preload('/gallery-transformed.glb');
