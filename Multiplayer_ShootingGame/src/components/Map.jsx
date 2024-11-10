import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";

export const Map = ({ selectedMap }) => {
  const classic = useGLTF("models/map.glb");
  const beta = useGLTF("models/map_new.glb"); // Alternative map

  useEffect(() => {
    const map = selectedMap === 'classic' ? classic : beta;
    map.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [selectedMap, classic, beta]);

  const selectedMapData = selectedMap === 'classic' ? classic : beta;

  return (
    <RigidBody colliders="trimesh" type="fixed">
      <primitive object={selectedMapData.scene} />
    </RigidBody>
  );
};

useGLTF.preload("models/map.glb");
useGLTF.preload("models/map_new.glb"); // Preload second map
