import { useState } from "react";
import { Vector3 } from "@react-three/fiber";
import useAnimationFrame from "@/hooks/useAnimationFrame";

const useAnimation = () => {
  const [position, setPosition] = useState<Vector3>([0, 0, 0]);
  const [scale, setScale] = useState(1);

  return { scale, position };
};

export default useAnimation;
