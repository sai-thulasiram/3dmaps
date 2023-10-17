"use client"

import { Suspense } from 'react'
import { useFrame, Vector3, useLoader } from "@react-three/fiber";
import Mapbox from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, PropsWithChildren, useRef, useState } from "react";
import Map, { Marker } from 'react-map-gl';
import { Canvas, Coordinates } from "react-three-map";
import { Mesh } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment, OrthographicCamera, OrbitControls } from '@react-three/drei'

import Model from './Model'


function Scene() {
  const gltf = useLoader(GLTFLoader, '/radar.glb')
  return <primitive object={gltf.scene} />
}

const Box: FC<{ position: Vector3 }> = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>(null)
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta;
    ref.current.rotation.z -= delta;
  })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function MapView() {

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ;

  Mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

  return <div style={{ height: '100vh' }}>
    {mapboxToken && <Map
      antialias
      initialViewState={{
        latitude: 52,
        longitude: 0,
        zoom: 13,
        pitch: 80,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <Marker longitude={0} latitude={51} anchor="bottom" >
      </Marker>
      <Marker longitude={0} latitude={52} anchor="bottom" >
      </Marker>
      <Canvas latitude={51} longitude={0}>
        <hemisphereLight
          args={["#ffffff", "#60666C"]}
          position={[1, 4.5, 3]}
        />
        <Coordinates latitude={51} longitude={0}>
          <object3D scale={500}>
            <Suspense fallback={null}>
              <Model />
              <Environment preset="city" />
            </Suspense>
          </object3D>
        </Coordinates>
        <Coordinates latitude={52} longitude={0} >
          <object3D scale={500}>
            <Suspense fallback={null}>
              <Model />
              <Environment preset="city" />
            </Suspense>
          </object3D>
          <OrbitControls />
        <OrthographicCamera
          makeDefault
          zoom={1}
          top={200}
          bottom={-200}
          left={200}
          right={-200}
          near={1}
          far={2000}
          position={[0, 0, 200]}
        />
        </Coordinates>
      
      </Canvas>
    </Map>}
  </div>
}

const Center = ({ children }: PropsWithChildren) => (
  <div style={{
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }}>{children}</div>
)

export default MapView;