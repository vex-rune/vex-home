import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaJava, FaPython, FaDatabase, FaServer, FaCloud, FaNetworkWired, FaRobot } from 'react-icons/fa';
import { SiSpring, SiDocker } from 'react-icons/si';

const TechStackContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const TechItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(165, 180, 252, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
      rgba(165, 180, 252, 0.15) 0%, 
      transparent 50%);
    opacity: 0;
    transition: opacity 0.4s;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(165, 180, 252, 0.4);
    box-shadow: 
      0 20px 40px rgba(99, 102, 241, 0.15),
      0 0 0 1px rgba(165, 180, 252, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  svg {
    font-size: 2.2rem;
    color: #a5b4fc;
    filter: drop-shadow(0 0 10px rgba(165, 180, 252, 0.3));
    transition: all 0.3s;
  }
  
  &:hover svg {
    transform: scale(1.1);
    filter: drop-shadow(0 0 20px rgba(165, 180, 252, 0.5));
  }
  
  span {
    font-size: 1rem;
    font-weight: 500;
    color: #f0f0f0;
  }
`;

const techItems = [
  { icon: FaJava, label: 'Java / Spring' },
  { icon: FaPython, label: 'Python' },
  { icon: FaDatabase, label: 'MySQL / Oracle' },
  { icon: FaNetworkWired, label: 'Redis / Kafka' },
  { icon: SiDocker, label: 'Docker / CI/CD' },
  { icon: FaCloud, label: 'AWS / 云原生' },
  { icon: FaRobot, label: 'AI 工程化' },
  { icon: FaServer, label: '微服务架构' },
];

export function TechStack() {
  return (
    <TechStackContainer>
      {techItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <TechItem
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon />
            <span>{item.label}</span>
          </TechItem>
        );
      })}
    </TechStackContainer>
  );
}