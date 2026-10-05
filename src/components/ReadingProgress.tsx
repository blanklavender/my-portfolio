import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/** Thin faint-orange bar along the top edge that fills as the reader scrolls down the page. */
const ReadingProgress = () => {
  const { pathname } = useLocation();
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      // Set the style directly: no re-render on every scroll event
      bar.current?.style.setProperty('--progress', String(progress));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  return <div ref={bar} className="reading-progress" aria-hidden="true" />;
};

export default ReadingProgress;
