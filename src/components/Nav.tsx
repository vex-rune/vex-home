import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  background: rgba(248, 245, 240, 0.9);
  backdrop-filter: blur(12px);
`;

const Logo = styled.a`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #111;
  text-decoration: none;
  cursor: pointer;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 0.85rem;
`;

const Link = styled.a`
  color: #111;
  text-decoration: none;
  &:hover { color: #555; }
`;

export default function Nav() {
  const navigate = useNavigate();

  return (
    <NavBar>
      <Logo onClick={() => navigate('/')}>VEX</Logo>
      <Links>
        <Link href="#showcase">Build</Link>
        <Link href="https://wiki.vexrune.top/" target="_blank" rel="noopener noreferrer">Blog</Link>
        <Link href="https://github.com/vex-rune" target="_blank" rel="noopener noreferrer">GitHub</Link>
      </Links>
    </NavBar>
  );
}

/* ── About 页专用返回按钮 ── */
const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #000;
  border: none;
  color: #f8f5f0;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.7; }
`;

export function AboutNav() {
  const navigate = useNavigate();

  return (
    <NavBar>
      <Logo>VEX</Logo>
      <BackButton onClick={() => navigate('/')}>
        ← 返回
      </BackButton>
    </NavBar>
  );
}
