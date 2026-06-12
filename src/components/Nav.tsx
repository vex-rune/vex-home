import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  background: var(--color-surface-alpha);
  backdrop-filter: blur(12px);
  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const Logo = styled.a`
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-text);
  text-decoration: none;
  cursor: pointer;
  &:hover { color: var(--color-text-inverse); background: var(--color-interactive); }
`;

const Links = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 0.85rem;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 200px;
    height: 100vh;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 72px 0 32px;
    background: var(--color-surface-alpha);
    backdrop-filter: blur(12px);
    border-left: 1px solid var(--color-border);
    transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
    transition: transform 0.3s ease;
    z-index: 200;
  }
`;

const Link = styled.a`
  padding: 8px 16px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 1rem;
  &:hover { color: var(--color-text-inverse); background: var(--color-interactive); }
`;

const ThemeBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 1.1rem;
  color: var(--color-text);
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: var(--color-text-inverse); background: var(--color-interactive); }
`;

const MenuToggle = styled.button<{ $open: boolean }>`
  display: none;
  width: 36px;
  height: 36px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 300;
  span {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--color-text);
    transition: transform 0.3s, opacity 0.3s;
  }
  @media (max-width: 768px) {
    display: flex;
  }
  ${({ $open }) =>
    $open &&
    `
    span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  `}
`;

const Overlay = styled.div<{ $open: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: var(--color-overlay);
    z-index: 150;
  }
`;

export default function Nav() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <NavBar>
        <Logo onClick={() => navigate('/')}>主页</Logo>
        <MenuToggle $open={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </MenuToggle>
        <Links $open={menuOpen}>
          <Link href="/about" onClick={handleLinkClick}>关于我</Link>
          <Link href="/#showcase" onClick={handleLinkClick}>程序</Link>
          <Link href="https://wiki.vexrune.top/" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>博客</Link>
          <Link href="https://github.com/vex-rune" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>GitHub</Link>
          <ThemeBtn onClick={toggle} aria-label="切换主题">
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </ThemeBtn>
        </Links>
      </NavBar>
      <Overlay $open={menuOpen} onClick={() => setMenuOpen(false)} />
    </>
  );
}

/* ── About 页专用返回按钮 ── */
const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--color-interactive);
  border: none;
  color: var(--color-text-inverse);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.7; }
`;

export function AboutNav() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  return (
    <NavBar>
      <Logo>VEX</Logo>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <ThemeBtn onClick={toggle} aria-label="切换主题">
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </ThemeBtn>
        <BackButton onClick={() => navigate('/')}>
          ← 返回
        </BackButton>
      </div>
    </NavBar>
  );
}
