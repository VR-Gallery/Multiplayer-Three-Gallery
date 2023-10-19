import { useBox, usePlane } from '@react-three/cannon';
import { useColiderEditor } from '@/hooks/useColiderEditor';

export const useColider = () => {
  // 地板
  usePlane(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    position: [-4.84, 0.34, -2.19],
    args: [100, 0.1, 100],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  // 外牆 1
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [13, 3, 1],
    position: [-9.215, 1.66, 5.56],
    rotation: [0, 0.201, 0],
  }));

  // 外牆 2
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [10, 3, 1],
    position: [-17.915, 1.66, 2.985],
    rotation: [0, -1.089, 0],
  }));

  // 外牆 3
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [8, 3, 1],
    position: [-20.715, 1.66, -3.91],
    rotation: [0, -1.354, 0],
  }));

  // 外牆 4
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [4, 3, 1],
    position: [-18.965, 1.66, -7.51],
    rotation: [0, -3.159, 0],
  }));

  // 外牆 5
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [1, 3, 1],
    position: [-16.69, 1.66, -7.635],
    rotation: [0, -2.789, 0],
  }));

  // 外牆 6
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [1.5, 3, 0.3],
    position: [-16.195, 1.66, -6.685],
    rotation: [0, 1.58, 0],
  }));

  // 外牆 7
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [2.7, 3, 0.3],
    position: [-17.57, 1.66, -6.085],
    rotation: [0, 0, 0],
  }));

  // 玻璃外牆 9
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [3.5, 3, 0.3],
    position: [-18.77, 1.66, -4.26],
    rotation: [0, 1.575, 0],
  }));

  // 玻璃外牆 10
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [12.2, 3, 0.3],
    position: [-10.245, 1.66, -9.41],
    rotation: [0.32, 0.32, -0.16],
  }));

  // 玻璃外牆 11
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [7.2, 3, 0.2],
    position: [-3.52, 1.66, -8.31],
    rotation: [0, 1.92, 0],
  }));

  // 玻璃外牆 12
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [0.8, 3, 0.2],
    position: [-1.845, 1.66, -3.71],
    rotation: [0, 1.92, 0],
  }));

  // 玻璃外牆 12
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [5, 3, 0.2],
    position: [0.7, 1.66, -3.585],
    rotation: [-0.18, 0, 0],
  }));

  // 外牆 13
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [6, 3, 0.2],
    position: [0.2, 1.66, -6.085],
    rotation: [0, 0, 0],
  }));

  // 外牆 14
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [3, 3, 0.25],
    position: [3.3, 1.66, -4.76],
    rotation: [0, 1.57, 0],
  }));

  // 外牆 15
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [15, 3, 1],
    position: [9.85, 1.66, -8.56],
    rotation: [0, 3.48, 0],
  }));

  // 外牆 16
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [16, 3, 1],
    position: [18.9, 1.66, -2.935],
    rotation: [0, 1.755, 0],
  }));

  // 外牆 17
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [18, 3, 1],
    position: [12.025, 1.66, 6.915],
    rotation: [0, 3.35, 0],
  }));

  // 外牆 18
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [6, 3, 1],
    position: [2.92, 1.66, 6.965],
    rotation: [0, 1.755, 0],
  }));

  // 外牆 19
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [14.55, 3, 0.35],
    position: [-2.555, 1.66, 4.09],
    rotation: [0, 0, 0],
  }));

  // 內牆 1
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [4, 3, 0.35],
    position: [-15.055, 1.66, 4.09],
    rotation: [0, 0, 0],
  }));

  // 內牆 2
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [6.2, 3, 0.35],
    position: [-13.205, 1.66, 0.865],
    rotation: [0, 1.58, 0],
  }));

  // 內牆 3
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [6.5, 3, 0.35],
    position: [-14.455, 1.66, -2.335],
    rotation: [0, 0, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [12.2, 3, 0.3],
    position: [4.6, 1.66, -1.41],
    rotation: [0, 0, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [3, 3, 0.3],
    position: [0.175, 1.66, 1.44],
    rotation: [0, 0, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [3.9, 3, 0.3],
    position: [8.955, 1.66, 4.07],
    rotation: [0, 0, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [5.8, 3, 0.3],
    position: [10.755, 1.66, 1.34],
    rotation: [0, 1.57, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [5.8, 3, 0.3],
    position: [7.105, 1.66, 1.34],
    rotation: [0, 1.57, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [4.4, 3, 0.3],
    position: [1.58, 1.66, 1.865],
    rotation: [0, 1.57, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [5.5, 3, 0.35],
    position: [-2.795, 1.66, 1.165],
    rotation: [0, 1.57, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [2.7, 3, 0.35],
    position: [-1.245, 1.66, 2.64],
    rotation: [0, 1.57, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [5.7, 3, 0.35],
    position: [13.405, 1.66, 1.49],
    rotation: [0, 1.57, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [5.7, 3, 0.35],
    position: [16.755, 1.66, 1.49],
    rotation: [0, 1.57, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [7, 3, 0.35],
    position: [16.73, 1.66, 4.19],
    rotation: [0, 0, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [3, 3, 0.35],
    position: [17.455, 1.66, -1.21],
    rotation: [0, 0, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [1.5, 3, 0.35],
    position: [14.03, 1.66, -1.21],
    rotation: [0, 0, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [1.2, 3, 0.1],
    position: [14.08, 1.66, 0.09],
    rotation: [0, 0, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [1.2, 3, 0.1],
    position: [16.305, 1.66, 0.09],
    rotation: [0, 0, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [2, 3, 0.8],
    position: [3.555, 1.66, 0.715],
    rotation: [0, 0, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [0.8, 3, 1.8],
    position: [-11.195, 1.66, 1.215],
    rotation: [0, 0, 0],
  }));

  return null;
};
