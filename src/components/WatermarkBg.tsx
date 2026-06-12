import styled, { keyframes } from 'styled-components';

const watermarkAnim = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const WatermarkRow = styled.div`
  font-size: clamp(1.2rem, 4vw, 2.5rem);
  font-weight: 500;
  letter-spacing: 0.4em;
  white-space: nowrap;
  color: var(--color-watermark);
  -webkit-user-select: none;
  user-select: none;
  line-height: 1.5;
  overflow: hidden;
`;

const WatermarkTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${watermarkAnim} 25s linear infinite;
`;

const WatermarkBgContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  pointer-events: none;
  z-index: 0;
`;

const LINE_COUNT = 14;
const DUPE_COUNT = 12;
const REPEAT_TEXT = 'V E X';

export default function WatermarkBg() {
  return (
    <WatermarkBgContainer>
      {Array.from({ length: LINE_COUNT }).map((_, i) => (
        <WatermarkRow key={i}>
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
    </WatermarkBgContainer>
  );
}
