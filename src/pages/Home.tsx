import { Link } from 'react-router-dom';
import Masthead from '../components/Masthead';
import { Tags } from '../components/ProjectBits';
import Timeline from '../components/Timeline';
import { headline, lookingFor, skillColumns } from '../data/profile';
import { EmailIcon, GitHubIcon, LinkedInIcon } from '../components/SocialIcons';
import { CV_URL, EMAIL, GITHUB, HRVIP_LAB, LINKEDIN, PAPER, PILOTCREW, REPAS, UC_DAVIS } from '../links';
// Only a 112px copy is shipped (2x the 56px circle), so there is no large photo to open or save.
import photo from '../assets/mahima-avatar.jpg';

const Home = () => (
  <>
    <Masthead
      title="Hello, I'm Mahima Rudrapati"
      avatar={
        <span
          role="img"
          aria-label="Mahima Rudrapati"
          className="avatar"
          style={{ backgroundImage: `url(${photo})` }}
          onContextMenu={(e) => e.preventDefault()}
        />
      }
    />

    {/* Introduction in the first four columns; summary, roles and links under the menu */}
    <section className="wrap after-masthead">
      <div className="cols">
        <div className="s4 t2 intro lead-body">
          <p>
            I'm a Master's student in Computer Science at{' '}
            <a href={UC_DAVIS} target="_blank" rel="noopener noreferrer" className="text-link">
              UC Davis
            </a>
            , finishing my thesis and graduating in December 2026. Most of my days are spent in the{' '}
            <a href={HRVIP_LAB} target="_blank" rel="noopener noreferrer" className="text-link">
              HRVIP Lab
            </a>{' '}
            at the Center for Spaceflight Research, building the eyes for{' '}
            <a href={REPAS} target="_blank" rel="noopener noreferrer" className="text-link">
              REPAS
            </a>
            , a robot that looks after plants in a space habitat. It finds its way around hydroponic trays with
            AprilTags and pose estimation, measures how tall the canopy has grown to within two centimetres using
            depth alone, and rebuilds each plant in 3D so its growth can be followed day by day.
          </p>
          <p>
            Before UC Davis I studied Computer Engineering with a minor in AI at the University of Mumbai, where I
            led a team of four and published a first-author{' '}
            <a href={PAPER} target="_blank" rel="noopener noreferrer" className="text-link">
              paper on restaurant recommendation
            </a>{' '}
            in IEEE Xplore. Last summer I built LLM evaluation infrastructure on AWS at{' '}
            <a href={PILOTCREW} target="_blank" rel="noopener noreferrer" className="text-link">
              Pilotcrew AI
            </a>
            . What ties it together is a liking for the place where algorithms meet messy, real-world data:
            geometry, learning, and the systems that keep them fast and dependable. I also teach, helping more than
            a hundred students through C++, data structures and object-oriented programming as a TA.
          </p>
        </div>

        <div className="s2 t2">
          <p className="lead">{headline}</p>
          <div className="social mt-4">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon size={24} />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon size={24} />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email">
              <EmailIcon size={24} />
            </a>
          </div>
          <div className="callout mt-6">
            Open to full-time roles as {lookingFor.slice(0, -1).join(', ')} or {lookingFor.at(-1)}, from December
            2026. <Link to="/contact">Get in touch →</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-2">
            <Link to="/work" className="quick-link">
              <small>Research & projects</small>
              Go to work →
            </Link>
            <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="quick-link">
              <small>One page, PDF</small>
              View CV →
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Skills in three classified columns */}
    <section className="wrap section-gap">
      <h2 className="section-heading">Skills & tools</h2>
      <div className="cols mt-6">
        {skillColumns.map((column) => (
          <div key={column.title} className="s2 t2">
            <h3 className="font-semibold">{column.title}</h3>
            <div className="mt-4">
              {column.groups.map((group) => (
                <div key={group.label} className="skill-group">
                  <p className="label">{group.label}</p>
                  <Tags items={group.items} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Light grey band with the scrollable timeline */}
    <section className="band section-gap band-pad">
      <div className="wrap">
        <div className="cols">
          <div className="s2 t4">
            <h2 className="section-heading">Timeline</h2>
            <p className="mt-2 text-sm dim">Awards, papers and milestones, newest first.</p>
          </div>
          <div className="s4 t4">
            <Timeline />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Home;
