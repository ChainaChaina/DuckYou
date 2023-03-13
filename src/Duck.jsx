import * as THREE from 'three'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, Suspense, useState } from "react"
import { Environment, useGLTF } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

function Duck({ z }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/duckerModel-transformed.glb')

  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, (z+1)])

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })


  useFrame((state) => {
    ref.current.position.set(data.x * width, (data.y += 0.025), z)
    ref.current.rotation.set((data.rX += 0.01), (data.rY += 0.01), (data.rZ += 0.01))
    if (data.y > height) {
      data.y = -height
    }
  })
  return (
    <mesh
      scale={0.01}
      ref={ref}
      geometry={nodes.defaultMaterial.geometry}
      material={materials.skin}
      position={[-13.47, 50.2, -16.57]}
    />
  )
}

export default function Ducks({ count = 80, depth = 80 }) {

  return (
    <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 40 }}>
      <color attach="background" args={['#f0e77d']}></color>
      <ambientLight intensity={0.3} />
      <spotLight position={10} intensity={0.2} />
      <Suspense fallback={null}>
        <Environment preset='sunset' />
        {Array.from({ length: count }, (_, i) => (<Duck key={i} z={-(i / count) * depth - 4}></Duck>))}
        <EffectComposer>
          <DepthOfField target={[0, 0, depth / 2]} focalLength={0.9} bokehScale={12} height={700} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
