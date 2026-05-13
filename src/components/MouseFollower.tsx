import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const FollowerDiv = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(165, 180, 252, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
`;

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <FollowerDiv
      style={{
        transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
        transition: 'transform 0.15s ease-out'
      }}
    />
  );
}