import React, { FC, MutableRefObject } from "react";
import { CameraControls, Text } from "@react-three/drei";

type Props = {
  CameraControlRef: MutableRefObject<CameraControls | null>;
  name: string | null;
  position: [number, number, number];
};

const GameObject: FC<Props> = ({
  CameraControlRef,
  name,
  position,
}) => {
  return (
    <Text
      color="white"
      anchorX="center"
      anchorY="middle"
      position={[position[0], position[1] + 0.95, position[2]]}
      strokeColor={"black"}
      fillOpacity={0}
      strokeWidth={0.02}
      strokeOpacity={1}
      fontSize={0.1}
      rotation={[
        0,
        Math.PI - (CameraControlRef.current?.camera?.rotation?.y ?? 0),
        0,
      ]}
    >
      {name ?? ""}
    </Text>
  );
};

export default GameObject;
