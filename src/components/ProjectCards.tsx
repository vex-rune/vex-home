import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translate(0, 0); }
  20% { transform: translate(8px, -4px); }
  40% { transform: translate(-6px, -8px); }
  60% { transform: translate(4px, -3px); }
  80% { transform: translate(-8px, -6px); }
  100% { transform: translate(0, 0); }
`;

/* ── Styled Components ── */
const CardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid var(--color-border);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CardCell = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px;
  text-decoration: none;
  color: var(--color-text);
  border-right: 1px solid var(--color-border);
  border-bottom: none;
  min-height: 120px;
  overflow: hidden;
  transition: background 0.2s ease, color 0.2s ease;
  &:last-child { border-right: none; }
  &:hover { background: var(--color-interactive); color: var(--color-text-inverse); }
  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    min-height: auto;
    &:last-child { border-bottom: none; }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: inherit;
`;

const CardDesc = styled.p`
  font-size: 0.8rem;
  color: inherit;
  opacity: 0.7;
  line-height: 1.5;
`;

const CardShape = styled.div<{ $shape: string; $index: number }>`
  position: absolute;
  bottom: 16px;
  right: 30px;
  width: 80px;
  height: 80px;
  opacity: 0.18;
  pointer-events: none;
  animation: ${float} ${({ $index }) => 4 + $index}s ease-in-out infinite;
  animation-delay: ${({ $index }) => $index * 0.7}s;
  ${({ $shape }) => {
    switch ($shape) {
      case 'circle':
        return `border: 4px solid currentColor; border-radius: 50%;`;
      case 'triangle':
        return `width: 0; height: 0; border-left: 40px solid transparent; border-right: 40px solid transparent; border-bottom: 70px solid currentColor; background: transparent;`;
      case 'square':
        return `border: 4px solid currentColor;`;
      case 'diamond':
        return `border: 4px solid currentColor; transform: rotate(45deg); width: 60px; height: 60px;`;
      case 'cross':
        return `&::before, &::after { content: ''; position: absolute; background: currentColor; }; &::before { width: 4px; height: 80px; left: 39px; top: 0; }; &::after { width: 80px; height: 4px; top: 39px; left: 0; };`;
      default:
        return `border: 4px solid currentColor;`;
    }
  }}
`;

/* ── Data ── */
const showcaseItems = [
  { title: '个人 Wiki 知识库', desc: '基于现代化知识管理系统的个人 Wiki 干台，支持标签分类与快速访问。', href: 'http://wiki.vexrune.top/', shape: 'circle' },
  { title: 'AI Agent 智能体', desc: '自主决策的 AI Agent，理解复杂指令，执行多步骤任务。正在努力中。。。', href: 'https://github.com/vex-rune/vex-owl', shape: 'triangle' },
  { title: 'Esp32 自动网关', desc: '物联网小盒子，基于 ESP32 的 IoT 设备系统，支持设备自组网通信、移动端控制、云端采集与数据可视化。正在努力中。。。', href: 'https://github.com/vex-rune/vex-iotbox', shape: 'square' },
];

/* ── Component ── */
export default function ProjectCards() {
  return (
    <CardRow>
      {showcaseItems.map((item, index) => (
        <CardCell key={item.title} href={item.href} target="_blank" rel="noopener noreferrer">
          <CardTitle>{item.title}</CardTitle>
          <CardDesc>{item.desc}</CardDesc>
          <CardShape $shape={item.shape} $index={index} />
        </CardCell>
      ))}
    </CardRow>
  );
}
