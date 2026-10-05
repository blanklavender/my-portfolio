import { useEffect, useState } from 'react';

/** Id of the section currently nearest the top of the viewport. */
const useScrollSpy = (idList: string[]) => {
  // Joined so a fresh array with the same ids does not re-subscribe.
  const key = idList.join(' ');
  const [active, setActive] = useState(idList[0]);

  useEffect(() => {
    const ids = key.split(' ');
    const onScroll = () => {
      // At the very bottom the last section may never reach the top; select it anyway.
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        setActive(ids[ids.length - 1]);
        return;
      }
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.3) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [key]);

  return active;
};

/** Vertical in-page tabs; each one jumps to its section. */
const SideNav = ({ items, label }: { items: { id: string; label: string }[]; label: string }) => {
  const active = useScrollSpy(items.map((item) => item.id));

  return (
    <nav className="sidenav" aria-label={label}>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} className={item.id === active ? 'active' : undefined}>
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default SideNav;
