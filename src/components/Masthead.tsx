import type { CSSProperties, ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const items = [
  { to: '/', label: '●', match: (p: string) => p === '/' },
  { to: '/work', label: 'Work', match: (p: string) => p.startsWith('/work') },
  { to: '/blogs', label: 'Blogs', match: (p: string) => p.startsWith('/blogs') },
  { to: '/contact', label: 'Contact', match: (p: string) => p.startsWith('/contact') },
];

// Only listed while you're on it; the way in is the "more" link in the footer.
const more = { to: '/more', label: 'more', match: (p: string) => p.startsWith('/more') };

const Menu = () => {
  const { pathname } = useLocation();
  const shown = more.match(pathname) ? [...items, more] : items;
  // The menu slides so the current item lines up with the page title (see .menu-items).
  const focus = Math.max(0, shown.findIndex((item) => item.match(pathname)));

  return (
    <nav className="menu s2 t2" aria-label="Main">
      <div className="menu-items" style={{ '--focus': focus } as CSSProperties}>
        {shown.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={i === 0}
            className={i === 0 ? 'menu-dot' : item === more ? 'menu-more' : undefined}
            aria-label={i === 0 ? 'Home' : undefined}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

/** Page title on the left, stacked menu on the right; the title block is the same size on every page. */
const Masthead = ({ title, above, avatar }: { title: ReactNode; above?: ReactNode; avatar?: ReactNode }) => {
  // Keyed by path so the title fades in again on every page, including project to project
  const { pathname } = useLocation();

  return (
    <header className="wrap">
      <div className="cols masthead">
        <div className="s4 t2 masthead-title">
          {above && <div className="masthead-above">{above}</div>}
          {avatar}
          <h1 key={pathname} className="page-title">
            {title}
          </h1>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Masthead;
