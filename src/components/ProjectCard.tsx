import { motion } from 'framer-motion';
import styled from 'styled-components';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(165, 180, 252, 0.1);
  border-radius: 20px;
  padding: 35px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
      rgba(165, 180, 252, 0.2) 0%, 
      transparent 60%);
    opacity: 0;
    transition: opacity 0.5s;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 40%,
      rgba(165, 180, 252, 0.1) 50%,
      transparent 60%
    );
    transform: translateX(-100%);
    transition: transform 0.8s;
  }
  
  &:hover {
    transform: translateY(-15px) rotateX(5deg) rotateY(5deg);
    border-color: rgba(165, 180, 252, 0.4);
    box-shadow: 
      0 30px 60px rgba(99, 102, 241, 0.2),
      0 0 0 1px rgba(165, 180, 252, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover::after {
    transform: translateX(100%);
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #f0f0f0;
  position: relative;
  z-index: 1;
`;

const Description = styled.p`
  font-size: 1rem;
  color: rgba(240, 240, 240, 0.7);
  line-height: 1.8;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  position: relative;
  z-index: 1;
`;

const Tag = styled(motion.span)`
  padding: 8px 16px;
  background: rgba(165, 180, 252, 0.1);
  border: 1px solid rgba(165, 180, 252, 0.2);
  border-radius: 20px;
  font-size: 0.85rem;
  color: #a5b4fc;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(165, 180, 252, 0.2);
    border-color: rgba(165, 180, 252, 0.4);
  }
`;

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
}

export function ProjectCard({ title, description, tags }: ProjectCardProps) {
  return (
    <Card
      whileHover={{ y: -15, rotateX: 5, rotateY: 5 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Tags>
        {tags.map((tag, index) => (
          <Tag key={index} whileHover={{ scale: 1.1 }}>
            {tag}
          </Tag>
        ))}
      </Tags>
    </Card>
  );
}