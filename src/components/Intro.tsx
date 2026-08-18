import { EMAIL, GITHUB, HRVIP_LAB, LINKEDIN, PAPER, PILOTCREW, REPAS, UC_DAVIS } from '../links';

const interests = [
  'Algorithm Design and Integration',
  '3D Perception for Robotics; Camera; Imaging',
  'Software Infrastructure and Scalability',
];

const Intro = () => (
  <section className="pt-16 pb-12 sm:pt-20 sm:pb-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_14rem] gap-12 md:gap-16 items-center">
        {/* Left: name, headline, interests, summary */}
        <div className="text-base" style={{ color: 'var(--text-primary)' }}>
          <h1 className="text-3xl sm:text-4xl hero-name">
            <span className="name-first">Mahima</span> <span className="name-last">Rudrapati</span>
          </h1>

          <p className="mt-3">Software Engineer | AI | Computer Vision</p>

          <div className="mt-7">
            <p className="subsection-label">My Broad Interests</p>
            <ul className="mt-2 space-y-1.5">
              {interests.map((interest) => (
                <li
                  key={interest}
                  className="pl-3.5 relative before:content-['•'] before:absolute before:left-0"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 space-y-4">
            <p>
              I am a Master's candidate in Computer Science at {' '}
              <a href={UC_DAVIS} target="_blank" rel="noopener noreferrer" className="text-link">
                University of California, Davis
              </a>  {' '}
              (completing my thesis and graduating in December 2026). 
              I am currently working as a Graduate Student Researcher on a computer vision system for robotic plant health monitoring in space 
              (under <a href={REPAS} target="_blank" rel="noopener noreferrer" className="text-link">
                REPAS
              </a>) 
              at the UC Davis Center for Space Exploration Research. 
              [<a href={HRVIP_LAB} target="_blank" rel="noopener noreferrer" className="text-link">
                HRVIP Lab
              </a>]
            </p>
            <p>
              Last summer, I worked as a Software Engineer at {' '}
              <a href={PILOTCREW} target="_blank" rel="noopener noreferrer" className="text-link">
                Pilotcrew AI
              </a>
              {' '}, an LLM evaluation startup, 
              where I designed and built the product interface along with backend features to be handled in the cloud. 
              Before that, I graduated from the University of Mumbai, India, in 2024 with a bachelor's degree in Computer Engineering 
              and a major in Artificial Intelligence. I also published a {' '}
              <a href={PAPER} target="_blank" rel="noopener noreferrer" className="text-link">
                research paper
              </a>
              {' '} on recommendation systems in IEEE Xplore in 2025.
            </p>
            <p>
              I also love teaching. I have been a teaching assistant at UC Davis for four quarters, teaching computer science, design, and entrepreneurship.
            </p>
            <p>
              I am actively looking for Software Engineering, Machine Learning, and Perception Engineering roles. Happy to connect!
            </p>
          </div>
        </div>

        {/* Right: photo, location, links — centered against the left column */}
        <div className="flex flex-col items-center md:justify-self-end w-full">
          <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden hero-image-circle">
            <img src="/me_lol.JPG" alt="Mahima Rudrapati" className="w-full h-full object-cover" />
          </div>
          <p className="mt-4 text-base font-medium" style={{ color: 'var(--text-secondary)' }}>
            United States
          </p>
          <div className="mt-3 flex items-center gap-4 text-base font-medium">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-link">
              LinkedIn
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-link">
              GitHub
            </a>
            <a href={`mailto:${EMAIL}`} className="text-link">
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Intro;
