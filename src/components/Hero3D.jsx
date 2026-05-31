import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Get container dimensions
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f5ff, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const purpleLight = new THREE.PointLight(0xb800ff, 1.5, 50);
    purpleLight.position.set(-5, -5, 5);
    scene.add(purpleLight);

    // Geometry - Torus Knot (Futuristic abstract shape)
    const geometry = new THREE.TorusKnotGeometry(0.85, 0.28, 120, 16);
    
    // Material - Glowing wireframe
    const material = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });

    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Surrounding Particle Field
    const particlesCount = 80;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position particles in a sphere shell around the torus
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + Math.random() * 0.8; // Radius between 2.0 and 2.8

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Particle Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xb800ff,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Mouse Interaction States
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      // Normalize mouse coordinates (-0.5 to 0.5)
      const rect = renderer.domElement.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) - 0.5;
      mouseY = ((event.clientY - rect.top) / rect.height) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight || 450;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Base auto rotation + mouse interaction tilt
      torusKnot.rotation.x = elapsedTime * 0.2 + targetY * 1.5;
      torusKnot.rotation.y = elapsedTime * 0.35 + targetX * 1.5;

      // Pulse color slightly
      const wave = Math.sin(elapsedTime * 2) * 0.5 + 0.5;
      material.color.setHSL(0.5 + wave * 0.1, 1, 0.5);

      // Rotate particle field in reverse
      particleSystem.rotation.y = -elapsedTime * 0.1;
      particleSystem.rotation.x = -elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Dispose resources
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[350px] md:min-h-[450px] relative flex items-center justify-center pointer-events-auto"
    >
      <canvas ref={canvasRef} className="w-full h-full block absolute z-10" />
      {/* Visual background glow anchor */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-brand-cyan/20 blur-[60px] pointer-none z-0" />
    </div>
  );
}
