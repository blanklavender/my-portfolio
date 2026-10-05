import { Link } from 'react-router-dom';
import Contributions from '../components/Contributions';
import Masthead from '../components/Masthead';
import SideNav from '../components/SideNav';
import { projects, type Project } from '../data/projects';

// Display order within each section; anything not listed goes last in data order.
const order = [
  'repas-vision',
  'restaurant-recommendation',
  'human-speed-detector',
  'pitchslapped',
  'industry-emissions-dashboard',
  'baymax',
  'skrapnest',
];
const rank = (slug: string) => {
  const i = order.indexOf(slug);
  return i === -1 ? order.length : i;
};
const listed = projects.filter((p) => !p.hidden).sort((a, b) => rank(a.slug) - rank(b.slug));
const research = listed.filter((p) => p.kind === 'research');
const builds = listed.filter((p) => p.kind === 'project');

const sections = [
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'open-source', label: 'Open source' },
];

/** Lowercase title, one-line summary, quiet meta. */
const Entries = ({ items }: { items: Project[] }) => (
  <ul className="mt-5 split2">
    {items.map((p) => (
      <li key={p.slug}>
        <Link to={`/work/${p.slug}`} className="entry">
          <span className="entry-title">{p.name}</span>
          <span className="entry-body block">{p.intro}</span>
          <span className="entry-meta block">
            {p.period} · {p.domains.join(', ')}
          </span>
        </Link>
      </li>
    ))}
  </ul>
);

const Work = () => (
  <>
    <Masthead title="Teaching robots to see, one point cloud at a time" />

    <div className="wrap after-masthead">
      <div className="cols">
        <div className="s4 t4 space-y-16 work-main">
          <section id="research" className="anchor">
            <h2 className="section-heading">Research</h2>
            <Entries items={research} />
          </section>

          <section id="projects" className="anchor">
            <h2 className="section-heading">Projects</h2>
            <Entries items={builds} />
          </section>

          <section id="open-source" className="anchor">
            <h2 className="section-heading">Open source</h2>
            <p className="mt-2 secondary">What my GitHub looked like over the last twelve months.</p>
            <div className="mt-5">
              <Contributions />
            </div>
          </section>
        </div>

        <aside className="s2 t4 page-aside">
          <SideNav items={sections} label="Sections" />
        </aside>
      </div>
    </div>

    {/* Same card style as the home page's quick links, pointing on to the blog */}
    <section className="wrap pre-footer">
      <div className="cols">
        <div className="s2 t2 grid grid-cols-2 gap-2">
          <Link to="/blogs" className="quick-link">
            <small>Notes & write-ups</small>
            Go to blogs →
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Work;
