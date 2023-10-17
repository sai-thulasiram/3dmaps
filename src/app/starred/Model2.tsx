import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";


type GLTFResult = GLTF & {
    nodes: {
       [key: string]: any
    };
    materials: {
      [key: string]: any
    };
  };

export function Model(props: any) {
  const { nodes, materials } = useGLTF("/mobile_radar.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        rotation-y={270}
        rotation-z={360}
        rotation-x={300}
        castShadow
        receiveShadow
        geometry={nodes["16012_Mobile_Radar_System"].geometry}
        material={nodes["16012_Mobile_Radar_System"].material}
      />
    </group>
  );
}

useGLTF.preload("/mobile_radar.glb");

export default Model;