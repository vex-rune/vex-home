import { useRef, useCallback, useState } from 'react';
import styled, { keyframes } from 'styled-components';

/* ── Animations ── */
const watermarkAnim = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

/* ── Styled Components ── */
const HeroSection = styled.div`
  position: relative;
  height: calc(100vh - 204px);
  min-height: 500px;
  border-bottom: 1px solid #111;
  overflow: hidden;
`;

const WatermarkRow = styled.div<{ $color?: string }>`
  font-size: 2.5rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  white-space: nowrap;
  color: ${({ $color }) => $color || 'rgba(0,0,0,0.06)'};
  user-select: none;
  line-height: 1.5;
  overflow: hidden;
`;

const WatermarkTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${watermarkAnim} 25s linear infinite;
`;

const WatermarkBg = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  pointer-events: none;
`;

const CircleLayer = styled.div<{ $x: number; $y: number; $active: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 1;
  clip-path: circle(300px at ${({ $x }) => $x}px ${({ $y }) => $y}px);
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: none;
`;

const OuterLayer = styled.div<{ $x: number; $y: number; $active: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  mask-image: ${({ $active, $x, $y }) =>
    $active
      ? `radial-gradient(circle 300px at ${$x}px ${$y}px, transparent 0%, transparent 80%, black 100%)`
      : 'none'};
  -webkit-mask-image: ${({ $active, $x, $y }) =>
    $active
      ? `radial-gradient(circle 300px at ${$x}px ${$y}px, transparent 0%, transparent 80%, black 100%)`
      : 'none'};
`;

const TitleEn = styled.h1`
  font-size: clamp(4rem, 12vw, 12rem);
  font-weight: 900;
  letter-spacing: 0.05em;
  margin: 0 0 24px;
  line-height: 1.1;
  color: #111;
`;

const TitleCn = styled.h1`
  font-size: clamp(4rem, 12vw, 12rem);
  font-weight: 900;
  letter-spacing: 0.05em;
  margin: 0 0 24px;
  line-height: 1.1;
  color: #fff;
`;

/* ── Data ── */
const REPEAT_TEXT = 'LUKE';
const LINE_COUNT = 24;
const DUPE_COUNT = 12;

/* ── Component ── */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpot({ x: 0, y: 0, active: false });
  }, []);

  const renderWatermark = (color?: string) => (
    <WatermarkBg>
      {Array.from({ length: LINE_COUNT }).map((_, i) => (
        <WatermarkRow key={i} $color={color}>
          <WatermarkTrack>
            {Array.from({ length: DUPE_COUNT }).map((_, j) => (
              <span key={j}>{REPEAT_TEXT}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            ))}
            {Array.from({ length: DUPE_COUNT }).map((_, j) => (
              <span key={`d${j}`}>{REPEAT_TEXT}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            ))}
          </WatermarkTrack>
        </WatermarkRow>
      ))}
    </WatermarkBg>
  );

  return (
    <HeroSection
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {renderWatermark()}

      <CircleLayer $x={spot.x} $y={spot.y} $active={spot.active}>
        {renderWatermark('#000')}
        <div style={{ position: 'relative', zIndex: 2 }}>
        <TitleCn>你好<br />我是 雷鸣</TitleCn>
        </div>
      </CircleLayer>

      <OuterLayer $x={spot.x} $y={spot.y} $active={spot.active}>
          <TitleEn>HELLO<br />I'm  Luke</TitleEn>
      </OuterLayer>
    </HeroSection>
  );
}
