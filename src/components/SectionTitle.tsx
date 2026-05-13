import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionTitleStyled = styled(motion.h2)<{ $align?: string }>`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  margin-bottom: 30px;
  color: #f0f0f0;
  position: relative;
  text-align: ${props => props.$align || 'left'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #a5b4fc, transparent);
    border-radius: 2px;
  }
`;

interface SectionTitleProps {
  children: React.ReactNode;
  align?: string;
}

export function SectionTitle({ children, align }: SectionTitleProps) {
  return <SectionTitleStyled $align={align}>{children}</SectionTitleStyled>;
}