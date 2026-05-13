import { motion } from 'framer-motion';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { FaBook, FaRobot, FaReact, FaPython, FaExternalLinkAlt } from 'react-icons/fa';

const Item = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 30px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(165, 180, 252, 0.1);
  border-radius: 16px;
  text-decoration: none;
  color: #f0f0f0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #a5b4fc, #6366f1);
    transform: scaleY(0);
    transition: transform 0.4s;
  }
  
  &:hover {
    transform: translateX(15px);
    background: rgba(165, 180, 252, 0.08);
    border-color: rgba(165, 180, 252, 0.3);
    box-shadow: 0 10px 40px rgba(99, 102, 241, 0.1);
  }
  
  &:hover::before {
    transform: scaleY(1);
  }
  
  .wiki-info {
    display: flex;
    align-items: center;
    gap: 15px;
    
    svg {
      font-size: 1.5rem;
      color: #a5b4fc;
      filter: drop-shadow(0 0 8px rgba(165, 180, 252, 0.3));
    }
    
    span {
      font-size: 1.1rem;
      font-weight: 500;
    }
  }
  
  svg:last-child {
    color: rgba(240, 240, 240, 0.5);
    transition: all 0.3s;
  }
  
  &:hover svg:last-child {
    transform: translateX(5px);
    color: #a5b4fc;
  }
`;

interface WikiItemProps {
  href: string;
  icon: IconType;
  label: string;
  external?: boolean;
}

export function WikiItem({ href, icon: Icon, label, external = false }: WikiItemProps) {
  return (
    <Item 
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ x: 15 }}
    >
      <div className="wiki-info">
        <Icon />
        <span>{label}</span>
      </div>
      <FaExternalLinkAlt />
    </Item>
  );
}

export const wikiItems = [
  { href: 'http://wiki.vexrune.top/', icon: FaBook, label: '主知识库 - 完整文档中心', external: true },
  { href: '#', icon: FaRobot, label: 'AI & 机器学习' },
  { href: '#', icon: FaReact, label: '前端开发指南' },
  { href: '#', icon: FaPython, label: 'Python 实践案例' },
];