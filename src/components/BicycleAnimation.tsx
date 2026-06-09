import React from 'react';
import styled, { keyframes } from 'styled-components';
import Bicycle from './Bicycle';

const roadMove = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #f5f5f5 0%, #e8e8e8 100%);
  overflow: hidden;
  z-index: -1;
  filter: grayscale(100%);
`;

const Road = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: #2a2a2a;
`;

const RoadLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 200%;
  height: 8px;
  background: repeating-linear-gradient(
    to right,
    #f5f5f5 0px,
    #f5f5f5 60px,
    transparent 60px,
    transparent 120px
  );
  animation: ${roadMove} 200s linear infinite;
`;

const Sun = styled.div`
  position: absolute;
  top: 10%;
  right: 15%;
  width: 80px;
  height: 80px;
  background: #f5f5f5;
  border-radius: 50%;
  box-shadow: 0 0 60px rgba(245, 245, 245, 0.5);
`;

const Cloud = styled.div<{ $top: string; $left: string; $delay: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: 100px;
  height: 40px;
  background: #e0e0e0;
  border-radius: 20px;
  opacity: 0.6;
  animation: ${roadMove} 20s linear infinite;
  animation-delay: ${props => props.$delay};

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 20px;
    width: 50px;
    height: 50px;
    background: #e0e0e0;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: -30px;
    left: 50px;
    width: 60px;
    height: 60px;
    background: #e0e0e0;
    border-radius: 50%;
  }
`;

const Mountain = styled.div<{ $left: string; $width: string; $height: string }>`
  position: absolute;
  bottom: 30%;
  left: ${props => props.$left};
  width: 0;
  height: 0;
  border-left: ${props => (parseInt(props.$width) / 2)}px solid transparent;
  border-right: ${props => (parseInt(props.$width) / 2)}px solid transparent;
  border-bottom: ${props => props.$height}px solid #c0c0c0;
`;

const BicycleWrapper = styled.div`
  position: absolute;
  bottom: 30%;
  left: 10%;
  transform: translateX(-50%);
  width: 120px;
  height: 72px;
`;

const BicycleAnimation: React.FC = () => {
  return (
    <Container>
      <Sun />
      <Cloud $top="15%" $left="10%" $delay="0s" />
      <Cloud $top="25%" $left="60%" $delay="-8s" />
      <Cloud $top="8%" $left="80%" $delay="-15s" />
      <Mountain $left="5%" $width="300" $height="200" />
      <Mountain $left="25%" $width="400" $height="280" />
      <Mountain $left="55%" $width="350" $height="240" />
      <Mountain $left="80%" $width="280" $height="180" />
      <Road>
        <RoadLine />
      </Road>
      <BicycleWrapper>
        <Bicycle />
      </BicycleWrapper>
    </Container>
  );
};

export default BicycleAnimation;