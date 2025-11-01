import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="about" className="flex items-center justify-center" style={{minHeight: '100vh', height: '100vh'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl hero-name">
              <span className="name-levitate">Mahima Rudrapati</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg max-w-xl" style={{color: 'var(--text-secondary)'}}>
              Full Stack Developer | Computer Vision Researcher
            </p>

            <div className="mt-6 flex items-center space-x-4">
              <a className="icon-btn hover:opacity-80 transition-all hover:scale-110" href="https://linkedin.com/in/mahima-rudrapati" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{color: 'var(--accent-silver)'}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="2" fill="currentColor" fillOpacity="0.05"/>
                  <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.9 0 3.4 1.26 3.4 3.95V19z" fill="currentColor" fillOpacity="0.85"/>
                </svg>
              </a>
              <a className="icon-btn hover:opacity-80 transition-all hover:scale-110" href="https://github.com/blanklavender" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{color: 'var(--accent-silver)'}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="2" fill="currentColor" fillOpacity="0.05"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.917.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor" fillOpacity="0.85"/>
                </svg>
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="hero-image-container">
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full metallic-card flex items-center justify-center overflow-hidden hero-image-circle" style={{borderRadius: '9999px'}}>
                <img src="/me_lol.JPG" alt="Mahima Rudrapati" className="w-full h-full object-cover" />
              </div>
              <div className="hero-image-shadow"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;