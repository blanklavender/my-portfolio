import { Link } from 'react-router-dom';
import { EMAIL, GITHUB, LINKEDIN } from '../links';

const Footer = () => (
  <footer className="site-footer wrap section-gap">
    <div className="site-footer-inner flex flex-col sm:flex-row sm:justify-between gap-2">
      <p>
        © {new Date().getFullYear()} Mahima Rudrapati. Inspired by{' '}
        <a href="https://rsms.me/" target="_blank" rel="noopener noreferrer">
          rsms.me
        </a>
        <br />
        <span className="dim">Last updated Oct 5, 2026</span>
      </p>
      <p className="flex items-baseline gap-4">
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={`mailto:${EMAIL}`}>Email</a>
        {/* Already on /more the route doesn't change, so scroll up here too */}
        <Link to="/more" className="footer-more" onClick={() => window.scrollTo({ top: 0 })}>
          more
        </Link>
      </p>
    </div>
  </footer>
);

export default Footer;
