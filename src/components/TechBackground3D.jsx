import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function TechBackground3D() {
  const mountRef = useRef(null);
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // List of required technologies
  const techNames = [
    { name: "React", size: "lg", color: "border-brand-cyan/20 text-brand-cyan/50" },
    { name: "Java", size: "md", color: "border-orange-500/20 text-orange-400/50" },
    { name: "HTML", size: "sm", color: "border-red-500/20 text-red-400/50" },
    { name: "CSS", size: "sm", color: "border-blue-500/20 text-blue-400/50" },
    { name: "JavaScript", size: "lg", color: "border-yellow-500/20 text-yellow-400/50" },
    { name: "Node.js", size: "md", color: "border-green-500/20 text-green-400/50" },
    { name: "Express.js", size: "sm", color: "border-gray-500/20 text-gray-400/50" },
    { name: "SQL", size: "md", color: "border-cyan-500/20 text-cyan-400/50" },
    { name: "MongoDB", size: "md", color: "border-emerald-500/20 text-emerald-400/50" },
    { name: "Firebase", size: "sm", color: "border-amber-500/20 text-amber-400/50" },
    { name: "Tailwind CSS", size: "md", color: "border-teal-500/20 text-teal-400/50" },
    { name: "Git", size: "sm", color: "border-orange-600/20 text-orange-500/50" },
    { name: "GitHub", size: "sm", color: "border-purple-500/20 text-purple-400/50" },
    { name: "REST API", size: "md", color: "border-brand-blue/20 text-brand-blue/50" },
    { name: "UI/UX", size: "lg", color: "border-brand-purple/20 text-brand-purple/50" },
    { name: "Responsive", size: "md", color: "border-pink-500/20 text-pink-400/50" },
    { name: "SEO", size: "sm", color: "border-green-400/20 text-green-400/50" },
    { name: "App Dev", size: "lg", color: "border-indigo-500/20 text-indigo-400/50" },
    { name: "Web Dev", size: "lg", color: "border-brand-cyan/20 text-brand-cyan/50" },
    { name: "Cloud", size: "md", color: "border-sky-500/20 text-sky-400/50" }
  ];

  // Set initial 3D positions spread out in a volume
  // Z goes from -12 (far) to +2 (near) to float behind the foreground text
  const initialItems = techNames.map((t, idx) => {
    // Distribute them in segments to avoid clumps
    const angle = (idx / techNames.length) * Math.PI * 2;
    const radiusX = 6 + Math.random() * 4;
    const radiusY = 4 + Math.random() * 2;
    
    return {
      ...t,
      x: Math.cos(angle) * radiusX,
      y: Math.sin(angle) * radiusY + (Math.random() - 0.5) * 2,
      z: -12 + Math.random() * 14,
      baseX: Math.cos(angle) * radiusX,
      baseY: Math.sin(angle) * radiusY,
      speed: 0.15 + Math.random() * 0.15,
      offset: Math.random() * Math.PI * 2,
    };
  });

  useEffect(() => {
    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (!canvasRef.current || !mountRef.current) return;

    let width = mountRef.current.clientWidth;
    let height = mountRef.current.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // Glowing wireframe grid at the bottom of the scene
    const gridGeometry = new THREE.PlaneGeometry(60, 60, 25, 25);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e1b4b,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 2.2;
    grid.position.y = -6;
    grid.position.z = -5;
    scene.add(grid);

    // Floating particles constellation
    const particlesCount = window.innerWidth < 768 ? 40 : 120;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 24;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = -15 + Math.random() * 15;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse positions for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event) => {
      // Normalize mouse coordinates (-0.5 to 0.5)
      targetMouseX = (event.clientX / window.innerWidth) - 0.5;
      targetMouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !canvasRef.current) return;
      width = mountRef.current.clientWidth;
      height = mountRef.current.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation variables
    const clock = new THREE.Clock();
    let animationFrameId;

    // Direct DOM references for extreme high-performance rendering (60fps)
    const domElements = initialItems.map((_, idx) =>
      document.getElementById(`tech3d-tag-${idx}`)
    );

    // Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping for parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Adjust camera slightly based on mouse
      camera.position.x = mouseX * 2.5;
      camera.position.y = -mouseY * 2.5;
      camera.lookAt(0, 0, -5);

      // Rotate grid slowly
      grid.rotation.z = elapsedTime * 0.015;

      // Shift particles slightly
      const positionsArr = particlesGeometry.attributes.position.array;
      for (let i = 1; i < positionsArr.length; i += 3) {
        // Slow rising motion
        positionsArr[i] += 0.004;
        if (positionsArr[i] > 8) {
          positionsArr[i] = -8;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Update and project 3D tech tags
      initialItems.forEach((item, idx) => {
        const domEl = domElements[idx] || document.getElementById(`tech3d-tag-${idx}`);
        if (!domEl) return;

        // Skip rendering more than 8 elements on mobile for performance
        if (window.innerWidth < 768 && idx > 7) {
          domEl.style.display = "none";
          return;
        }

        // Apply slow organic floating sine waves
        const floatY = item.baseY + Math.sin(elapsedTime * item.speed + item.offset) * 0.35;
        const floatX = item.baseX + Math.cos(elapsedTime * item.speed * 0.4 + item.offset) * 0.35;
        
        // Parallax shift based on mouse position
        const worldX = floatX - mouseX * (item.z * 0.15);
        const worldY = floatY + mouseY * (item.z * 0.15);

        // Project 3D coordinate to 2D screen NDC space
        const tempV = new THREE.Vector3(worldX, worldY, item.z);
        tempV.project(camera);

        // Check if behind camera clipping plane
        if (tempV.z > 1) {
          domEl.style.display = "none";
          return;
        }

        // Map NDC (-1 to 1) to screen pixel coordinate space (0 to width/height)
        const screenX = (tempV.x * 0.5 + 0.5) * width;
        const screenY = (-(tempV.y * 0.5) + 0.5) * height;

        // Calculate size depth (z is -12 to 2)
        const minZ = -12;
        const maxZ = 2;
        const depth = (item.z - minZ) / (maxZ - minZ); // 0 to 1

        const s = 0.55 + depth * 0.45; // scale between 0.55 and 1.0
        const op = 0.08 + depth * 0.22; // opacity between 0.08 and 0.30 (subtle background feel)

        // Apply CSS translation matrix
        domEl.style.display = "block";
        domEl.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%) scale(${s})`;
        domEl.style.opacity = op;
        domEl.style.zIndex = Math.round((1 - tempV.z) * 1000);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", checkMobile);

      // Clean WebGL memory
      gridGeometry.dispose();
      gridMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#030303] select-none pointer-events-none"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(7,7,21,0.8)_0%,rgba(3,3,3,1)_100%)]" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block absolute inset-0 z-0" />

      {/* Interactive 3D CSS Tags (positioned absolutely, styles applied via Three.js loop) */}
      <div className="absolute inset-0 w-full h-full z-10 overflow-hidden">
        {initialItems.map((item, idx) => (
          <div
            key={idx}
            id={`tech3d-tag-${idx}`}
            className={`absolute top-0 left-0 hidden px-3.5 py-1.5 rounded-full border glass-card text-xs font-mono font-black tracking-wider uppercase whitespace-nowrap transition-colors duration-300 pointer-events-auto cursor-default hover:border-brand-cyan hover:text-brand-cyan hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] select-none ${item.color}`}
            style={{
              willChange: "transform, opacity",
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
