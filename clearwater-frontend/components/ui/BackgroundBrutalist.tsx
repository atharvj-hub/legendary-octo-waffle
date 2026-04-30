'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, N8AO, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

function BrutalistObjects() {
  const group = useRef<THREE.Group>(null);

  const objects = useMemo(() => {
    const items = [];
    const geometries = [
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.IcosahedronGeometry(1.5, 0),
      new THREE.TorusGeometry(1.2, 0.4, 8, 4),
    ];
    const materials = [
      new THREE.MeshBasicMaterial({ color: '#ff0000' }), // red
      new THREE.MeshBasicMaterial({ color: '#000000' }), // black
      new THREE.MeshBasicMaterial({ color: '#ffffff' }), // white
    ];

    for (let i = 0; i < 40; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20 - 10,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 1.5 + 0.5,
        geometry: geometries[Math.floor(Math.random() * geometries.length)],
        material: materials[Math.floor(Math.random() * materials.length)],
      });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.05;
      group.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={group}>
      {objects.map((obj, i) => (
        <mesh
          key={i}
          position={obj.position as [number, number, number]}
          rotation={obj.rotation as [number, number, number]}
          scale={obj.scale}
          geometry={obj.geometry}
          material={obj.material}
        />
      ))}
    </group>
  );
}

export default function BackgroundBrutalist() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#DDE1D4]">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#DDE1D4']} />
        
        <BrutalistObjects />

        <EffectComposer disableNormalPass multisampling={0}>
          <N8AO distanceFalloff={0.2} aoRadius={2} intensity={4} />
          <Noise opacity={0.4} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
