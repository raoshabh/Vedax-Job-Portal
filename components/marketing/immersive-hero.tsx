"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "@/components/logo";
import { referrerShare } from "@/lib/data";
import { inr } from "@/lib/utils";

const PAYOUT = referrerShare(125000); // ₹1,00,000 — the Stackline bounty

const CHAPTERS = [
  { id: "ch-hero", label: "Intro" },
  { id: "ch-problem", label: "The waste" },
  { id: "ch-journey", label: "The journey" },
  { id: "ch-payoff", label: "The payoff" },
  { id: "ch-cta", label: "Your move" },
];

export function ImmersiveHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const rupeeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const story = storyRef.current;
    if (!stage || !story) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ---------- scene ----------
    const glowTexture = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const x = c.getContext("2d")!;
      const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.25, "rgba(255,255,255,.85)");
      g.addColorStop(0.5, "rgba(255,255,255,.25)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    };
    const sprite = glowTexture();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#06060d");
    scene.fog = new THREE.FogExp2(new THREE.Color("#06060d"), 0.0016);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000,
    );
    camera.position.set(0, 0, 330);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    stage.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const COL = {
      indigo: new THREE.Color("#6366f1"),
      violet: new THREE.Color("#8b5cf6"),
      sky: new THREE.Color("#38bdf8"),
      emerald: new THREE.Color("#22c55e"),
      gold: new THREE.Color("#f59e0b"),
    };

    // nodes — the people in the network
    const N = 190;
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      const th = 2 * Math.PI * Math.random();
      const ph = Math.acos(2 * Math.random() - 1);
      const r = 240 * (0.45 + 0.55 * Math.random());
      nodes.push(
        new THREE.Vector3(
          r * Math.sin(ph) * Math.cos(th),
          r * Math.sin(ph) * Math.sin(th) * 0.7,
          r * Math.cos(ph),
        ),
      );
    }
    const npos = new Float32Array(N * 3);
    const ncol = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      npos.set([nodes[i].x, nodes[i].y, nodes[i].z], i * 3);
      const base =
        Math.random() < 0.5
          ? COL.indigo
          : Math.random() < 0.5
            ? COL.violet
            : COL.sky;
      ncol.set([base.r, base.g, base.b], i * 3);
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(npos, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(ncol, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 7,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      opacity: 0.95,
    });
    group.add(new THREE.Points(nodeGeo, nodeMat));

    // edges — each node linked to its 2 nearest neighbours
    const edges: [number, number][] = [];
    const lpos: number[] = [];
    const lcol: number[] = [];
    for (let i = 0; i < N; i++) {
      const d: [number, number][] = [];
      for (let j = 0; j < N; j++)
        if (j !== i) d.push([nodes[i].distanceTo(nodes[j]), j]);
      d.sort((a, b) => a[0] - b[0]);
      for (let k = 0; k < 2; k++) {
        const j = d[k][1];
        edges.push([i, j]);
        lpos.push(...nodes[i].toArray(), ...nodes[j].toArray());
        for (let t = 0; t < 2; t++)
          lcol.push(COL.indigo.r * 0.5, COL.indigo.g * 0.5, COL.violet.b * 0.6);
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(lpos), 3),
    );
    lineGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(lcol), 3),
    );
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    // dust — depth field
    const D = 1500;
    const dpos = new Float32Array(D * 3);
    for (let i = 0; i < D; i++)
      dpos.set(
        [
          (Math.random() - 0.5) * 1400,
          (Math.random() - 0.5) * 900,
          (Math.random() - 0.5) * 1400,
        ],
        i * 3,
      );
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dpos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 2,
      map: sprite,
      color: 0x9fb0ff,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // pulses — referrals travelling the graph
    const P = 18;
    type Pulse = { e: [number, number]; t: number; sp: number };
    const seed = (p: Pulse) => {
      p.e = edges[(Math.random() * edges.length) | 0];
      p.t = Math.random();
      p.sp = 0.0016 + Math.random() * 0.0026;
    };
    const pulses: Pulse[] = Array.from({ length: P }, () => {
      const p = { e: edges[0], t: 0, sp: 0 };
      seed(p);
      return p;
    });
    const ppos = new Float32Array(P * 3);
    const pcol = new Float32Array(P * 3);
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(ppos, 3));
    pulseGeo.setAttribute("color", new THREE.BufferAttribute(pcol, 3));
    const pulseMat = new THREE.PointsMaterial({
      size: 15,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
    group.add(pulsePoints);

    // ---------- scroll state ----------
    const tmpV = new THREE.Vector3();
    const tmpC = new THREE.Color();
    let prog = 0;
    let target = 0;
    let raf = 0;

    const storyRange = () =>
      Math.max(1, story.offsetHeight - window.innerHeight);
    const onScroll = () => {
      target = Math.min(1, Math.max(0, window.scrollY / storyRange()));
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      onScroll();
      if (!reduced) ScrollTrigger.refresh();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const stops = [
      new THREE.Color("#06060d"),
      new THREE.Color("#080a18"),
      new THREE.Color("#0a0820"),
      new THREE.Color("#04140d"),
      new THREE.Color("#070612"),
    ];

    const clock = new THREE.Clock();
    let time = 0;
    let lastDot = -1;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const dt = reduced ? 0 : clock.getDelta();
      time += dt;
      prog += (target - prog) * 0.08;
      if (Math.abs(target - prog) < 0.0005) prog = target;

      // fade the stage out once the story has fully played
      const past = window.scrollY - (story.offsetHeight - window.innerHeight);
      const fade = Math.min(1, Math.max(0, 1 - past / (window.innerHeight * 0.6)));
      stage.style.opacity = String(fade);
      if (fade <= 0.01) return; // parked below the story — skip GPU work

      const ease = prog * prog * (3 - 2 * prog);
      camera.position.z = 330 - ease * 250;
      camera.position.x =
        Math.sin(time * 0.15) * 8 + Math.sin(prog * Math.PI) * 22;
      camera.position.y = Math.cos(time * 0.12) * 6 - prog * 14;
      camera.lookAt(0, 0, 0);

      group.rotation.y = time * 0.04 + prog * Math.PI * 0.65;
      group.rotation.x = Math.sin(prog * Math.PI) * 0.18;
      dust.rotation.y = -time * 0.01;

      const f = prog * (stops.length - 1);
      const i0 = Math.floor(f);
      const i1 = Math.min(stops.length - 1, i0 + 1);
      tmpC.copy(stops[i0]).lerp(stops[i1], f - i0);
      (scene.background as THREE.Color).copy(tmpC);
      scene.fog!.color.copy(tmpC);

      const warm = Math.min(1, Math.max(0, (prog - 0.55) / 0.35));
      for (let i = 0; i < P; i++) {
        const p = pulses[i];
        p.t += reduced ? 0 : p.sp;
        if (p.t > 1) {
          seed(p);
          p.t = 0;
        }
        tmpV.copy(nodes[p.e[0]]).lerp(nodes[p.e[1]], p.t);
        ppos.set([tmpV.x, tmpV.y, tmpV.z], i * 3);
        tmpC.copy(COL.indigo).lerp(COL.emerald, p.t).lerp(COL.gold, warm * 0.6);
        pcol.set([tmpC.r, tmpC.g, tmpC.b], i * 3);
      }
      pulseGeo.attributes.position.needsUpdate = true;
      pulseGeo.attributes.color.needsUpdate = true;
      pulseMat.size = 12 + warm * 10;
      nodeMat.size = 6 + ease * 4 + (reduced ? 0 : Math.sin(time * 1.5) * 0.4);

      // chrome
      if (barRef.current) barRef.current.style.width = `${prog * 100}%`;
      if (hintRef.current)
        hintRef.current.style.opacity = prog > 0.04 ? "0" : "0.9";
      const dot = Math.min(CHAPTERS.length - 1, Math.round(prog * 4));
      if (dot !== lastDot && dotsRef.current) {
        lastDot = dot;
        Array.from(dotsRef.current.children).forEach((el, i) =>
          (el as HTMLElement).classList.toggle("is-on", i === dot),
        );
      }

      renderer.render(scene, camera);
    };
    onScroll();
    frame();

    // ---------- gsap reveals + payout counter ----------
    // scrub: 0.5 keeps the text choreography slightly damped, in step with
    // the eased camera, so the two scroll systems don't visibly desync.
    const tweens: gsap.core.Tween[] = [];
    let triggers: ScrollTrigger[] = [];
    if (!reduced) {
      gsap.registerPlugin(ScrollTrigger);
      story.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        tweens.push(
          gsap.fromTo(
            el,
            { opacity: 0, y: 46 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("section"),
                start: "top 78%",
                end: "top 38%",
                scrub: 0.5,
              },
            },
          ),
        );
      });
      const rupee = { v: 0 };
      tweens.push(
        gsap.to(rupee, {
          v: PAYOUT,
          ease: "none",
          scrollTrigger: {
            trigger: "#ch-payoff",
            start: "top 75%",
            end: "center center",
            scrub: 0.5,
            onUpdate: () => {
              if (rupeeRef.current)
                rupeeRef.current.textContent = inr(Math.round(rupee.v));
            },
          },
        }),
      );
      triggers = tweens
        .map((t) => t.scrollTrigger)
        .filter(Boolean) as ScrollTrigger[];
      // re-measure once webfonts settle — trigger positions and story height
      // shift when Space Grotesk swaps in over the fallback metrics
      document.fonts?.ready
        .then(() => {
          onScroll();
          ScrollTrigger.refresh();
        })
        .catch(() => {});
    } else if (rupeeRef.current) {
      rupeeRef.current.textContent = inr(PAYOUT);
    }

    // ---------- cleanup ----------
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      triggers.forEach((t) => t.kill());
      tweens.forEach((t) => t.kill());
      [nodeGeo, lineGeo, dustGeo, pulseGeo].forEach((g) => g.dispose());
      [nodeMat, lineMat, dustMat, pulseMat].forEach((m) => m.dispose());
      sprite.dispose();
      renderer.dispose();
      stage.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="bg-[#06060d] text-slate-50">
      {/* fixed 3D stage + cinematic grade */}
      <div ref={stageRef} className="fixed inset-0 z-0" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 35%, transparent 40%, rgba(3,3,10,.55) 100%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-50"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,6,13,.6) 0%, transparent 18%, transparent 80%, rgba(6,6,13,.7) 100%)",
        }}
      />

      {/* progress bar */}
      <div
        ref={barRef}
        className="fixed left-0 top-0 z-40 h-0.5 w-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400"
      />

      {/* nav */}
      <nav className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-10 [&_span]:text-slate-50">
        <Logo />
        <Link
          href="/signup"
          className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 font-display text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
        >
          Start referring
        </Link>
      </nav>

      {/* chapter dots — also keyboard/screen-reader navigation */}
      <nav
        ref={dotsRef}
        aria-label="Chapters"
        className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-1.5 sm:flex [&_a.is-on_span]:scale-135 [&_a.is-on_span]:bg-white"
      >
        {CHAPTERS.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-label={c.label}
            className="group rounded-full p-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            <span className="block h-2 w-2 rounded-full bg-white/25 transition group-hover:bg-white/60" />
          </a>
        ))}
      </nav>

      {/* ---- the story ---- */}
      <div ref={storyRef} className="relative z-10">
        {/* 0 · hero */}
        <section
          id="ch-hero"
          className="flex min-h-screen items-center justify-center px-5 text-center"
        >
          <div data-reveal className="max-w-3xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
              The referral marketplace
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
              Your network is
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                worth moving
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Every intro you already make — now alive, tracked, and paid.
              Scroll to watch a referral travel from a warm hello to a hire.
            </p>
            <div className="mt-11 flex flex-wrap justify-center gap-10">
              {[
                ["₹4.2 Cr", "paid to referrers"],
                ["1,800+", "successful hires"],
                ["21 days", "median to offer"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-bold">{v}</p>
                  <p className="text-sm text-slate-400">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 1 · problem */}
        <section id="ch-problem" className="flex min-h-screen items-center px-5 sm:px-[7vw]">
          <div data-reveal className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Chapter 01 — the waste
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              You refer great people
              <br />
              for free.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              You vouch for a friend, they get hired, and your reward is… a
              thank-you message. Thousands of connections fire across the
              network every day, and almost none of them pay the person who
              made them.
            </p>
          </div>
        </section>

        {/* 2 · journey */}
        <section id="ch-journey" className="flex min-h-screen items-center px-5 sm:px-[7vw]">
          <div data-reveal className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-violet-400">
              Chapter 02 — the journey
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Watch the referral
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                travel the pipeline.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Submit a name and a reason you trust them. Refora carries it
              through screening, interviews, and the offer — and you see every
              stage move in real time, like a signal lighting up the graph.
            </p>
            <div className="mt-8 inline-block rounded-2xl border border-white/10 bg-[#121422]/60 p-7 shadow-2xl backdrop-blur-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-display text-xs font-semibold text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#22c55e]" />
                Priya Sharma · Staff Frontend Engineer
              </span>
              <div className="mt-3.5 flex gap-2">
                {[1, 1, 1, 0].map((on, i) => (
                  <i
                    key={i}
                    className={`h-1 flex-1 rounded-full ${on ? "bg-violet-500" : "bg-white/15"}`}
                  />
                ))}
              </div>
              <p className="mt-2.5 text-xs text-slate-500">
                Interviewing · stage 3 of 4
              </p>
            </div>
          </div>
        </section>

        {/* 3 · payoff */}
        <section
          id="ch-payoff"
          className="flex min-h-screen items-center justify-center px-5 text-center"
        >
          <div data-reveal className="max-w-3xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
              Chapter 03 — the payoff
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              She joins. The node ignites.
            </h2>
            <p className="mt-3 bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text font-display text-7xl font-bold tracking-tight text-transparent sm:text-9xl">
              <span ref={rupeeRef}>₹0</span>
            </p>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Your 80% of the bounty, released the moment your candidate is
              hired — half on joining, half after 90 days. Straight to UPI.
            </p>
          </div>
        </section>

        {/* 4 · cta */}
        <section
          id="ch-cta"
          className="flex min-h-screen items-center justify-center px-5 text-center"
        >
          <div data-reveal className="max-w-3xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Your move
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              The next intro you make
              <br />
              could{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                pay your rent.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Free forever for referrers. Join 40,000+ people earning from the
              network they already have.
            </p>
            <Link
              href="/signup"
              className="mt-9 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-9 py-4 font-display text-lg font-semibold text-white shadow-[0_18px_50px_rgba(99,102,241,.55)] transition hover:-translate-y-0.5"
            >
              Create your free account →
            </Link>
          </div>
        </section>
      </div>

      {/* scroll hint */}
      <div
        ref={hintRef}
        className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-white/80 transition-opacity duration-500"
        aria-hidden="true"
      >
        <span className="relative h-8 w-5 rounded-xl border border-white/40">
          <span className="absolute left-1/2 top-1.5 h-1.5 w-0.5 -translate-x-1/2 animate-bounce rounded bg-white motion-reduce:animate-none" />
        </span>
        scroll
      </div>
    </div>
  );
}
