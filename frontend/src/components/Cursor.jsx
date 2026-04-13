import React, { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setTrail(pos), 80);
    return () => clearTimeout(timeout);
  }, [pos]);

  return (
    <>
      <div style={{ ...styles.dot, left: pos.x, top: pos.y, transform: `translate(-50%, -50%) scale(${clicking ? 0.5 : 1})` }} />
      <div style={{ ...styles.ring, left: trail.x, top: trail.y, width: clicking ? '20px' : '36px', height: clicking ? '20px' : '36px' }} />
    </>
  );
}

const styles = {
  dot: {
    position: 'fixed', width: '8px', height: '8px', borderRadius: '50%',
    background: '#6c63ff', pointerEvents: 'none', zIndex: 9999, transition: 'transform 0.1s'
  },
  ring: {
    position: 'fixed', borderRadius: '50%', border: '2px solid rgba(108,99,255,0.5)',
    pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%, -50%)', transition: 'all 0.15s ease'
  }
};
