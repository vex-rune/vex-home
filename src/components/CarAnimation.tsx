import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const CarWrapper = styled.div`
  position: absolute;
  bottom: 28%;
  right: 15%;
  transform: translateX(50%);
  width: 140px;
  height: 80px;
`;

const CarAnimation: React.FC = () => {
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
      <CarWrapper>
        <svg viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* ===== 车身 ===== */}

          {/* 车身主体 */}
          <path
            d="M 20 50 L 20 35 Q 20 30 25 30 L 50 30 L 65 15 Q 68 12 72 12 L 100 12 Q 105 12 108 15 L 120 30 Q 125 30 125 35 L 125 50"
            stroke="#2a2a2a"
            strokeWidth="3"
            fill="none"
          />

          {/* 车身底部 */}
          <line x1="20" y1="50" x2="125" y2="50" stroke="#2a2a2a" strokeWidth="3" />

          {/* 车顶 */}
          <line x1="65" y1="15" x2="108" y2="15" stroke="#2a2a2a" strokeWidth="2.5" />

          {/* ===== 车窗 ===== */}

          {/* 前窗 */}
          <path
            d="M 68 18 L 55 30 L 68 30 Z"
            stroke="#2a2a2a"
            strokeWidth="2"
            fill="none"
          />

          {/* 后窗 */}
          <path
            d="M 105 18 L 115 30 L 105 30 Z"
            stroke="#2a2a2a"
            strokeWidth="2"
            fill="none"
          />

          {/* 中窗 */}
          <rect x="70" y="18" width="33" height="12" stroke="#2a2a2a" strokeWidth="2" fill="none" />

          {/* ===== 轮子 ===== */}

          {/* 后轮 */}
          <circle cx="38" cy="55" r="12" stroke="#2a2a2a" strokeWidth="3">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 38 55"
              to="360 38 55"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="38" cy="55" r="5" stroke="#2a2a2a" strokeWidth="2">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 38 55"
              to="360 38 55"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </circle>

          {/* 前轮 */}
          <circle cx="108" cy="55" r="12" stroke="#2a2a2a" strokeWidth="3">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 108 55"
              to="360 108 55"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="108" cy="55" r="5" stroke="#2a2a2a" strokeWidth="2">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 108 55"
              to="360 108 55"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </circle>

          {/* ===== 细节 ===== */}

          {/* 前灯 */}
          <rect x="120" y="35" width="8" height="6" fill="#2a2a2a" rx="2" />

          {/* 后灯 */}
          <rect x="15" y="38" width="6" height="5" fill="#2a2a2a" rx="1" />

          {/* 车门线 */}
          <line x1="70" y1="30" x2="70" y2="50" stroke="#2a2a2a" strokeWidth="1.5" />
        </svg>
      </CarWrapper>
    </Container>
  );
};

export default CarAnimation;
