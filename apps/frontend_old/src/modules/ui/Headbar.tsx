import React, { FC } from "react";
import Call from "@modules/videoDaily/Call/Call";
import { joinState } from "@modules/three/sence";
import { useRecoilValue } from "recoil";

const ComplexNavbar: FC = () => {
  const { isJoined, isDailyJoined } = useRecoilValue(joinState);

  return <>{isDailyJoined && <Call />}</>;
};

export default ComplexNavbar;
