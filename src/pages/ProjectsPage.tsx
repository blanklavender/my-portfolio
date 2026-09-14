import { Link } from 'react-router-dom';
import { Tags } from '../components/ProjectBits';
import { projects } from '../data/projects';

// Display order for the grid; anything not listed goes to the end in data order.
const order = [
  'repas-vision',
  'human-speed-detector',
  'restaurant-recommendation',
  'pitchslapped',
  'industry-emissions-dashboard',
  'baymax',
];
const rank = (slug: string) => {
  const i = order.indexOf(slug);
  return i === -1 ? order.length : i;
};
const visible = projects.filter((project) => !project.hidden).sort((a, b) => rank(a.slug) - rank(b.slug));

const ProjectsPage = () => (
  <section className="py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 className="section-heading">Projects</h2>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {visible.map((project) => (
          <li key={project.slug}>
            <Link to={`/projects/${project.slug}`} className="project-card">
              {/* Domain tags float over the image when there is one, otherwise lead the body */}
              {project.image && (
                <div className="project-card-media">
                  <div className="project-image project-card-image">
                    <img src={project.image.src} alt={project.image.alt} />
                  </div>
                  <div className="project-card-overlay">
                    <Tags items={project.domains} kind="domain" />
                  </div>
                </div>
              )}
              <div className="project-card-body">
                {!project.image && <Tags items={project.domains} kind="domain" />}
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-summary">{project.intro}</p>
                <Tags items={project.stack.slice(0, 4)} kind="stack" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ProjectsPage;
