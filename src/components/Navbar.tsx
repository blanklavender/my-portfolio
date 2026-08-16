import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CV_URL, EMAIL, GITHUB, LINKEDIN } from '../links';
import { EmailIcon, GitHubIcon, LinkedInIcon } from './SocialIcons';

const navItems = [
  { name: 'About', to: '/' },
  { name: 'Projects', to: '/projects' },
];

const socials = [
  { label: 'LinkedIn', href: LINKEDIN, Icon: LinkedInIcon },
  { label: 'GitHub', href: GITHUB, Icon: GitHubIcon },
  { label: 'Email', href: `mailto:${EMAIL}`, Icon: EmailIcon },
];

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 navbar-mirror-matte">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3.5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="icon-btn nav-icon"
              >
                <Icon size={28} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5 sm:gap-6">
            {navItems.map((item) => (
              <NavLink key={item.name} to={item.to} end className="nav-link text-base">
                {item.name}
              </NavLink>
            ))}

            <a
              href={"https://drive.google.com/file/d/1vYJ0tsaBFvFXtqgT5e75k_Vxoxu7qsQm/view?usp=drive_link"}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link text-base"
            >
              CV
            </a>

            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              aria-pressed={isDarkMode}
              className="relative inline-flex h-5 w-9 items-center rounded-full flex-shrink-0"
              style={{
                backgroundColor: isDarkMode ? 'rgba(191,198,203,0.2)' : 'rgba(45,45,45,0.2)',
              }}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                className="absolute h-3.5 w-3.5 rounded-full"
                style={{
                  left: isDarkMode ? '1.25rem' : '0.1875rem',
                  backgroundColor: 'var(--accent-silver)',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
