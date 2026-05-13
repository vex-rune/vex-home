import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Typewriter } from './Typewriter';

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const LogoWrapper = styled(motion.div)`
  width: 180px;
  height: 180px;
  margin-bottom: 30px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(165, 180, 252, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${pulse} 3s ease-in-out infinite;
    z-index: -1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
  }
`;

const FloatingWrapper = styled(motion.div)`
  position: relative;
  margin-bottom: 30px;
`;

const glitch = keyframes`
  0%, 100% { 
    text-shadow: 
      0 0 20px rgba(165, 180, 252, 0.8),
      0 0 40px rgba(99, 102, 241, 0.5),
      0 0 60px rgba(99, 102, 241, 0.3);
  }
  2% { 
    text-shadow: 
      -3px 0 #ff00ff,
      3px 0 #00ffff,
      0 0 20px rgba(165, 180, 252, 0.8);
  }
  4% { 
    text-shadow: 
      3px 0 #ff00ff,
      -3px 0 #00ffff,
      0 0 40px rgba(99, 102, 241, 0.8);
  }
  6% { 
    text-shadow: 
      0 0 20px rgba(165, 180, 252, 0.8),
      0 0 40px rgba(99, 102, 241, 0.5),
      0 0 60px rgba(99, 102, 241, 0.3);
  }
`;

const textGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(165, 180, 252, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 30px rgba(165, 180, 252, 0.9)) drop-shadow(0 0 60px rgba(99, 102, 241, 0.5));
  }
`;

const TitleLetter = styled(motion.span)<{ $delay: number; $color: string }>`
  display: inline-block;
  animation: ${textGlow} 3s ease-in-out infinite;
  animation-delay: ${props => props.$delay * 0.1}s;
  color: ${props => props.$color};
  
  @keyframes textGlow {
    0%, 100% {
      text-shadow: 
        0 0 10px rgba(165, 180, 252, 0.5),
        0 0 20px rgba(99, 102, 241, 0.3);
    }
    50% {
      text-shadow: 
        0 0 20px rgba(165, 180, 252, 0.9),
        0 0 40px rgba(99, 102, 241, 0.6),
        0 0 60px rgba(129, 140, 248, 0.4);
    }
  }
`;

const TitleWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
`;

const TitleGlow = styled(motion.div)`
  position: absolute;
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  color: transparent;
  background: linear-gradient(135deg, #a5b4fc, #6366f1, #818cf8);
  -webkit-background-clip: text;
  background-clip: text;
  filter: blur(30px);
  opacity: 0.5;
  z-index: -1;
`;

const TitleShadow = styled(motion.div)`
  position: absolute;
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  color: #6366f1;
  filter: blur(40px);
  opacity: 0.3;
  z-index: -2;
  transform: translate(0, 10px);
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: -3px;
  animation: ${glitch} 5s ease-in-out infinite;
  position: relative;
  
  &::before,
  &::after {
    content: 'REXRUNE';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  
  &::before {
    color: #ff00ff;
    animation: glitchTop 1s ease-in-out infinite;
    clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  }
  
  &::after {
    color: #00ffff;
    animation: glitchBottom 1.5s ease-in-out infinite;
    clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  }
  
  @keyframes glitchTop {
    2%, 64% { transform: translate(2px, -2px); opacity: 0.8; }
    4%, 60% { transform: translate(-2px, 2px); opacity: 0.9; }
    62% { transform: translate(0); opacity: 0; }
  }
  
  @keyframes glitchBottom {
    2%, 64% { transform: translate(-2px, 0); opacity: 0.8; }
    4%, 60% { transform: translate(2px, 0); opacity: 0.9; }
    62% { transform: translate(0); opacity: 0; }
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: rgba(165, 180, 252, 0.9);
  margin-bottom: 40px;
  max-width: 600px;
  line-height: 1.6;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 40px;
  margin-top: 30px;
`;

const SocialIcon = styled(motion.a)`
  color: #f0f0f0;
  font-size: 2rem;
  position: relative;
  opacity: 0.6;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: rgba(165, 180, 252, 0.1);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover {
    opacity: 1;
    color: #a5b4fc;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: rgba(165, 180, 252, 0.6);
  font-size: 0.8rem;
  letter-spacing: 2px;
`;

const ScrollMouse = styled(motion.div)`
  width: 24px;
  height: 40px;
  border: 2px solid rgba(165, 180, 252, 0.4);
  border-radius: 12px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    background: #a5b4fc;
    border-radius: 2px;
    animation: scrollDown 1.5s ease-in-out infinite;
  }
  
  @keyframes scrollDown {
    0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
    50% { transform: translateX(-50%) translateY(10px); opacity: 0.3; }
  }
`;

const floatVariant = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const
    }
  }
};

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut' as const
    }
  }
};

export function Header() {
  return (
    <HeroContainer>
      <Title variants={fadeInUp}>
        REXRUNE
      </Title>
      
      <Subtitle variants={fadeInUp}>
        <Typewriter texts={[
          'AI Engineer & Full-Stack Developer',
          '构建智能化工具，探索无限可能',
          '让技术服务于创造'
        ]} />
      </Subtitle>
      
      <SocialLinks variants={fadeInUp}>
        <SocialIcon 
          href="https://github.com/fomalhaut-m" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          <FaGithub />
        </SocialIcon>
        <SocialIcon 
          href="https://twitter.com/rexrune" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTwitter />
        </SocialIcon>
        <SocialIcon 
          href="https://linkedin.com/in/rexrune" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          <FaLinkedin />
        </SocialIcon>
      </SocialLinks>
      
      <ScrollIndicator
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>SCROLL</span>
        <ScrollMouse />
      </ScrollIndicator>
    </HeroContainer>
  );
}