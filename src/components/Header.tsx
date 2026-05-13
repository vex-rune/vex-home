import { useState } from 'react';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaWeixin, FaPaperPlane, FaMusic } from 'react-icons/fa';
import { SiGitee, SiTiktok } from 'react-icons/si';
import { Typewriter } from './Typewriter';

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
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

const LogoGlow = styled.div`
  width: 180px;
  height: 180px;
  margin-bottom: 30px;
  background: radial-gradient(circle, rgba(165, 180, 252, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: ${pulse} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: -3px;
  animation: ${glitch} 5s ease-in-out infinite;
  position: relative;
  background: linear-gradient(135deg, #f0f0f0 0%, #a5b4fc 25%, #6366f1 50%, #818cf8 75%, #f0f0f0 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
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

const QrModal = styled(motion.div)`
  position: absolute;
  bottom: 150%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(24, 24, 27, 0.98);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(165, 180, 252, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  z-index: 100;
  width: 220px;
  box-shadow: 0 10px 40px rgba(165, 180, 252, 0.15);

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  p {
    margin-top: 0.75rem;
    color: rgba(240, 240, 240, 0.8);
    font-size: 0.875rem;
    text-align: center;
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
  const [showWechatQr, setShowWechatQr] = useState(false);

  return (
    <HeroContainer>
      <LogoGlow />
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
          href="https://www.feishu.cn/invitation/page/add_contact/?token=cbdrbf0a-b729-42a7-865d-55376072c05d" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          <FaPaperPlane />
        </SocialIcon>
        <SocialIcon 
          href="https://gitee.com/Fomalhaut_luke" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          <SiGitee />
        </SocialIcon>
        <SocialIcon 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            setShowWechatQr(!showWechatQr);
          }}
          onMouseEnter={() => setShowWechatQr(true)}
          onMouseLeave={() => setShowWechatQr(false)}
          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          <FaWeixin />
          {showWechatQr && (
            <QrModal
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <img src="/weixinq.png" alt="微信二维码" />
              <p>扫描二维码添加微信</p>
            </QrModal>
          )}
        </SocialIcon>
        <SocialIcon 
          href="https://www.douyin.com/user/fomalhaut_m" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          <SiTiktok />
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