import React, { FC } from "react";
import { Model } from "./Model";
import useAnimation from "./hooks/useAnimation";
import { MeshCollider, RigidBody } from "@react-three/rapier";

const GameObject: FC = () => {
  return (
    <RigidBody type="fixed" friction={1} mass={1}>
      <MeshCollider type="trimesh">
        <Model />
      </MeshCollider>
    </RigidBody>
  );
};

export default GameObject;
