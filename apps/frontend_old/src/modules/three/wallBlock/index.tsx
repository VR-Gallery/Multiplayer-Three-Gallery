import React, { FC } from "react";
import { Model } from "./Model";
import useAnimation from "./hooks/useAnimation";

type Props = {
  usePictureAnimPlay: boolean;
};
const GameObject: FC<Props> = ({usePictureAnimPlay}) => {
  const { scale, position } = useAnimation(usePictureAnimPlay);

  return <Model position={position} scale={scale} />;
};

export default GameObject;
