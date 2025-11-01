import { Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check initial theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme ? storedTheme === 'dark' : prefersDark;
    
    setIsDarkMode(initialTheme);
    if (!initialTheme) {
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
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

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 navbar-mirror-matte">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* replaceable logo/icon */}
            <a href="#" aria-label="Home">
              <img src="/log_v2.png" alt="logo" className="w-10 h-10 rounded-full object-cover" />
            </a>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                item.name === 'Resume' ? (
                  <a 
                    key={item.name} 
                    href="/mahima_resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cursor-pointer px-3 py-2 rounded-md text-base font-medium transition-colors"
                    style={{color: 'var(--text-secondary)'}}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-silver)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-64}
                    duration={500}
                    className="cursor-pointer px-3 py-2 rounded-md text-base font-medium transition-colors"
                    style={{color: 'var(--text-secondary)'}}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-silver)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Switch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(191, 198, 203, 0.2)' : 'rgba(45, 45, 45, 0.2)'
                }}
              >
                <span className="sr-only">Toggle dark mode</span>
                <span
                  className={`${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full transition-all`}
                  style={{
                    backgroundColor: isDarkMode ? 'var(--accent-silver)' : 'var(--accent-silver)'
                  }}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;