import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
      node_id70: THREE.Mesh; 
      node_id83: THREE.Mesh;
    };
    materials: {
      [key: string]: any
    };
  };

export function Model(props : any) {
  const { nodes, materials } = useGLTF("/radar.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.node_id70.geometry}
        material={materials["200"]}
        position={[0.066, -0.224, 0.311]}
        rotation={[0.137, 0.45, -0.06]}
        scale={[0.008, 0.009, 0.018]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.node_id83.geometry}
        material={materials["218"]}
        position={[0.049, 0.002, 0.492]}
        rotation={[0, 0.454, 0]}
        scale={[0.022, 0.02, 0.043]}
      />
    </group>
  );
}

useGLTF.preload("/radar.glb");

export default Model;