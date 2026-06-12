import { useRef, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

/* ── 可调参数（调试用） ── */
const CONFIG = {
  CIRCLE_RADIUS_MOBILE: 150,
  CIRCLE_RADIUS_DESKTOP: 300,
  LERP: 0.1,
  TRAIL_LEN: 30,
  TRAIL_INSET: 30,
  TRAIL_MAX_ALPHA: 0.5,
  MASK_SOFTNESS: 80,
  OPACITY_DURATION: 0.3,
};

const isMobile = () => window.innerWidth <= 768;
const getRadius = () => (isMobile() ? CONFIG.CIRCLE_RADIUS_MOBILE : CONFIG.CIRCLE_RADIUS_DESKTOP);
const getCssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

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
  border-bottom: 1px solid var(--color-border);
  overflow: hidden;
`;

const WatermarkRow = styled.div<{ $color?: string }>`
  font-size: clamp(1.2rem, 4vw, 2.5rem);
  font-weight: 500;
  letter-spacing: 0.4em;
  white-space: nowrap;
  color: ${({ $color }) => $color || 'var(--color-watermark)'};
  user-select: none;
  line-height: 1.8;
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

const CircleLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  clip-path: circle(150px at 0px 0px);
  background: var(--color-interactive);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0;
  transition: opacity ${CONFIG.OPACITY_DURATION}s ease;
`;

const OuterLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  mask-image: none;
  -webkit-mask-image: none;
`;

const TrailCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const TitleEn = styled.h1`
  font-size: clamp(2.5rem, 12vw, 12rem);
  font-weight: 900;
  letter-spacing: 0.05em;
  margin: 0 0 24px;
  line-height: 1.1;
  color: var(--color-text);
`;

const TitleCn = styled.h1`
  font-size: clamp(2.5rem, 12vw, 12rem);
  font-weight: 900;
  letter-spacing: 0.05em;
  margin: 0 0 24px;
  line-height: 1.1;
  color: var(--color-text-inverse);
`;

/* ── Data ── */
const REPEAT_TEXTS = ['LUKE', 'VEX', '雷鸣', '北落师门', 'vexrune.top'];
const LINE_COUNT = 24;
const DUPE_COUNT = 12;

/* ── Component ── */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const target = useRef({ x: 0, y: 0, active: false });
  const current = useRef({ x: 0, y: 0 });
  const trail = useRef<Array<{ x: number; y: number }>>([]);
  const rafId = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;
    const resize = () => {
      const { width, height } = hero.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const animate = useCallback(() => {
    const { x: tx, y: ty, active } = target.current;
    const cx = current.current.x + (tx - current.current.x) * CONFIG.LERP;
    const cy = current.current.y + (ty - current.current.y) * CONFIG.LERP;
    current.current.x = cx;
    current.current.y = cy;

    const r = getRadius();

    if (circleRef.current) {
      circleRef.current.style.clipPath = `circle(${r}px at ${cx}px ${cy}px)`;
      circleRef.current.style.opacity = active ? '1' : '0';
    }
    if (outerRef.current) {
      const mask = active
        ? `radial-gradient(circle ${r}px at ${cx}px ${cy}px, transparent 0%, transparent ${CONFIG.MASK_SOFTNESS}%, black 100%)`
        : 'none';
      outerRef.current.style.maskImage = mask;
      outerRef.current.style.webkitMaskImage = mask;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (active) {
          trail.current.push({ x: cx, y: cy });
          if (trail.current.length > CONFIG.TRAIL_LEN) trail.current.shift();

          const len = trail.current.length;
          for (let i = 0; i < len; i++) {
            const p = trail.current[i];
            const t = (i + 1) / len;
            ctx.globalAlpha = t * CONFIG.TRAIL_MAX_ALPHA;
            ctx.beginPath();
            ctx.arc(p.x, p.y, r - CONFIG.TRAIL_INSET, 0, Math.PI * 2);
            ctx.fillStyle = getCssVar('--color-interactive');
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        } else {
          trail.current = [];
        }
      }
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    target.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
  }, []);

  const handleMouseLeave = useCallback(() => {
    target.current.active = false;
  }, []);

  const renderWatermark = (color?: string) => (
    <WatermarkBg>
      {Array.from({ length: LINE_COUNT }).map((_, i) => {
        const text = REPEAT_TEXTS[i % REPEAT_TEXTS.length];
        return (
          <WatermarkRow key={i} $color={color}>
            <WatermarkTrack>
              {Array.from({ length: DUPE_COUNT }).map((_, j) => (
                <span key={j}>{text}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              ))}
              {Array.from({ length: DUPE_COUNT }).map((_, j) => (
                <span key={`d${j}`}>{text}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              ))}
            </WatermarkTrack>
          </WatermarkRow>
        );
      })}
    </WatermarkBg>
  );

  return (
    <HeroSection
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {renderWatermark()}

      <CircleLayer ref={circleRef}>
        {renderWatermark('var(--color-interactive)')}
        <div style={{ position: 'relative', zIndex: 2 }}>
        <TitleCn>你好<br />我是 雷鸣</TitleCn>
        </div>
      </CircleLayer>

      <OuterLayer ref={outerRef}>
          <TitleEn>HELLO<br />I'm  Luke</TitleEn>
      </OuterLayer>

      <TrailCanvas ref={canvasRef} />
    </HeroSection>
  );
}
