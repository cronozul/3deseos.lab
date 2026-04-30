import React, { useEffect, useRef, useCallback } from 'react';

const WishesBackground = () => {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const blob4Ref = useRef(null);
  const rafRef = useRef(null);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = useCallback(() => {
    // Smoothly interpolate towards the mouse
    currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.06);
    currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.06);

    const cx = currentPos.current.x;
    const cy = currentPos.current.y;

    // Blob 1: follows cursor closely (primary)
    if (blob1Ref.current) {
      blob1Ref.current.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`;
    }
    // Blob 2: follows cursor with offset (secondary)
    if (blob2Ref.current) {
      blob2Ref.current.style.transform = `translate(${cx - 100}px, ${cy - 400}px)`;
    }
    // Blob 3: inverse slow trail
    if (blob3Ref.current) {
      blob3Ref.current.style.transform = `translate(${-cx + window.innerWidth - 200}px, ${cy - 200}px)`;
    }
    // Blob 4: slow diagonal
    if (blob4Ref.current) {
      blob4Ref.current.style.transform = `translate(${cx * 0.3}px, ${cy * 0.3 + 100}px)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Only run on desktop
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* Blob 1 — primary cursor follower */}
      <div
        ref={blob1Ref}
        className="absolute top-0 left-0 will-change-transform"
        style={{ transform: `translate(${window.innerWidth / 2 - 300}px, ${window.innerHeight / 2 - 300}px)` }}
      >
        <div
          className="w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, #402C5A 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'drift1 8s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Blob 2 — secondary, blue */}
      <div
        ref={blob2Ref}
        className="absolute top-0 left-0 will-change-transform"
        style={{ transform: `translate(${window.innerWidth / 2 - 100}px, ${window.innerHeight / 2 - 400}px)` }}
      >
        <div
          className="w-[500px] h-[500px] rounded-full opacity-35"
          style={{
            background: 'radial-gradient(circle, #1a4a8a 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'drift2 10s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Blob 3 — inverse, warm */}
      <div
        ref={blob3Ref}
        className="absolute top-0 left-0 will-change-transform"
        style={{ transform: `translate(${window.innerWidth - 200}px, ${window.innerHeight / 2 - 200}px)` }}
      >
        <div
          className="w-[450px] h-[450px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #316DBC 0%, transparent 70%)',
            filter: 'blur(120px)',
            animation: 'drift3 12s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Blob 4 — ambient, static glow at bottom */}
      <div
        ref={blob4Ref}
        className="absolute top-0 left-0 will-change-transform"
        style={{ transform: `translate(${window.innerWidth * 0.15}px, ${window.innerHeight * 0.4}px)` }}
      >
        <div
          className="w-[700px] h-[700px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #5B2E8A 0%, transparent 70%)',
            filter: 'blur(150px)',
            animation: 'drift4 15s ease-in-out infinite alternate',
          }}
        />
      </div>

      <style>{`
        @keyframes drift1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes drift2 {
          0%   { transform: translate(0px, 0px) scale(1.1); }
          100% { transform: translate(-50px, 40px) scale(0.95); }
        }
        @keyframes drift3 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(30px, 50px) scale(1.05); }
        }
        @keyframes drift4 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(-20px, -40px) scale(1.08); }
        }
      `}</style>
    </div>
  );
};

export default WishesBackground;
