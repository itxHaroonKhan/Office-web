// @ts-nocheck
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const Ballpit = ({
  count = 200,
  gravity = 0.5,
  friction = 0.9975,
  wallBounce = 0.95,
  followCursor = true,
  colors = [0x269DA3, 0x4EC9D0, 0x1A7A7F, 0xA8EDEE],
  ambientColor = 0xffffff,
  ambientIntensity = 1,
  lightIntensity = 200,
  minSize = 0.5,
  maxSize = 1.0,
  className = '',
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    const getW = () => (container ? container.offsetWidth  : window.innerWidth);
    const getH = () => (container ? container.offsetHeight : window.innerHeight);

    let W = getW(), H = getH();

    // — Renderer —
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // — Scene / Camera —
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 20;

    // — Environment (PBR) —
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment()).texture;

    // — Material —
    const material = new THREE.MeshPhysicalMaterial({
      envMap: envTex,
      metalness: 0.2,
      roughness: 0.15,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      transmission: 0.1,
      ior: 1.5,
    });

    // — Geometry + Instanced Mesh —
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.frustumCulled = false;
    scene.add(mesh);

    // — Per-instance colours —
    const palette = colors.map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) mesh.setColorAt(i, palette[i % palette.length]);
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // — Lights —
    const ambient = new THREE.AmbientLight(ambientColor, ambientIntensity);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(palette[0], lightIntensity);
    scene.add(pointLight);

    // — World half-extents —
    const calcBounds = () => {
      const hFov = THREE.MathUtils.degToRad(camera.fov) / 2;
      const halfH = Math.tan(hFov) * camera.position.z;
      return { halfW: halfH * camera.aspect, halfH };
    };
    let { halfW, halfH } = calcBounds();

    // — Physics arrays —
    const pos   = new Float32Array(count * 3);
    const vel   = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      sizes[i]    = minSize + Math.random() * (maxSize - minSize);
      pos[i*3]    = (Math.random() * 2 - 1) * halfW;
      pos[i*3+1]  = (Math.random() * 2 - 1) * halfH;
      vel[i*3]    = (Math.random() - 0.5) * 0.05;
      vel[i*3+1]  = (Math.random() - 0.5) * 0.05;
    }

    // — Mouse —
    const mouse = { x: 99999, y: 99999 };
    const onMove = (e) => {
      if (!followCursor) return;
      const r = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width)  *  2 - 1;
      mouse.y = ((e.clientY - r.top)  / r.height) * -2 + 1;
    };
    const onTouch = (e) => {
      if (!followCursor || !e.touches[0]) return;
      const r = canvas.getBoundingClientRect();
      mouse.x = ((e.touches[0].clientX - r.left) / r.width)  *  2 - 1;
      mouse.y = ((e.touches[0].clientY - r.top)  / r.height) * -2 + 1;
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchmove', onTouch, { passive: true });

    // — Resize —
    const onResize = () => {
      W = getW(); H = getH();
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      ({ halfW, halfH } = calcBounds());
    };
    window.addEventListener('resize', onResize);

    // — Animation loop —
    const dummy = new THREE.Object3D();
    let raf;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const mx = mouse.x * halfW;
      const my = mouse.y * halfH;

      for (let i = 0; i < count; i++) {
        const b = i * 3;
        // gravity
        vel[b+1] -= gravity * sizes[i];
        // friction
        vel[b]   *= friction;
        vel[b+1] *= friction;
        // cursor repel
        if (followCursor) {
          const dx = pos[b] - mx, dy = pos[b+1] - my;
          const d2 = dx*dx + dy*dy, rr = 2.5;
          if (d2 < rr*rr && d2 > 0.0001) {
            const d = Math.sqrt(d2), f = (rr - d) / rr * 0.5;
            vel[b]   += dx/d * f;
            vel[b+1] += dy/d * f;
          }
        }
        // clamp speed
        const spd = Math.sqrt(vel[b]*vel[b] + vel[b+1]*vel[b+1]);
        if (spd > 0.15) { vel[b] *= 0.15/spd; vel[b+1] *= 0.15/spd; }
        // integrate
        pos[b]   += vel[b];
        pos[b+1] += vel[b+1];
        // walls
        const s = sizes[i];
        if (pos[b]   - s < -halfW) { pos[b]   = -halfW + s; vel[b]   =  Math.abs(vel[b])   * wallBounce; }
        if (pos[b]   + s >  halfW) { pos[b]   =  halfW - s; vel[b]   = -Math.abs(vel[b])   * wallBounce; }
        if (pos[b+1] - s < -halfH) { pos[b+1] = -halfH + s; vel[b+1] =  Math.abs(vel[b+1]) * wallBounce; }
        if (pos[b+1] + s >  halfH) { pos[b+1] =  halfH - s; vel[b+1] = -Math.abs(vel[b+1]) * wallBounce; }
      }

      // ball–ball collision
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const ai = i*3, aj = j*3;
          const dx = pos[aj] - pos[ai], dy = pos[aj+1] - pos[ai+1];
          const d2 = dx*dx + dy*dy, minD = sizes[i] + sizes[j];
          if (d2 < minD*minD && d2 > 1e-6) {
            const d = Math.sqrt(d2), nx = dx/d, ny = dy/d;
            const ov = (minD - d) * 0.5;
            pos[ai]   -= nx*ov; pos[ai+1] -= ny*ov;
            pos[aj]   += nx*ov; pos[aj+1] += ny*ov;
            const rvx = vel[aj]-vel[ai], rvy = vel[aj+1]-vel[ai+1];
            const dot = rvx*nx + rvy*ny;
            if (dot < 0) {
              const imp = dot * 0.85;
              vel[ai]   += imp*nx; vel[ai+1] += imp*ny;
              vel[aj]   -= imp*nx; vel[aj+1] -= imp*ny;
            }
          }
        }
      }

      // update instanced mesh
      for (let i = 0; i < count; i++) {
        dummy.position.set(pos[i*3], pos[i*3+1], 0);
        dummy.scale.setScalar(sizes[i]);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      pointLight.position.set(pos[0], pos[1], 5);

      renderer.render(scene, camera);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('touchmove', onTouch);
      geometry.dispose();
      material.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
};

export default Ballpit;
