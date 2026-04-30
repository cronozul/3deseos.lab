import React, { useEffect, useRef, useState } from 'react';

const NUM_TRAIL = 8;

const StarIcon = ({ size = 16, opacity = 1, rotate = 0, color = '#ffffff' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ opacity, transform: `rotate(${rotate}deg)`, display: 'block' }}
  >
    <path d="M12 2 L13.5 9 L20 9 L14.5 13 L16.5 20 L12 16 L7.5 20 L9.5 13 L4 9 L10.5 9 Z" />
  </svg>
);

const StarCursor = ({ heroRef }) => {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const mouse = useRef({ x: -200, y: -200 });
  const positions = useRef(Array(NUM_TRAIL).fill({ x: -200, y: -200 }));
  const rafRef = useRef(null);
  const [active, setActive] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  useEffect(() => {
    if (isMobile) return;

    const hero = heroRef?.current;
    if (!hero) return;

    const onEnter = () => setActive(true);
    const onLeave = () => {
      setActive(false);
      mouse.current = { x: -200, y: -200 };
    };
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    hero.addEventListener('mouseenter', onEnter);
    hero.addEventListener('mouseleave', onLeave);
    hero.addEventListener('mousemove', onMove);

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      // Head position — snappy follow
      positions.current[0] = {
        x: lerp(positions.current[0].x, mouse.current.x, 0.22),
        y: lerp(positions.current[0].y, mouse.current.y, 0.22),
      };

      // Trail — each node follows the one ahead with decay
      for (let i = 1; i < NUM_TRAIL; i++) {
        positions.current[i] = {
          x: lerp(positions.current[i].x, positions.current[i - 1].x, 0.28),
          y: lerp(positions.current[i].y, positions.current[i - 1].y, 0.28),
        };
      }

      // Apply to DOM directly — no React re-render
      if (cursorRef.current) {
        const { x, y } = positions.current[0];
        cursorRef.current.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
      }

      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const { x, y } = positions.current[i + 1] || positions.current[0];
        el.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener('mouseenter', onEnter);
      hero.removeEventListener('mouseleave', onLeave);
      hero.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [heroRef, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main star cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300"
        style={{ opacity: active ? 1 : 0, willChange: 'transform' }}
      >
        <div
          style={{
            filter: 'drop-shadow(0 0 6px rgba(146, 222, 139, 0.9)) drop-shadow(0 0 14px rgba(49, 109, 188, 0.7))',
            animation: 'starSpin 4s linear infinite',
          }}
        >
          <StarIcon size={24} color="#ffffff" />
        </div>
      </div>

      {/* Trail stars */}
      {Array.from({ length: NUM_TRAIL - 1 }).map((_, i) => {
        const t = (i + 1) / NUM_TRAIL;
        const size = Math.round(12 - t * 7); // 12 → 5
        const opacity = 1 - t * 0.85;
        const hue = i % 2 === 0 ? '#92DE8B' : '#316DBC';
        return (
          <div
            key={i}
            ref={(el) => (trailRefs.current[i] = el)}
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            style={{
              opacity: active ? opacity : 0,
              willChange: 'transform',
              transition: 'opacity 0.3s',
            }}
          >
            <div style={{ filter: `drop-shadow(0 0 4px ${hue}88)` }}>
              <StarIcon size={size} color={hue} rotate={i * 30} />
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes starSpin {
          from { transform: rotate(0deg) scale(1); }
          50%  { transform: rotate(180deg) scale(1.15); }
          to   { transform: rotate(360deg) scale(1); }
        }
      `}</style>
    </>
  );
};

export default StarCursor;
