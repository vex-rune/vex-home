import React from 'react';
import styled, { keyframes } from 'styled-components';
import Bicycle from './Bicycle';

const roadMove = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const bikeMove = keyframes`
  0% { transform: translate(0, 0); }
  15% { transform: translate(8px, -3px); }
  30% { transform: translate(-5px, -6px); }
  45% { transform: translate(3px, -2px); }
  60% { transform: translate(-8px, -5px); }
  75% { transform: translate(6px, -1px); }
  90% { transform: translate(-3px, -4px); }
  100% { transform: translate(0, 0); }
`;

const carMove = keyframes`
  0% { transform: translate(0, 0) scaleX(-1); }
  12% { transform: translate(-6px, -4px) scaleX(-1); }
  25% { transform: translate(4px, -2px) scaleX(-1); }
  37% { transform: translate(-7px, -5px) scaleX(-1); }
  50% { transform: translate(5px, -1px) scaleX(-1); }
  62% { transform: translate(-4px, -6px) scaleX(-1); }
  75% { transform: translate(6px, -3px) scaleX(-1); }
  87% { transform: translate(-2px, -4px) scaleX(-1); }
  100% { transform: translate(0, 0) scaleX(-1); }
`;

const mountainMove = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, var(--color-scene-sky) 0%, var(--color-scene-sky-end) 100%);
  overflow: hidden;
  z-index: -1;
  filter: grayscale(100%);
`;

const Road = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4.5%;
  background: var(--color-scene-ground);
`;

const Roadside = styled.div`
  position: absolute;
  bottom: 4.5%;
  left: 0;
  width: 200%;
  height: 240px;
  animation: ${roadMove} 30s linear infinite;
`;

const Hedge = styled.div<{ $left: string; $width: string }>`
  position: absolute;
  bottom: 0;
  left: ${props => props.$left};
  width: ${props => props.$width};
  height: 72px;
  background: var(--color-scene-hedge);
  border-radius: 36px;

  &::before {
    content: '';
    position: absolute;
    top: -24px;
    left: 30px;
    width: 48px;
    height: 48px;
    background: var(--color-scene-hedge-accent);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: -36px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: var(--color-scene-hedge-accent);
    border-radius: 50%;
  }
`;

const BusStop = styled.div<{ $left: string }>`
  position: absolute;
  bottom: 0;
  left: ${props => props.$left};

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 18px;
    height: 150px;
    background: var(--color-scene-element);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 132px;
    left: 50%;
    transform: translateX(-50%);
    width: 108px;
    height: 72px;
    background: var(--color-scene-element-light);
    border-radius: 12px;
  }
`;

const TrashCan = styled.div<{ $left: string }>`
  position: absolute;
  bottom: 0;
  left: ${props => props.$left};

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 72px;
    height: 84px;
    background: var(--color-scene-element-mid);
    border-radius: 12px 12px 0 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 72px;
    left: 50%;
    transform: translateX(-50%);
    width: 84px;
    height: 18px;
    background: var(--color-scene-element-dark);
    border-radius: 12px;
  }
`;

const RoadLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 200%;
  height: 8px;
  background: repeating-linear-gradient(
    to right,
    var(--color-scene-road-line) 0px,
    var(--color-scene-road-line) 60px,
    transparent 60px,
    transparent 120px
  );
  animation: ${roadMove} 8s linear infinite;
`;

const SpeedLine = styled.div<{ $top: string; $left: string; $width: string; $delay: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: ${props => props.$width};
  height: 2px;
  background: linear-gradient(to right, transparent, var(--color-scene-speed-line), transparent);
  opacity: 0.3;
  animation: ${roadMove} 5s linear infinite;
  animation-delay: ${props => props.$delay};
`;

const Sun = styled.div`
  position: absolute;
  top: 10%;
  right: 15%;
  width: 80px;
  height: 80px;
  background: var(--color-scene-sun);
  border-radius: 50%;
  box-shadow: 0 0 60px var(--color-scene-sun-glow);
`;

const Cloud = styled.div<{ $top: string; $left: string; $delay: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: 100px;
  height: 40px;
  background: var(--color-scene-cloud);
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
    background: var(--color-scene-cloud);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: -30px;
    left: 50px;
    width: 60px;
    height: 60px;
    background: var(--color-scene-cloud);
    border-radius: 50%;
  }
`;

const MountainRange = styled.div`
  position: absolute;
  bottom: 4.5%;
  left: 0;
  width: 200%;
  height: 25%;
  animation: ${mountainMove} 30s linear infinite;
`;

const BicycleWrapper = styled.div`
  position: absolute;
  bottom: 4%;
  left:4%;
  transform: translateX(-50%);
  width: 360px;
  height: 216px;
  animation: ${bikeMove} 12s ease-in-out infinite;
  color: var(--color-scene-ground);
  @media (max-width: 768px) {
    width: 200px;
    height: 120px;
    left: 8%;
  }
`;

const CarWrapper = styled.div`
  position: absolute;
  bottom: 3.2%;
  right: 15%;
  width: 140px;
  height: 80px;
  animation: ${carMove} 15s ease-in-out infinite;
  color: var(--color-scene-ground);
  @media (max-width: 768px) {
    width: 80px;
    height: 46px;
    right: 8%;
  }
`;

const Car: React.FC = () => (
  <svg viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 20 50 L 20 35 Q 20 30 25 30 L 50 30 L 65 15 Q 68 12 72 12 L 100 12 Q 105 12 108 15 L 120 30 Q 125 30 125 35 L 125 50"
      stroke="currentColor" strokeWidth="3" fill="none"
    />
    <line x1="20" y1="50" x2="125" y2="50" stroke="currentColor" strokeWidth="3" />
    <line x1="65" y1="15" x2="108" y2="15" stroke="currentColor" strokeWidth="2.5" />

    <path d="M 68 18 L 55 30 L 68 30 Z" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M 105 18 L 115 30 L 105 30 Z" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="70" y="18" width="33" height="12" stroke="currentColor" strokeWidth="2" fill="none" />

    <circle cx="38" cy="55" r="12" stroke="currentColor" strokeWidth="3">
      <animateTransform attributeName="transform" type="rotate" from="0 38 55" to="360 38 55" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="38" cy="55" r="5" stroke="currentColor" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" from="0 38 55" to="360 38 55" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="108" cy="55" r="12" stroke="currentColor" strokeWidth="3">
      <animateTransform attributeName="transform" type="rotate" from="0 108 55" to="360 108 55" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="108" cy="55" r="5" stroke="currentColor" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" from="0 108 55" to="360 108 55" dur="2s" repeatCount="indefinite" />
    </circle>

    <rect x="120" y="35" width="8" height="6" fill="currentColor" rx="2" />
    <rect x="15" y="38" width="6" height="5" fill="currentColor" rx="1" />
    <line x1="70" y1="30" x2="70" y2="50" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const BackgroundAnimation: React.FC = () => {
  return (
    <Container>
      <Sun />
      <Cloud $top="15%" $left="10%" $delay="0s" />
      <Cloud $top="25%" $left="60%" $delay="-8s" />
      <Cloud $top="8%" $left="80%" $delay="-15s" />

      <MountainRange>
        <svg width="200%" height="100%" viewBox="0 0 1200 200" preserveAspectRatio="none">
          {/* 第一组山 */}
          <path d="M 0,200 L 0,160 Q 20,100 40,80 Q 50,70 60,80 Q 80,100 100,160 L 100,200 Z" fill="var(--color-scene-mountain-far)" opacity="0.4" />
          <path d="M 120,200 L 120,150 Q 135,80 150,60 Q 160,50 170,60 Q 185,80 200,150 L 200,200 Z" fill="var(--color-scene-mountain-far)" opacity="0.35" />
          <path d="M 230,200 L 230,155 Q 248,85 265,65 Q 275,55 285,65 Q 302,85 320,155 L 320,200 Z" fill="var(--color-scene-mountain-far)" opacity="0.42" />
          <path d="M 340,200 L 340,145 Q 358,75 375,55 Q 385,45 395,55 Q 412,75 430,145 L 430,200 Z" fill="var(--color-scene-mountain-far)" opacity="0.38" />
          <path d="M 450,200 L 450,150 Q 468,80 485,60 Q 495,50 505,60 Q 522,80 540,150 L 540,200 Z" fill="var(--color-scene-mountain-far)" opacity="0.4" />

          <path d="M 50,200 L 50,140 Q 65,70 80,50 Q 90,40 100,50 Q 115,70 130,140 L 130,200 Z" fill="var(--color-scene-mountain-mid)" opacity="0.6" />
          <path d="M 160,200 L 160,130 Q 178,55 195,35 Q 205,25 215,35 Q 232,55 250,130 L 250,200 Z" fill="var(--color-scene-mountain-mid)" opacity="0.55" />
          <path d="M 280,200 L 280,135 Q 298,60 315,40 Q 325,30 335,40 Q 352,60 370,135 L 370,200 Z" fill="var(--color-scene-mountain-mid)" opacity="0.62" />
          <path d="M 400,200 L 400,125 Q 418,50 435,30 Q 445,20 455,30 Q 472,50 490,125 L 490,200 Z" fill="var(--color-scene-mountain-mid)" opacity="0.58" />
          <path d="M 520,200 L 520,140 Q 538,65 555,45 Q 565,35 575,45 Q 592,65 610,140 L 610,200 Z" fill="var(--color-scene-mountain-mid)" opacity="0.6" />

          <path d="M 20,200 L 20,130 Q 38,55 55,35 Q 65,25 75,35 Q 92,55 110,130 L 110,200 Z" fill="var(--color-scene-mountain-near)" opacity="0.8" />
          <path d="M 140,200 L 140,120 Q 158,45 175,25 Q 185,15 195,25 Q 212,45 230,120 L 230,200 Z" fill="var(--color-scene-mountain-near)" opacity="0.75" />
          <path d="M 260,200 L 260,125 Q 278,50 295,30 Q 305,20 315,30 Q 332,50 350,125 L 350,200 Z" fill="var(--color-scene-mountain-near)" opacity="0.82" />
          <path d="M 380,200 L 380,115 Q 398,40 415,20 Q 425,10 435,20 Q 452,40 470,115 L 470,200 Z" fill="var(--color-scene-mountain-near)" opacity="0.78" />
          <path d="M 500,200 L 500,130 Q 518,55 535,35 Q 545,25 555,35 Q 572,55 590,130 L 590,200 Z" fill="var(--color-scene-mountain-near)" opacity="0.8" />

          {/* 第二组山（无缝衔接） */}
          <path d="M 600,200 L 600,160 Q 620,100 640,80 Q 650,70 660,80 Q 680,100 700,160 L 700,200 Z" fill="var(--color-scene-mountain-far)" opacity="0.4" />
          <path d="M 720,200 L 720,150 Q 735,80 750,60 Q 760,50 770,60 Q 785,80 800,150 L 800,200 Z" fill="var(--color-scene-mountain-far)" opacity="0.35" />
          <path d="M 830,200 L 830,155 Q 848,85 865,65 Q 875,55 885,65 Q 902,85 920,155 L 920,200 Z" fill="var(--color-scene-mountain-far)" opacity="0.42" />
          <path d="M 940,200 L 940,145 Q 958,75 975,55 Q 985,45 995,55 Q 1012,75 1030,145 L 1030,200 Z" fill="var(--color-scene-mountain-far)" opacity="0.38" />
          <path d="M 1050,200 L 1050,150 Q 1068,80 1085,60 Q 1095,50 1105,60 Q 1122,80 1140,150 L 1140,200 Z" fill="var(--color-scene-mountain-far)" opacity="0.4" />

          <path d="M 650,200 L 650,140 Q 665,70 680,50 Q 690,40 700,50 Q 715,70 730,140 L 730,200 Z" fill="var(--color-scene-mountain-mid)" opacity="0.6" />
          <path d="M 760,200 L 760,130 Q 778,55 795,35 Q 805,25 815,35 Q 832,55 850,130 L 850,200 Z" fill="var(--color-scene-mountain-mid)" opacity="0.55" />
          <path d="M 880,200 L 880,135 Q 898,60 915,40 Q 925,30 935,40 Q 952,60 970,135 L 970,200 Z" fill="var(--color-scene-mountain-mid)" opacity="0.62" />
          <path d="M 1000,200 L 1000,125 Q 1018,50 1035,30 Q 1045,20 1055,30 Q 1072,50 1090,125 L 1090,200 Z" fill="var(--color-scene-mountain-mid)" opacity="0.58" />
          <path d="M 1120,200 L 1120,140 Q 1138,65 1155,45 Q 1165,35 1175,45 Q 1192,65 1200,140 L 1200,200 Z" fill="var(--color-scene-mountain-mid)" opacity="0.6" />

          <path d="M 620,200 L 620,130 Q 638,55 655,35 Q 665,25 675,35 Q 692,55 710,130 L 710,200 Z" fill="var(--color-scene-mountain-near)" opacity="0.8" />
          <path d="M 740,200 L 740,120 Q 758,45 775,25 Q 785,15 795,25 Q 812,45 830,120 L 830,200 Z" fill="var(--color-scene-mountain-near)" opacity="0.75" />
          <path d="M 860,200 L 860,125 Q 878,50 895,30 Q 905,20 915,30 Q 932,50 950,125 L 950,200 Z" fill="var(--color-scene-mountain-near)" opacity="0.82" />
          <path d="M 980,200 L 980,115 Q 998,40 1015,20 Q 1025,10 1035,20 Q 1052,40 1070,115 L 1070,200 Z" fill="var(--color-scene-mountain-near)" opacity="0.78" />
          <path d="M 1100,200 L 1100,130 Q 1118,55 1135,35 Q 1145,25 1155,35 Q 1172,55 1190,130 L 1190,200 Z" fill="var(--color-scene-mountain-near)" opacity="0.8" />
        </svg>
      </MountainRange>

      <SpeedLine $top="95.9%" $left="0" $width="80px" $delay="0s" />
      <SpeedLine $top="97.9%" $left="20%" $width="100px" $delay="-0.3s" />
      <SpeedLine $top="96.9%" $left="40%" $width="60px" $delay="-0.5s" />
      <SpeedLine $top="98.9%" $left="60%" $width="90px" $delay="-0.2s" />
      <SpeedLine $top="94.9%" $left="80%" $width="70px" $delay="-0.7s" />

      <Roadside>
        <Hedge $left="5%" $width="80px" />
        <Hedge $left="25%" $width="120px" />
        <Hedge $left="55%" $width="90px" />
        <Hedge $left="80%" $width="100px" />

        <BusStop $left="15%" />
        <BusStop $left="65%" />

        <TrashCan $left="35%" />
        <TrashCan $left="85%" />
      </Roadside>

      <Road>
        <RoadLine />
      </Road>
      <BicycleWrapper>
        <Bicycle />
      </BicycleWrapper>

    </Container>
  );
};

export default BackgroundAnimation;
