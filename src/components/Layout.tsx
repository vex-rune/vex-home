import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import BackgroundAnimation from './BackgroundAnimation';

const Wrapper = styled.div`
  min-height: 100vh;
  background: transparent;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 100px 40px 40px;
  @media (max-width: 768px) {
    padding: 80px 16px 24px;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 32px 24px;
  font-size: 0.75rem;
  color: var(--color-text-muted);
`;

export default function Layout() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      window.scrollTo(0, 0);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <Wrapper>
      <BackgroundAnimation />
      <Nav />
      <Main>
        <Outlet />
      </Main>
      <Footer>© 2026 VEX</Footer>
    </Wrapper>
  );
}
