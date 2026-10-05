import type { CSSProperties, ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const items = [
  { to: '/', label: '●', match: (p: string) => p === '/' },
  { to: '/work', label: 'Work', match: (p: string) => p.startsWith('/work') },
  { to: '/contact', label: 'Contact', match: (p: string) => p.startsWith('/contact') },
];

const Menu = () => {
  const { pathname } = useLocation();
  // The menu slides so the current item lines up with the page title (see .menu-items).
  const focus = Math.max(0, items.findIndex((item) => item.match(pathname)));

  return (
    <nav className="menu s2 t2" aria-label="Main">
      <div className="menu-items" style={{ '--focus': focus } as CSSProperties}>
        {items.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={i === 0}
            className={i === 0 ? 'menu-dot' : undefined}
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
const Masthead = ({ title, above, avatar }: { title: ReactNode; above?: ReactNode; avatar?: ReactNode }) => (
  <header className="wrap">
    <div className="cols masthead">
      <div className="s4 t2 masthead-title">
        {above && <div className="masthead-above">{above}</div>}
        {avatar}
        <h1 className="page-title">{title}</h1>
      </div>
      <Menu />
    </div>
  </header>
);

export default Masthead;
