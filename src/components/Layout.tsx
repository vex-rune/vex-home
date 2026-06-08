import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Nav from './Nav';

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f8f5f0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #111;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 100px 40px 40px;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 32px 24px;
  font-size: 0.75rem;
  color: #999;
  border-top: 1px solid #111;
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
      <Nav />
      <Main>
        <Outlet />
      </Main>
      <Footer>© 2024 VEX</Footer>
    </Wrapper>
  );
}
