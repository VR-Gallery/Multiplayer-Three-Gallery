import { useBox, usePlane } from '@react-three/cannon';
import { useColiderEditor } from '@/hooks/useColiderEditor';

export const useColider = () => {
  // 地板
  usePlane(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    position: [100, 0.04, 100],
    args: [100, 0.1, 100],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  // 外牆 1
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [14, 3, 1],
    position: [109.075, 1.66, 112.825],
    rotation: [0, 0.056, 0],
  }));

  // 外牆 2
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [26, 3, 1],
    position: [89.225, 1.66, 111.925],
    rotation: [0, -0.094, 0],
  }));

  // 外牆 3
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [10, 3, 1],
    position: [74.875, 1.66, 107.125],
    rotation: [0, -1.084, 0],
  }));

  // 外牆 4
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [6, 3, 1],
    position: [75.225, 1.66, 101.475],
    rotation: [0, 0.291, 0],
  }));

  // 外牆 5
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [4.8, 3, 1],
    position: [77.85, 1.66, 98.75],
    rotation: [0, 1.566, 0],
  }));

  // 外牆 6
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [4.8, 3, 1],
    position: [75.925, 1.66, 96.875],
    rotation: [0, 3.161, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [8, 3, 1],
    position: [74.175, 1.66, 92.7],
    rotation: [0, 4.451, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [3, 3, 1],
    position: [76.425, 1.66, 88.725],
    rotation: [0, 3.436, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [18, 3, 1],
    position: [84.825, 1.66, 88.525],
    rotation: [0, 3.116, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [22, 3, 1],
    position: [104.5, 1.66, 86.825],
    rotation: [0, 3.321, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [6, 3, 1],
    position: [114.475, 1.66, 87.975],
    rotation: [0, 4.571, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [6, 3, 1],
    position: [115.325, 1.66, 93.4],
    rotation: [0, 5.146, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [6, 3, 1],
    position: [115.85, 1.66, 97.425],
    rotation: [0, 4.746, 0],
  }));

  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [3, 3, 1],
    position: [116.075, 1.66, 111.425],
    rotation: [0, 4.701, 0],
  }));
  // 外白牆 1
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [4, 4, 2],
    position: [75.375, 1.66, 107.125],
    rotation: [0, 5.206, 0],
  }));
  // 外白牆 2
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [4, 4, 2],
    position: [101.775, 1.66, 87.85],
    rotation: [0, 6.426, 0],
  }));
  // 內牆
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [21.2, 4, 0.22],
    position: [98.95, 1.66, 100.425],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [17.5, 4, 0.22],
    position: [100.75, 1.66, 95.195],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [12, 4, 0.22],
    position: [117.4, 1.66, 100.425],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [12, 4, 0.22],
    position: [113.95, 1.66, 109.775],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [2, 4, 0.22],
    position: [112.35, 1.66, 95.07],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [2.4, 4, 0.22],
    position: [112.65, 1.66, 96.345],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [2.3, 4, 0.22],
    position: [108.375, 1.66, 96.34],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [1, 4, 0.22],
    position: [105.95, 1.66, 96.34],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [2, 4, 0.22],
    position: [103.58, 1.66, 96.34],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [1, 4, 0.22],
    position: [96.48, 1.66, 97.74],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [1, 4, 0.22],
    position: [94.455, 1.66, 97.74],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [0.7, 4, 0.22],
    position: [92.48, 1.66, 97.74],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [6, 4, 0.22],
    position: [80.93, 1.66, 100.49],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [5, 4, 0.22],
    position: [81.43, 1.66, 93.99],
    rotation: [0, 0, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [3, 4, 0.22],
    position: [113.975, 1.66, 99.59],
    rotation: [0, 0, 0],
  }));
  //內牆 橫
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [3.2, 4, 0.22],
    position: [112.6, 1.66, 97.94],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [4, 4, 0.22],
    position: [109.1, 1.66, 98.39],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [4, 4, 0.22],
    position: [106.28, 1.66, 98.39],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [4, 4, 0.22],
    position: [105.655, 1.66, 98.39],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [5.3, 4, 0.22],
    position: [102.48, 1.66, 97.84],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [3.8, 4, 0.22],
    position: [96.68, 1.66, 98.42],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [2.8, 4, 0.22],
    position: [94.405, 1.66, 99.045],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [3.7, 4, 0.22],
    position: [92.13, 1.66, 98.52],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [1.9, 4, 0.22],
    position: [88.48, 1.66, 99.395],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [8.5, 4, 0.22],
    position: [92.01, 1.66, 104.695],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [5.2, 4, 0.22],
    position: [83.885, 1.66, 96.645],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [6.5, 4, 0.22],
    position: [78.885, 1.66, 97.12],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [1, 4, 0.22],
    position: [79.435, 1.66, 89.595],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [3, 4, 0.22],
    position: [79.435, 1.66, 92.47],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [0.8, 4, 0.22],
    position: [107.975, 1.66, 110.245],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [2.2, 4, 1],
    position: [88.975, 1.66, 110.095],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [2, 4, 1],
    position: [88.975, 1.66, 106.42],
    rotation: [0, 1.57, 0],
  }));
  useBox(() => ({
    material: {
      friction: 0.01,
    },
    type: 'Static',
    args: [9, 4, 1],
    position: [113.325, 1.66, 105.12],
    rotation: [0, 1.57, 0],
  }));

  return null;
};
