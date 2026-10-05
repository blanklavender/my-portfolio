import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BackToTop from './BackToTop';
import Footer from './Footer';
import ReadingProgress from './ReadingProgress';

const Layout = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    // The "more" page has its own light lavender, all-lowercase look (see html.page-more)
    document.documentElement.classList.toggle('page-more', pathname.startsWith('/more'));
  }, [pathname]);

  return (
    <div className="frame min-h-screen flex flex-col">
      <ReadingProgress />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
