import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
