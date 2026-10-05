import { EMAIL, GITHUB, LINKEDIN } from '../links';

const Footer = () => (
  <footer className="site-footer wrap section-gap">
    <div className="site-footer-inner flex flex-col sm:flex-row sm:justify-between gap-2">
      <p>
        © {new Date().getFullYear()} Mahima Rudrapati. Inspired by{' '}
        <a href="https://rsms.me/" target="_blank" rel="noopener noreferrer">
          rsms.me
        </a>
      </p>
      <p className="flex gap-4">
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={`mailto:${EMAIL}`}>Email</a>
      </p>
    </div>
  </footer>
);

export default Footer;
