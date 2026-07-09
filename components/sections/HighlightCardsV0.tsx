"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* v0 highlights: three tall Stripe-anatomy cards. Visuals ported from
   Knoetic-CPOHQ-Landing-Page (sphere + orbit hero, main.js) and recolored
   to brand blue. Everything idles near-still and reacts on hover. */

const BRAND = 0x336cf0;

/* Portrait pool lifted from the source project (CORS-enabled Unsplash IDs) */
const PORTRAIT_IDS = [
  "photo-1573496359142-b8d87734a5a2", "photo-1580489944761-15a19d654956",
  "photo-1560250097-0b93528c311a", "photo-1494790108377-be9c29b29330",
  "photo-1438761681033-6461ffad8d80", "photo-1507003211169-0a1dd7228f2d",
  "photo-1544005313-94ddf0286df2", "photo-1500648767791-00dcc994a43e",
  "photo-1517841905240-472988babdf9", "photo-1506794778202-cad84cf45f1d",
  "photo-1534528741775-53994a69daeb", "photo-1519085360753-af0119f7cbe7",
  "photo-1487412720507-e7ab37603c6f", "photo-1568602471122-7832951cc4c5",
  "photo-1573497019940-1c28c88b4f3e", "photo-1556157382-97eda2d62296",
  "photo-1502685104226-ee32379fefbe", "photo-1521119989659-a83eee488004",
  "photo-1492562080023-ab3db95bfbce", "photo-1463453091185-61582044d556",
  "photo-1488426862026-3ee34a7d66df", "photo-1547425260-76bcadfb4f2c",
  "photo-1557862921-37829c790f19", "photo-1558203728-00f45181dd84",
  "photo-1564564321837-a57b7070ac4f", "photo-1573140247632-f8fd74997d5c",
  "photo-1599566150163-29194dcaad36", "photo-1607746882042-944635dfe10e",
  "photo-1545167622-3a6ac756afa4", "photo-1546961329-78bef0414d7c",
  "photo-1531123897727-8f129e1688ce", "photo-1519345182560-3f2917c472ef",
  "photo-1500917293891-ef795e70e1f6", "photo-1542909168-82c3e7fdca5c",
  "photo-1504257432389-52343af06ae3", "photo-1487412947147-5cebf100ffc2",
  "photo-1489980557514-251d61e3eeb6", "photo-1521146764736-56c929d59c83",
  "photo-1524504388940-b1c1722653e1", "photo-1531427186611-ecfd6d936c79",
  "photo-1535713875002-d1d0cf377fde", "photo-1539571696357-5a69c17a67c6",
  "photo-1548142813-c348350df52b", "photo-1552058544-f2b08422138a",
  "photo-1551836022-d5d88e9218df", "photo-1542596594-649edbc13630",
  "photo-1551024601-bec78aea704b", "photo-1506919258185-6078bba55d2a",
  "photo-1508214751196-bcfd4ca60f91", "photo-1499952127939-9bbf5af6c51c",
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/* ---------- shared card shell ---------- */

function Card({
  href,
  title,
  line,
  children,
  onHover,
}: {
  href: string;
  title: string;
  line: string;
  children: React.ReactNode;
  onHover?: (h: boolean) => void;
}) {
  return (
    <a
      href={href}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className="group relative flex flex-col overflow-hidden rounded-brand border border-line bg-white min-h-[540px] transition hover:shadow-xl focus-visible:outline-2 focus-visible:outline-accent"
    >
      <div className="relative z-10 flex items-start justify-between gap-4 p-7 pb-0">
        <div>
          <h3 className="text-2xl font-medium tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-muted max-w-[26ch]">{line}</p>
        </div>
        <span
          className="shrink-0 flex size-9 items-center justify-center rounded-[10px] bg-soft text-accent transition group-hover:bg-accent group-hover:text-accent-ink"
          aria-hidden
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M8 1h4v4M12 1L7 6M5 12H1V8M1 12l5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="relative flex-1">{children}</div>
    </a>
  );
}

/* ---------- card 1: portrait sphere (ported sphere mode) ---------- */

function roundRectPath(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function coverDraw(c: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const ir = img.width / img.height, dr = w / h;
  let sw, sh, sx, sy;
  if (ir > dr) { sh = img.height; sw = sh * dr; sx = (img.width - sw) / 2; sy = 0; }
  else { sw = img.width; sh = sw / dr; sx = 0; sy = (img.height - sh) * 0.28; }
  c.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
}

const HUES = [212, 222, 234, 246, 258, 200];

function paintTile(img: HTMLImageElement | null, i: number) {
  const S = 168, r = 26;
  const cv = document.createElement("canvas");
  cv.width = S; cv.height = S;
  const c = cv.getContext("2d")!;
  c.save();
  roundRectPath(c, 0, 0, S, S, r);
  c.clip();
  if (img) {
    coverDraw(c, img, S, S);
  } else {
    const h = HUES[i % HUES.length];
    const g = c.createLinearGradient(0, 0, S, S);
    g.addColorStop(0, `hsl(${h} 58% 66%)`);
    g.addColorStop(1, `hsl(${h + 16} 54% 48%)`);
    c.fillStyle = g;
    c.fillRect(0, 0, S, S);
  }
  const grad = c.createLinearGradient(0, S * 0.5, 0, S);
  grad.addColorStop(0, "rgba(7,14,30,0)");
  grad.addColorStop(1, "rgba(7,14,30,.22)");
  c.fillStyle = grad;
  c.fillRect(0, 0, S, S);
  c.restore();
  roundRectPath(c, 1, 1, S - 2, S - 2, r);
  c.lineWidth = 2;
  c.strokeStyle = "rgba(255,255,255,.6)";
  c.stroke();
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function PortraitSphere({ hoverRef }: { hoverRef: React.MutableRefObject<boolean> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const N = 56, R = 2.55;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geo = new THREE.PlaneGeometry(0.62, 0.62);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const tiles: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; base: THREE.Vector3; sv: number }[] = [];

    for (let i = 0; i < N; i++) {
      const yy = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - yy * yy));
      const th = golden * i;
      const base = new THREE.Vector3(Math.cos(th) * rad, yy, Math.sin(th) * rad);
      const mat = new THREE.MeshBasicMaterial({ map: paintTile(null, i), transparent: true, depthWrite: false });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      tiles.push({ mesh, mat, base, sv: 0.72 + Math.random() * 0.5 });

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const old = mat.map;
        mat.map = paintTile(img, i);
        mat.needsUpdate = true;
        if (old) old.dispose();
      };
      img.src = `https://images.unsplash.com/${PORTRAIT_IDS[i % PORTRAIT_IDS.length]}?w=168&h=168&fit=crop&crop=faces&q=72`;
    }

    let vis = true, spin = 0, speed = 0, raf = 0;
    let last = performance.now();
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    function resize() {
      const w = canvas!.clientWidth, h = canvas!.clientHeight;
      if (canvas!.width !== w || canvas!.height !== h) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
        const need = 3.4;
        camera.position.z = Math.max(need / tan, need / (tan * camera.aspect));
        camera.updateProjectionMatrix();
      }
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!vis) return;
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      resize();
      // extremely slow idle; eases up when the card is hovered
      const target = reduced ? 0 : hoverRef.current ? 0.34 : 0.045;
      speed += (target - speed) * 0.045;
      spin += speed * dt;
      const cs = Math.cos(spin), sn = Math.sin(spin);
      for (const t of tiles) {
        const bx = t.base.x * R, by = t.base.y * R, bz = t.base.z * R;
        t.mesh.position.set(bx * cs + bz * sn, by, -bx * sn + bz * cs);
        t.mesh.quaternion.copy(camera.quaternion);
        t.mesh.scale.setScalar(t.sv);
        // back-of-sphere tiles recede
        t.mat.opacity = 0.35 + 0.65 * ((t.mesh.position.z / R + 1) / 2);
      }
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      tiles.forEach((t) => { t.mat.map?.dispose(); t.mat.dispose(); });
      geo.dispose();
      renderer.dispose();
    };
  }, [reduced, hoverRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}

/* ---------- card 3: orbiting AI orbs (ported orbit mode) ---------- */

function orbTexture(core: string, glow: string) {
  const S = 128;
  const cv = document.createElement("canvas");
  cv.width = cv.height = S;
  const c = cv.getContext("2d")!;
  let g = c.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, glow);
  g.addColorStop(1, "rgba(51,108,240,0)");
  c.fillStyle = g;
  c.fillRect(0, 0, S, S);
  g = c.createRadialGradient(S * 0.44, S * 0.42, S * 0.02, S / 2, S / 2, S * 0.24);
  g.addColorStop(0, "#eaf2ff");
  g.addColorStop(0.35, core);
  g.addColorStop(1, "#1f3fae");
  c.fillStyle = g;
  c.beginPath();
  c.arc(S / 2, S / 2, S * 0.24, 0, Math.PI * 2);
  c.fill();
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function OrbitOrbs({ hoverRef }: { hoverRef: React.MutableRefObject<boolean> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const rings = [
      { r: 1.0, count: 2, speed: 0.16, dir: 1 },
      { r: 1.7, count: 4, speed: 0.115, dir: -1 },
      { r: 2.4, count: 5, speed: 0.085, dir: 1 },
      { r: 3.1, count: 7, speed: 0.06, dir: -1 },
    ];

    // dotted ring guides (lifted from the source's orbit mode)
    const dotSprite = (() => {
      const cc = document.createElement("canvas");
      cc.width = cc.height = 64;
      const x = cc.getContext("2d")!;
      x.fillStyle = "#fff";
      x.beginPath();
      x.arc(32, 32, 29, 0, Math.PI * 2);
      x.fill();
      const t = new THREE.CanvasTexture(cc);
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      return t;
    })();

    const disposables: { dispose(): void }[] = [dotSprite];

    rings.forEach((rg) => {
      const cnt = Math.max(70, Math.round((2 * Math.PI * rg.r) / 0.14));
      const pos: number[] = [];
      for (let s = 0; s < cnt; s++) {
        const a = (s / cnt) * Math.PI * 2;
        pos.push(Math.cos(a) * rg.r, Math.sin(a) * rg.r, 0);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      const m = new THREE.PointsMaterial({ color: 0x8fa3c4, map: dotSprite, size: 0.03, transparent: true, opacity: 0.55, depthWrite: false, sizeAttenuation: true });
      scene.add(new THREE.Points(g, m));
      disposables.push(g, m);
    });

    // orbs
    const orbTex = orbTexture("#336cf0", "rgba(51,108,240,0.34)");
    disposables.push(orbTex);
    const geo = new THREE.PlaneGeometry(1, 1);
    disposables.push(geo);
    const orbs: { mesh: THREE.Mesh; rg: (typeof rings)[number]; a0: number; s: number; ph: number }[] = [];
    rings.forEach((rg, ri) => {
      for (let k = 0; k < rg.count; k++) {
        const mat = new THREE.MeshBasicMaterial({ map: orbTex, transparent: true, depthWrite: false });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);
        disposables.push(mat);
        orbs.push({ mesh, rg, a0: (k / rg.count) * Math.PI * 2 + ri * 0.7, s: 0.5 + Math.random() * 0.5, ph: Math.random() * Math.PI * 2 });
      }
    });

    // still center orb anchoring the system
    const centerMat = new THREE.MeshBasicMaterial({ map: orbTex, transparent: true, depthWrite: false });
    const center = new THREE.Mesh(geo, centerMat);
    center.scale.setScalar(1.15);
    scene.add(center);
    disposables.push(centerMat);

    let vis = true, t = 0, speed = 0, raf = 0;
    let last = performance.now();
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    function resize() {
      const w = canvas!.clientWidth, h = canvas!.clientHeight;
      if (canvas!.width !== w || canvas!.height !== h) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
        const need = 3.5;
        camera.position.z = Math.max(need / tan, need / (tan * camera.aspect));
        camera.updateProjectionMatrix();
      }
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!vis) return;
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      resize();
      const target = reduced ? 0 : hoverRef.current ? 5.2 : 1;
      speed += (target - speed) * 0.05;
      t += dt * speed;
      for (const o of orbs) {
        const a = o.a0 + o.rg.dir * t * o.rg.speed;
        o.mesh.position.set(Math.cos(a) * o.rg.r, Math.sin(a) * o.rg.r, 0.01);
        o.mesh.quaternion.copy(camera.quaternion);
        const pulse = 1 + Math.sin(t * 0.8 + o.ph) * 0.06;
        o.mesh.scale.setScalar(o.s * pulse);
      }
      center.scale.setScalar(1.15 + Math.sin(t * 0.5) * 0.05);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [reduced, hoverRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}

/* ---------- card 2: the chief-of-staff orb (CSS) ---------- */

function GlowOrb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <div className="cos-orb">
        <span className="cos-orb-sheen" />
        <span className="cos-orb-ring" />
      </div>
    </div>
  );
}

/* ---------- section ---------- */

const CARDS = [
  {
    id: "community",
    title: "Community",
    line: "Confidential conversations with the top 1% of people leaders.",
  },
  {
    id: "chief-of-staff",
    title: "AI Chief of Staff",
    line: "An AI chief of staff that already knows your world.",
  },
  {
    id: "agents",
    title: "Team of AI agents",
    line: "A team of AI agents for your entire people org.",
  },
];

export default function HighlightCardsV0() {
  const sphereHover = useRef(false);
  const orbitHover = useRef(false);

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24">
      <div className="grid gap-5 md:grid-cols-3">
        <Card
          href={`#${CARDS[0].id}`}
          title={CARDS[0].title}
          line={CARDS[0].line}
          onHover={(h) => { sphereHover.current = h; }}
        >
          <PortraitSphere hoverRef={sphereHover} />
        </Card>

        <Card href={`#${CARDS[1].id}`} title={CARDS[1].title} line={CARDS[1].line}>
          <GlowOrb />
        </Card>

        <Card
          href={`#${CARDS[2].id}`}
          title={CARDS[2].title}
          line={CARDS[2].line}
          onHover={(h) => { orbitHover.current = h; }}
        >
          <OrbitOrbs hoverRef={orbitHover} />
        </Card>
      </div>
    </section>
  );
}
