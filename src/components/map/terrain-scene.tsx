import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

function terrainHeight(x: number, y: number) {
  const basin = -2.5 * Math.exp(-((x + 1.5) ** 2 + (y - 1) ** 2) / 28);
  const ridge = 1.4 * Math.sin(x * 0.34) + 0.8 * Math.cos(y * 0.5);
  return basin + ridge + 1.8;
}

function waterColor(depth: number) {
  if (depth >= 1.5) return "#bd3445";
  if (depth >= 0.8) return "#df674b";
  if (depth >= 0.2) return "#e6a343";
  return "#4a9ec2";
}

function Terrain({ depthGrid }: { depthGrid: number[][] }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 15, 42, 34);
    const positions = geo.getAttribute("position");
    for (let i = 0; i < positions.count; i += 1) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      positions.setZ(i, terrainHeight(x, y));
    }
    positions.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  const buildings: Array<[number, number, number]> = [
    [-5, 1.1, -2],
    [-3, 0.8, -3.4],
    [1.2, 0.7, -2.6],
    [3.6, 1, -1.3],
    [5.4, 0.65, 1.4],
    [2.6, 0.9, 3.2],
    [-1.1, 0.75, 3.8],
    [-4.4, 1.2, 3],
  ];
  const rowCount = depthGrid.length;
  const columnCount = depthGrid[0]?.length ?? 0;
  const cellWidth = 20 / Math.max(columnCount, 1);
  const cellDepth = 15 / Math.max(rowCount, 1);

  return (
    <group rotation-x={-Math.PI / 2}>
      <mesh receiveShadow>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial color="#324b45" roughness={0.92} metalness={0.02} flatShading />
      </mesh>
      {depthGrid.flatMap((row, rowIndex) =>
        row.map((depth, columnIndex) => {
          if (depth < 0.01) return null;
          const x = -10 + (columnIndex + 0.5) * cellWidth;
          const y = -7.5 + (rowIndex + 0.5) * cellDepth;
          return (
            <mesh
              key={`${rowIndex}-${columnIndex}`}
              position={[x, y, terrainHeight(x, y) + depth / 2]}
            >
              <boxGeometry args={[cellWidth * 0.94, cellDepth * 0.94, depth]} />
              <meshPhysicalMaterial
                color={waterColor(depth)}
                transparent
                opacity={0.78}
                roughness={0.16}
                metalness={0.08}
              />
            </mesh>
          );
        }),
      )}
      {buildings.map(([x, h, y], index) => (
        <mesh key={index} position={[x, y, 1.5 + h / 2]} castShadow>
          <boxGeometry args={[0.8, 0.8, h * 2]} />
          <meshStandardMaterial color={index === 3 ? "#e2b345" : "#a7b5b1"} roughness={0.75} />
        </mesh>
      ))}
      <mesh position={[0, -1.4, 2.2]}>
        <boxGeometry args={[18, 0.18, 0.08]} />
        <meshStandardMaterial color="#d7e0dd" />
      </mesh>
    </group>
  );
}

export function TerrainScene({ depthGrid }: { depthGrid: number[][] }) {
  return (
    <div className="h-full min-h-[360px] w-full">
      <Canvas shadows dpr={1} camera={{ position: [12, 12, 14], fov: 42 }}>
        <color attach="background" args={["#0b151b"]} />
        <fog attach="fog" args={["#0b151b", 18, 38]} />
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[8, 14, 9]}
          intensity={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Terrain depthGrid={depthGrid} />
        <Environment>
          <Lightformer intensity={1.8} color="#cfe4e3" position={[0, 8, 2]} scale={[12, 12, 1]} />
          <Lightformer
            intensity={0.8}
            color="#5cc8d7"
            position={[-8, 2, 0]}
            rotation-y={Math.PI / 2}
            scale={[12, 2, 1]}
          />
        </Environment>
        <OrbitControls
          enablePan={false}
          minDistance={12}
          maxDistance={25}
          maxPolarAngle={Math.PI / 2.25}
        />
      </Canvas>
    </div>
  );
}
