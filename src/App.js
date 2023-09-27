import logo from "./logo.svg";
import "./App.css";
import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  ScrollControls,
  Scroll,
  useScroll,
  Preload,
  Image,
  MeshTransmissionMaterial,
  useFBO,
  useProgress,
  Html,
} from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ whiteSpace: "nowrap", fontSize: "13px" }}>
        {Math.floor(progress)}% loaded
      </div>
    </Html>
  );
}

export default function App() {
  return (
    <>
      <Canvas
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 20], fov: 17 }}
      >
        <Suspense fallback={<Loader />}>
          <ScrollControls damping={0.1} maxSpeed={1} pages={3}>
            <Lens>
              <Scroll>
                <Images />
              </Scroll>
              <Preload />
            </Lens>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  );
}

function Lens({ children, damping = 0.5, ...props }) {
  const { nodes } = useGLTF("/lens-transformed.glb");
  const buffer = useFBO();
  const [scene] = useState(() => new THREE.Scene());
  const mesh = useRef();
  const data = useScroll();
  useFrame((state, delta) => {
    mesh.current.rotation.y = THREE.MathUtils.lerp(
      mesh.current.rotation.y,
      data.offset / 3,
      damping
    );
    // Calculate opacity based on scroll position
    const opacity = 1 - data.offset; // Adjust maxScrollOffset as needed

    // Set the opacity of the material
    mesh.current.material.opacity = opacity;
    state.gl.setRenderTarget(buffer);
    state.gl.setClearColor("#d8d7d7");
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <>
      {createPortal(children, scene)}
      <mesh
        ref={mesh}
        scale={[0.8, 0.5, 0.5]}
        position={[0, 0, isTabletOrMobile ? 8 : 15]}
        rotation={[Math.PI / 3, Math.PI / 4, 0]}
        geometry={nodes.Cylinder.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          thickness={2}
          anisotropy={2}
          chromaticAberration={0}
          ior={1.2}
        />
      </mesh>
    </>
  );
}

function Images() {
  const group = useRef();
  const data = useScroll();
  const { width, height } = useThree((state) => state.viewport);
  useFrame(() => {
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
  });
  return (
    <group ref={group}>
      <Image
        position={[0, 0, 0]}
        scale={[width / 2, height, 0.3]}
        url="/flower.jpeg"
      />
      <Image
        position={[0, -6, 0]}
        scale={[width / 2, height, 0.3]}
        url="/shed.jpeg"
      />
      <Image
        position={[0, -12, 0]}
        scale={[width / 2, height, 0.3]}
        url="/plains.JPG"
      />
    </group>
  );
}
