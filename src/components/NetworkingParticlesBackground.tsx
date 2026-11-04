'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulsePhase: number;
  isHub: boolean;
}

/**
 * Subtle, low-opacity interactive L&D / professional networking constellation canvas.
 * Connects nodes with delicate filaments and responds gently to mouse movement & clicks.
 */
export function NetworkingParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathname = usePathname();

  // Hide on standalone admin console
  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      rippleX: -9999,
      rippleY: -9999,
      rippleRadius: 0,
      rippleActive: false,
    };

    // Subtle executive ISTD palette (Royal Blue, Deep Navy, Diamond Gold, Accent Red)
    const palette = [
      '37, 99, 235', // ISTD Royal Blue
      '11, 34, 57', // ISTD Primary Navy
      '217, 119, 6', // Diamond Chapter Gold
      '30, 64, 175', // Deep Blue
      '220, 38, 38', // Subtle Accent Red
    ];

    const createNodes = (): ParticleNode[] => {
      const isMobile = width < 768;
      const densityDivisor = isMobile ? 38000 : 21000;
      const count = Math.min(
        isMobile ? 24 : 58,
        Math.max(isMobile ? 14 : 28, Math.floor((width * height) / densityDivisor))
      );

      const list: ParticleNode[] = [];
      for (let i = 0; i < count; i++) {
        const isHub = i % 6 === 0;
        const speedBase = isMobile ? 0.22 : 0.32;
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.35 + Math.random() * 0.65) * speedBase;
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: isHub ? 2.6 + Math.random() * 1.2 : 1.4 + Math.random() * 1.1,
          color: palette[i % palette.length],
          pulsePhase: Math.random() * Math.PI * 2,
          isHub,
        });
      }
      return list;
    };

    let nodes = createNodes();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nodes = createNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleClick = (e: MouseEvent) => {
      mouse.rippleX = e.clientX;
      mouse.rippleY = e.clientY;
      mouse.rippleRadius = 4;
      mouse.rippleActive = true;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const linkDistance = isMobile ? 115 : 155;
      const mouseLinkDistance = isMobile ? 130 : 185;

      // Update & draw click ripple if active
      if (mouse.rippleActive) {
        mouse.rippleRadius += 4.5;
        const rippleAlpha = Math.max(0, 0.16 * (1 - mouse.rippleRadius / 220));
        if (rippleAlpha <= 0.005) {
          mouse.rippleActive = false;
        } else {
          ctx.beginPath();
          ctx.arc(mouse.rippleX, mouse.rippleY, mouse.rippleRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(37, 99, 235, ${rippleAlpha.toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // Update node positions & draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          node.pulsePhase += 0.02;

          // Gentle wrap around edges with margin
          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;

          // Subtle mouse networking attraction (smooth & non-chaotic)
          if (mouse.active) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 24 && dist < mouseLinkDistance) {
              const pull = (1 - dist / mouseLinkDistance) * 0.014;
              node.x += dx * pull;
              node.y += dy * pull;
            }
          }
        }

        // Draw subtle outer halo for hub nodes
        const pulseScale = 1 + Math.sin(node.pulsePhase) * 0.18;
        if (node.isHub) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.5 * pulseScale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${node.color}, 0.055)`;
          ctx.fill();
        }

        // Draw core node dot (low opacity)
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, ${node.isHub ? 0.26 : 0.19})`;
        ctx.fill();
      }

      // Draw networking edges between proximate nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = linkDistance * linkDistance;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / linkDistance) * 0.105;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha.toFixed(3)})`;
            ctx.lineWidth = a.isHub && b.isHub ? 1.1 : 0.75;
            ctx.stroke();
          }
        }

        // Draw interactive mouse networking connections
        if (mouse.active) {
          const mdx = mouse.x - a.x;
          const mdy = mouse.y - a.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const maxMouseDistSq = mouseLinkDistance * mouseLinkDistance;

          if (mDistSq < maxMouseDistSq) {
            const mDist = Math.sqrt(mDistSq);
            const mAlpha = (1 - mDist / mouseLinkDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.95;
            ctx.stroke();
          }
        }
      }

      // Draw subtle cursor hub node when mouse is active on desktop
      if (mouse.active && !isMobile) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.16)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 11, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('click', handleClick);
    };
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="networking-particles-canvas"
    />
  );
}
