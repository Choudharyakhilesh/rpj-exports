'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { LAND_DOTS } from './land-dots';
import { atmosphereObj, cameraObj, globeObj, heroSheet, studioState } from './theatre';
import { INTRO_END, SEQUENCE_END } from './theatre-state';

const R = 2;
const JAIPUR = { lat: 26.91, lon: 75.79 };
const PORTS = [
  { lat: 29.76, lon: -95.37 }, // Houston
  { lat: 51.92, lon: 4.48 }, // Rotterdam
  { lat: 53.55, lon: 9.99 }, // Hamburg
  { lat: 31.23, lon: 121.47 }, // Shanghai
  { lat: 25.2, lon: 55.27 }, // Jebel Ali
  { lat: -23.96, lon: -46.33 }, // Santos
  { lat: 35.68, lon: 139.69 }, // Tokyo
  { lat: -33.87, lon: 151.21 }, // Sydney
  { lat: 43.65, lon: -79.38 }, // Toronto
  { lat: 1.29, lon: 103.85 }, // Singapore
];

const GOLD = new THREE.Color('#D9B26A');
const CREAM = new THREE.Color('#C9D6E8');

function latLon(lat: number, lon: number, r = R) {
  const phi = THREE.MathUtils.degToRad(lat);
  const lam = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    r * Math.cos(phi) * Math.sin(lam),
    r * Math.sin(phi),
    r * Math.cos(phi) * Math.cos(lam)
  );
}

type Driver = {
  intro: { t: number };
  scroll: MotionValue<number>;
  reducedMotion: boolean;
};

/* ------------------------------------------------------------------ */
/* Globe                                                               */
/* ------------------------------------------------------------------ */

function LandDots() {
  const { geometry, material } = useMemo(() => {
    const count = LAND_DOTS.length / 2;
    const positions = new Float32Array(count * 3);
    const heat = new Float32Array(count);
    const source = latLon(JAIPUR.lat, JAIPUR.lon).normalize();
    for (let i = 0; i < count; i++) {
      const v = latLon(LAND_DOTS[i * 2] / 10, LAND_DOTS[i * 2 + 1] / 10, R * 1.002);
      positions.set([v.x, v.y, v.z], i * 3);
      const d = v.clone().normalize().dot(source);
      heat[i] = THREE.MathUtils.smoothstep(d, Math.cos(0.26), Math.cos(0.03));
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aHeat', new THREE.BufferAttribute(heat, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uSize: { value: 30 },
        uPixelRatio: { value: 1 },
        uBase: { value: CREAM },
        uHot: { value: GOLD },
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        attribute float aHeat;
        uniform float uSize;
        uniform float uPixelRatio;
        uniform float uTime;
        varying float vHeat;
        varying float vFacing;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vec3 n = normalize(normalMatrix * position);
          vFacing = dot(n, normalize(-mv.xyz));
          vHeat = aHeat;
          float pulse = 1.0 + aHeat * 0.35 * sin(uTime * 2.4);
          gl_PointSize = uSize * uPixelRatio * pulse * (1.0 + aHeat * 0.6) / -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uBase;
        uniform vec3 uHot;
        varying float vHeat;
        varying float vFacing;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float edge = smoothstep(0.5, 0.2, d);
          float limb = smoothstep(-0.05, 0.45, vFacing);
          vec3 col = mix(uBase, uHot, vHeat);
          gl_FragColor = vec4(col, edge * limb * mix(0.62, 1.0, vHeat));
        }
      `,
    });
    return { geometry, material };
  }, []);

  const dpr = useThree((s) => s.viewport.dpr);
  useEffect(() => {
    material.uniforms.uPixelRatio.value = dpr;
  }, [dpr, material]);
  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
  });

  return <primitive object={new THREE.Points(geometry, material)} />;
}

function GlobeBody({ glow }: { glow: React.RefObject<number> }) {
  const core = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uBase: { value: new THREE.Color('#0A1A2F') },
          uRim: { value: new THREE.Color('#2B5286') },
        },
        vertexShader: /* glsl */ `
          varying vec3 vN;
          varying vec3 vV;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vN = normalize(normalMatrix * normal);
            vV = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uBase;
          uniform vec3 uRim;
          varying vec3 vN;
          varying vec3 vV;
          void main() {
            float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.5);
            gl_FragColor = vec4(mix(uBase, uRim, f), 1.0);
          }
        `,
      }),
    []
  );

  const halo = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColor: { value: new THREE.Color('#E0B872') },
          uStrength: { value: 1 },
        },
        vertexShader: /* glsl */ `
          varying vec3 vN;
          varying vec3 vV;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vN = normalize(normalMatrix * normal);
            vV = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uStrength;
          varying vec3 vN;
          varying vec3 vV;
          void main() {
            // Back faces: -dot is 0 at the halo's outer edge and grows toward the globe.
            float i = pow(clamp(-dot(vN, vV), 0.0, 1.0), 1.6);
            gl_FragColor = vec4(uColor, i * 0.75 * uStrength);
          }
        `,
      }),
    []
  );

  const grid = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      for (let lon = 0; lon <= 360; lon += 4) {
        pts.push(latLon(lat, lon, R * 1.004), latLon(lat, lon + 4, R * 1.004));
      }
    }
    for (let lon = 0; lon < 360; lon += 30) {
      for (let lat = -84; lat < 84; lat += 4) {
        pts.push(latLon(lat, lon, R * 1.004), latLon(lat + 4, lon, R * 1.004));
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame(() => {
    halo.uniforms.uStrength.value = glow.current ?? 1;
  });

  return (
    <>
      <mesh material={core}>
        <sphereGeometry args={[R * 0.992, 48, 48]} />
      </mesh>
      <lineSegments geometry={grid}>
        <lineBasicMaterial color="#6F8FB8" transparent opacity={0.07} depthWrite={false} />
      </lineSegments>
      <mesh material={halo} scale={1.22}>
        <sphereGeometry args={[R, 40, 40]} />
      </mesh>
    </>
  );
}

function TradeRoutes({ progress }: { progress: React.RefObject<number> }) {
  const routes = useMemo(() => {
    const a = latLon(JAIPUR.lat, JAIPUR.lon).normalize();
    return PORTS.map((port, i) => {
      const b = latLon(port.lat, port.lon).normalize();
      const angle = a.angleTo(b);
      const lift = 0.18 + angle * 0.32;
      const points: THREE.Vector3[] = [];
      for (let s = 0; s <= 64; s++) {
        const t = s / 64;
        const p = new THREE.Vector3()
          .copy(a)
          .multiplyScalar(Math.sin((1 - t) * angle))
          .add(b.clone().multiplyScalar(Math.sin(t * angle)))
          .divideScalar(Math.sin(angle))
          .normalize()
          .multiplyScalar(R * 1.004 + lift * Math.sin(Math.PI * t));
        points.push(p);
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 80, 0.0075, 5, false);
      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uOffset: { value: i * 0.137 },
          uColor: { value: GOLD },
        },
        vertexShader: /* glsl */ `
          varying float vT;
          void main() {
            vT = uv.x;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uProgress;
          uniform float uTime;
          uniform float uOffset;
          uniform vec3 uColor;
          varying float vT;
          void main() {
            if (vT > uProgress) discard;
            float head = fract(uTime * 0.16 + uOffset);
            float pulse = smoothstep(0.09, 0.0, abs(vT - head));
            float tip = smoothstep(0.06, 0.0, uProgress - vT) * step(uProgress, 0.999);
            float a = 0.22 + 0.25 * vT + pulse * 0.9 + tip;
            gl_FragColor = vec4(uColor * (1.0 + pulse * 1.2 + tip), a);
          }
        `,
      });
      return { geometry, material, end: points[points.length - 1] };
    });
  }, []);

  const markers = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const p = progress.current ?? 0;
    routes.forEach((route, i) => {
      const local = THREE.MathUtils.clamp(p * 1.6 - i * 0.06, 0, 1);
      route.material.uniforms.uProgress.value = local;
      route.material.uniforms.uTime.value = clock.elapsedTime;
      const marker = markers.current?.children[i];
      if (marker) marker.scale.setScalar(local >= 0.99 ? 1 : 0.0001);
    });
  });

  return (
    <group>
      {routes.map((r, i) => (
        <mesh key={i} geometry={r.geometry} material={r.material} />
      ))}
      <group ref={markers}>
        {routes.map((r, i) => (
          <mesh key={i} position={r.end}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshBasicMaterial color="#F3D59B" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function SourceBeacon() {
  const ring = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const { position, quaternion } = useMemo(() => {
    const position = latLon(JAIPUR.lat, JAIPUR.lon, R * 1.006);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      position.clone().normalize()
    );
    return { position, quaternion };
  }, []);

  useFrame(({ clock }) => {
    [ring.current, ring2.current].forEach((m, i) => {
      if (!m) return;
      const t = (clock.elapsedTime * 0.55 + i * 0.5) % 1;
      m.scale.setScalar(0.4 + t * 2.4);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.8;
    });
  });

  return (
    <group position={position} quaternion={quaternion}>
      <mesh>
        <sphereGeometry args={[0.034, 16, 16]} />
        <meshBasicMaterial color="#FFE3A8" />
      </mesh>
      {[ring, ring2].map((r, i) => (
        <mesh key={i} ref={r}>
          <ringGeometry args={[0.05, 0.062, 48]} />
          <meshBasicMaterial
            color="#E7BE73"
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Guar seeds + powder                                                 */
/* ------------------------------------------------------------------ */

const SEED_COUNT = 150;
const SEED_TONES = ['#D8CCB0', '#C4B38C', '#E7DFCB', '#A99672', '#CFC2A2', '#8F7D5B'];

function GuarSeeds({ amount }: { amount: React.RefObject<number> }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: SEED_COUNT }, () => ({
        radius: R * 1.45 + Math.random() * R * 1.5,
        angle: Math.random() * Math.PI * 2,
        height: (Math.random() - 0.5) * 1.4,
        speed: 0.04 + Math.random() * 0.08,
        size: 0.035 + Math.random() * 0.03,
        spin: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
        spinSpeed: 0.3 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const c = new THREE.Color();
    seeds.forEach((_, i) => m.setColorAt(i, c.set(SEED_TONES[i % SEED_TONES.length])));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [seeds]);

  const obj = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const t = clock.elapsedTime;
    const k = amount.current ?? 1;
    seeds.forEach((s, i) => {
      const a = s.angle + t * s.speed;
      const r = s.radius * (0.7 + 0.3 * k);
      obj.position.set(
        Math.cos(a) * r,
        s.height + Math.sin(t * 0.6 + s.phase) * 0.12,
        Math.sin(a) * r
      );
      obj.quaternion.setFromAxisAngle(s.spin, t * s.spinSpeed + s.phase);
      const sc = s.size * k;
      obj.scale.set(sc, sc * 0.68, sc * 0.86);
      obj.updateMatrix();
      m.setMatrixAt(i, obj.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <group rotation={[0.32, 0, -0.22]}>
      <instancedMesh ref={mesh} args={[undefined, undefined, SEED_COUNT]} frustumCulled={false}>
        <sphereGeometry args={[1, 12, 9]} />
        <meshStandardMaterial roughness={0.62} metalness={0.04} />
      </instancedMesh>
    </group>
  );
}

function PowderDrift() {
  const { geometry, material } = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      seed[i] = Math.random();
    }
    const geometry: THREE.BufferGeometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));

    geometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(seed, 1));
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute float aSeed;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vA;
        void main() {
          vec3 p = position;
          p.y = mod(p.y + uTime * (0.08 + aSeed * 0.12) + 5.0, 10.0) - 5.0;
          p.x += sin(uTime * 0.3 + aSeed * 12.0) * 0.3;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (6.0 + aSeed * 14.0) * uPixelRatio / -mv.z;
          vA = 0.25 + 0.5 * aSeed;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vA;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          gl_FragColor = vec4(0.93, 0.78, 0.52, smoothstep(0.5, 0.0, d) * vA);
        }
      `,
    });
    return { geometry, material };
  }, []);
  const dpr = useThree((s) => s.viewport.dpr);
  useEffect(() => {
    material.uniforms.uPixelRatio.value = dpr;
  }, [dpr, material]);
  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
  });
  return <points geometry={geometry} material={material} />;
}

/* ------------------------------------------------------------------ */
/* Director — reads the Theatre sheet every frame                      */
/* ------------------------------------------------------------------ */

function Director({ intro, scroll, reducedMotion }: Driver) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const anchor = useRef<THREE.Group>(null);
  const globe = useRef<THREE.Group>(null);
  const routes = useRef(0);
  const seeds = useRef(0);
  const glow = useRef(0);
  const parallax = useRef(new THREE.Vector2());
  const lastPosition = useRef(-1);

  useFrame(({ clock, pointer }, delta) => {
    const position = reducedMotion
      ? INTRO_END
      : Math.min(SEQUENCE_END, intro.t + scroll.get() * (SEQUENCE_END - INTRO_END));
    if (!studioState.active && Math.abs(position - lastPosition.current) > 1e-4) {
      heroSheet.sequence.position = position;
      lastPosition.current = position;
    }

    const cam = cameraObj.value;
    const g = globeObj.value;
    const atm = atmosphereObj.value;
    const narrow = size.width < 768;

    parallax.current.lerp(pointer, 1 - Math.exp(-delta * 3));
    camera.position.set(
      cam.x + parallax.current.x * 0.35,
      cam.y + parallax.current.y * 0.25,
      cam.z * (narrow ? 1.45 : 1)
    );
    camera.fov = cam.fov;
    camera.updateProjectionMatrix();
    camera.lookAt(0, narrow ? -0.4 : 0, 0);

    if (anchor.current && globe.current) {
      const idle = reducedMotion ? 0 : clock.elapsedTime * 0.035;
      // anchor.current.position.set(narrow ? 0 : g.offsetX, narrow ? -1.5 + g.offsetY : g.offsetY, 0);
      anchor.current.position.set(
        narrow ? 0 : g.offsetX - 1.2, // <- -1.2 add karne se Globe Left ki taraf shift ho jayega
        narrow ? -1.5 + g.offsetY : g.offsetY,
        0
      );
      anchor.current.scale.setScalar(g.scale * (narrow ? 0.9 : 1));
      // Spin about the globe's own axis first, then tilt so Jaipur faces the camera.
      globe.current.rotation.set(
        THREE.MathUtils.degToRad(JAIPUR.lat) * 0.85,
        -THREE.MathUtils.degToRad(JAIPUR.lon) + g.spin + idle,
        0
      );
    }

    routes.current = atm.routes;
    seeds.current = atm.seeds;
    glow.current = atm.glow;
  });

  return (
    <group ref={anchor}>
      <group ref={globe}>
        <GlobeBody glow={glow} />
        <LandDots />
        <TradeRoutes progress={routes} />
        <SourceBeacon />
      </group>
      <GuarSeeds amount={seeds} />
    </group>
  );
}

export default function HeroScene({
  active,
  ...driver
}: Driver & {
  active: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      performance={{ min: 0.6 }}
      camera={{ position: [0, 0, 15], fov: 30, near: 0.1, far: 100 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.55} color="#8FA6C8" />
      <directionalLight position={[-6, 5, 6]} intensity={2.4} color="#FFD9A0" />
      <pointLight position={[5, -3, 4]} intensity={18} color="#5E86C2" />

      <Director {...driver} />
      <PowderDrift />
    </Canvas>
  );
}
