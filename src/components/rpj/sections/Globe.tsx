'use client';

import { useEffect, useRef } from 'react';

type V3 = [number, number, number];

const GOLD = '227,194,127';
const ICE = '201,214,232';

const ORIGIN = {
  name: 'India',
  lat: 26.9,
  lng: 75.8,
};

const DESTS = [
  { name: 'Houston', lat: 29.7, lng: -95.4 },
  { name: 'Rotterdam', lat: 51.9, lng: 4.5 },
  { name: 'Shanghai', lat: 31.2, lng: 121.5 },
  { name: 'Jeddah', lat: 21.5, lng: 39.2 },
  { name: 'Santos', lat: -23.9, lng: -46.3 },
  { name: 'Sydney', lat: -33.9, lng: 151.2 },
  { name: 'Lagos', lat: 6.5, lng: 3.4 },
  { name: 'Moscow', lat: 55.7, lng: 37.6 },
];

const rad = (deg: number) => (deg * Math.PI) / 180;

const toVec = (lat: number, lng: number): V3 => [
  Math.cos(rad(lat)) * Math.sin(rad(lng)),
  Math.sin(rad(lat)),
  Math.cos(rad(lat)) * Math.cos(rad(lng)),
];

function slerp(a: V3, b: V3, t: number, lift: number): V3 {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));

  const w = Math.acos(dot);
  const s = Math.sin(w) || 1;

  const k1 = Math.sin((1 - t) * w) / s;
  const k2 = Math.sin(t * w) / s;

  const h = 1 + lift * Math.sin(Math.PI * t);

  return [(a[0] * k1 + b[0] * k2) * h, (a[1] * k1 + b[1] * k2) * h, (a[2] * k1 + b[2] * k2) * h];
}

export function GlobeArcs({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;

      if (!width || !height) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    resizeObserver.observe(canvas);

    // --------------------------------------------------
    // Globe geometry
    // --------------------------------------------------

    const origin = toVec(ORIGIN.lat, ORIGIN.lng);

    const arcs = DESTS.map((destination, index) => {
      const target = toVec(destination.lat, destination.lng);

      const points: V3[] = [];

      for (let i = 0; i <= 64; i++) {
        const t = i / 64;

        points.push(slerp(origin, target, t, 0.28));
      }

      return {
        target,
        points,
        offset: index * 0.75,
      };
    });

    // --------------------------------------------------
    // Surface dots
    // --------------------------------------------------

    const surfaceDots: V3[] = [];

    const DOT_COUNT = 1400;

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < DOT_COUNT; i++) {
      const y = 1 - (i / (DOT_COUNT - 1)) * 2;

      const radius = Math.sqrt(Math.max(0, 1 - y * y));

      const theta = goldenAngle * i;

      surfaceDots.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius]);
    }

    // --------------------------------------------------
    // Animation
    // --------------------------------------------------

    const TILT = 0.42;

    let rotation = -rad(ORIGIN.lng) + 0.5;

    let previousTime = performance.now();
    const startTime = previousTime;

    let animationFrame = 0;

    // --------------------------------------------------
    // Projection
    // --------------------------------------------------

    type Projected = [number, number, number, number, number];

    const project = (vector: V3): Projected => {
      const cosRotation = Math.cos(rotation);

      const sinRotation = Math.sin(rotation);

      const cosTilt = Math.cos(TILT);

      const sinTilt = Math.sin(TILT);

      const x1 = vector[0] * cosRotation + vector[2] * sinRotation;

      const z1 = -vector[0] * sinRotation + vector[2] * cosRotation;

      const y2 = vector[1] * cosTilt - z1 * sinTilt;

      const z2 = vector[1] * sinTilt + z1 * cosTilt;

      const radius = Math.min(width, height) * 0.44;

      const centerX = width / 2;
      const centerY = height / 2;

      return [centerX + x1 * radius, centerY - y2 * radius, z2, x1, y2];
    };

    const isVisible = (point: Projected) => {
      return point[2] > 0 || point[3] * point[3] + point[4] * point[4] > 1;
    };

    // --------------------------------------------------
    // Draw
    // --------------------------------------------------

    const draw = (now: number) => {
      if (!width || !height) {
        animationFrame = requestAnimationFrame(draw);

        return;
      }

      const deltaTime = Math.min(0.05, (now - previousTime) / 1000);

      previousTime = now;

      const elapsed = (now - startTime) / 1000;

      // Continuous globe rotation
      if (!reduceMotion) {
        rotation += deltaTime * 0.16;
      }

      const radius = Math.min(width, height) * 0.44;

      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // --------------------------------------------------
      // Globe body
      // --------------------------------------------------

      const globeGradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.35,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );

      globeGradient.addColorStop(0, 'rgba(46,92,150,0.30)');

      globeGradient.addColorStop(1, 'rgba(10,26,47,0.04)');

      ctx.fillStyle = globeGradient;

      ctx.beginPath();

      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

      ctx.fill();

      // --------------------------------------------------
      // Gold atmosphere
      // --------------------------------------------------

      const atmosphere = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.96,
        centerX,
        centerY,
        radius * 1.2
      );

      atmosphere.addColorStop(0, `rgba(${GOLD},0.16)`);

      atmosphere.addColorStop(1, `rgba(${GOLD},0)`);

      ctx.fillStyle = atmosphere;

      ctx.beginPath();

      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);

      ctx.fill();

      // --------------------------------------------------
      // Globe border
      // --------------------------------------------------

      ctx.strokeStyle = `rgba(${GOLD},0.55)`;

      ctx.lineWidth = 1;

      ctx.beginPath();

      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

      ctx.stroke();

      // --------------------------------------------------
      // Latitude / longitude
      // --------------------------------------------------

      ctx.lineWidth = 0.6;

      ctx.strokeStyle = `rgba(${ICE},0.16)`;

      const drawLine = (points: V3[]) => {
        ctx.beginPath();

        let drawing = false;

        for (const vector of points) {
          const point = project(vector);

          if (point[2] > 0) {
            if (!drawing) {
              ctx.moveTo(point[0], point[1]);
            } else {
              ctx.lineTo(point[0], point[1]);
            }

            drawing = true;
          } else {
            drawing = false;
          }
        }

        ctx.stroke();
      };

      // Meridians
      for (let longitude = 0; longitude < 360; longitude += 30) {
        const line: V3[] = [];

        for (let latitude = -90; latitude <= 90; latitude += 5) {
          line.push(toVec(latitude, longitude));
        }

        drawLine(line);
      }

      // Parallels
      for (let latitude = -60; latitude <= 60; latitude += 30) {
        const line: V3[] = [];

        for (let longitude = 0; longitude <= 360; longitude += 5) {
          line.push(toVec(latitude, longitude));
        }

        drawLine(line);
      }

      // --------------------------------------------------
      // Surface dots
      // --------------------------------------------------

      for (const dot of surfaceDots) {
        const point = project(dot);

        if (point[2] <= 0) continue;

        ctx.fillStyle = `rgba(${ICE},${0.08 + point[2] * 0.4})`;

        ctx.fillRect(point[0] - 0.7, point[1] - 0.7, 1.4, 1.4);
      }

      // --------------------------------------------------
      // Animated routes
      // --------------------------------------------------

      const CYCLE = 6;

      arcs.forEach((arc) => {
        const local = ((elapsed + arc.offset) % CYCLE) / CYCLE;

        const progress = Math.min(1, local / 0.55);

        const fade = local < 0.8 ? 1 : Math.max(0, 1 - (local - 0.8) / 0.2);

        const head = Math.min(64, Math.floor(progress * 64));

        // --------------------------------------------------
        // Faint route
        // --------------------------------------------------

        ctx.lineWidth = 0.8;

        ctx.strokeStyle = `rgba(${GOLD},0.12)`;

        ctx.beginPath();

        let drawing = false;

        for (let i = 0; i < arc.points.length; i++) {
          const vector = arc.points[i];

          if (!vector) continue;

          const point = project(vector);

          if (isVisible(point)) {
            if (!drawing) {
              ctx.moveTo(point[0], point[1]);
            } else {
              ctx.lineTo(point[0], point[1]);
            }

            drawing = true;
          } else {
            drawing = false;
          }
        }

        ctx.stroke();

        // --------------------------------------------------
        // Glowing trail
        // --------------------------------------------------

        const tail = Math.max(0, head - 30);

        for (let i = tail; i < head; i++) {
          const first = arc.points[i];

          const second = arc.points[i + 1];

          // IMPORTANT:
          // Prevent undefined point crash
          if (!first || !second) {
            continue;
          }

          const point1 = project(first);

          const point2 = project(second);

          if (!isVisible(point1) || !isVisible(point2)) {
            continue;
          }

          const intensity = (i - tail) / Math.max(1, head - tail);

          ctx.strokeStyle = `rgba(${GOLD},${(0.15 + intensity * 0.85) * fade})`;

          ctx.lineWidth = 1 + intensity * 1.4;

          ctx.beginPath();

          ctx.moveTo(point1[0], point1[1]);

          ctx.lineTo(point2[0], point2[1]);

          ctx.stroke();
        }

        // --------------------------------------------------
        // Moving head
        // --------------------------------------------------

        const headPoint = arc.points[Math.min(head, arc.points.length - 1)];

        if (headPoint && progress < 1) {
          const projectedHead = project(headPoint);

          if (isVisible(projectedHead)) {
            ctx.fillStyle = `rgba(255,236,190,${fade})`;

            ctx.shadowColor = `rgba(${GOLD},1)`;

            ctx.shadowBlur = 10;

            ctx.beginPath();

            ctx.arc(projectedHead[0], projectedHead[1], 2.2, 0, Math.PI * 2);

            ctx.fill();

            ctx.shadowBlur = 0;
          }
        }

        // --------------------------------------------------
        // Destination
        // --------------------------------------------------

        const destinationPoint = project(arc.target);

        if (destinationPoint[2] > 0) {
          ctx.fillStyle = `rgba(${GOLD},0.9)`;

          ctx.beginPath();

          ctx.arc(destinationPoint[0], destinationPoint[1], 2.6, 0, Math.PI * 2);

          ctx.fill();

          if (progress >= 1) {
            const pulseProgress = Math.min(1, Math.max(0, (local - 0.55) / 0.45));

            ctx.strokeStyle = `rgba(${GOLD},${0.7 * (1 - pulseProgress)})`;

            ctx.lineWidth = 1.2;

            ctx.beginPath();

            ctx.arc(
              destinationPoint[0],
              destinationPoint[1],
              3 + pulseProgress * 16,
              0,
              Math.PI * 2
            );

            ctx.stroke();
          }
        }
      });

      // --------------------------------------------------
      // India origin
      // --------------------------------------------------

      const originPoint = project(origin);

      if (originPoint[2] > 0) {
        const pulse = (elapsed % 2.2) / 2.2;

        ctx.strokeStyle = `rgba(${GOLD},${0.8 * (1 - pulse)})`;

        ctx.lineWidth = 1.4;

        ctx.beginPath();

        ctx.arc(originPoint[0], originPoint[1], 5 + pulse * 22, 0, Math.PI * 2);

        ctx.stroke();

        ctx.fillStyle = '#e3c27f';

        ctx.shadowColor = `rgba(${GOLD},1)`;

        ctx.shadowBlur = 14;

        ctx.beginPath();

        ctx.arc(originPoint[0], originPoint[1], 4.5, 0, Math.PI * 2);

        ctx.fill();

        ctx.shadowBlur = 0;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);

      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
