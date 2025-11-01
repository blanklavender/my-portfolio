import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme ? storedTheme === 'dark' : prefersDark;

    setIsDarkMode(initialTheme);
    if (!initialTheme) document.documentElement.classList.add('light');
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { name: 'About', to: 'about' },
    { name: 'Education', to: 'education' },
    { name: 'Experience', to: 'experience' },
    { name: 'Projects', to: 'projects' },
    { name: 'Resume', to: 'resume' },
  ];

  const handleNavClick = () => setMobileOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 navbar-mirror-matte">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" aria-label="Home" className="flex-shrink-0">
            <img src="/log_v2.png" alt="logo" className="w-10 h-10 rounded-full object-cover" />
          </a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) =>
              item.name === 'Resume' ? (
                <a
                  key={item.name}
                  href="/mahima_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-base font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.to}
                  spy
                  smooth
                  offset={-64}
                  duration={500}
                  className="px-3 py-2 text-base font-medium cursor-pointer"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.name}
                </Link>
              )
            )}

            {/* Desktop Toggle Button (no Switch) */}
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              aria-pressed={isDarkMode}
              className="relative inline-flex h-6 w-11 items-center rounded-full"
              style={{
                backgroundColor: isDarkMode ? 'rgba(191,198,203,0.2)' : 'rgba(45,45,45,0.2)',
                transition: 'none',
              }}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                className="absolute h-4 w-4 rounded-full"
                style={{
                  left: isDarkMode ? '1.5rem' : '0.25rem',
                  backgroundColor: 'var(--accent-silver)',
                  transition: 'none',
                  willChange: 'auto',
                }}
              />
            </button>
          </div>

          {/* Mobile / Tablet */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Toggle Button (no Switch) */}
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              aria-pressed={isDarkMode}
              className="relative inline-flex h-6 w-11 items-center rounded-full"
              style={{
                backgroundColor: isDarkMode ? 'rgba(191,198,203,0.2)' : 'rgba(45,45,45,0.2)',
                transition: 'none',
              }}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                className="absolute h-4 w-4 rounded-full"
                style={{
                  left: isDarkMode ? '1.5rem' : '0.25rem',
                  backgroundColor: 'var(--accent-silver)',
                  transition: 'none',
                  willChange: 'auto',
                }}
              />
            </button>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center justify-center"
              style={{ width: 40, height: 40, color: 'var(--text-secondary)' }}
            >
              {!mobileOpen ? (
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 z-50">
          <div
            className="mx-4 rounded-2xl shadow-xl"
            style={{
              backgroundColor: isDarkMode ? 'rgba(20,20,20,0.95)' : 'rgba(255,255,255,0.92)',
              border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div className="px-4 py-3">
              {navItems.map((item) =>
                item.name === 'Resume' ? (
                  <a
                    key={item.name}
                    href="/mahima_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 text-base font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={handleNavClick}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.to}
                    spy
                    smooth
                    offset={-64}
                    duration={500}
                    className="block px-3 py-2 text-base font-medium cursor-pointer"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={handleNavClick}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;