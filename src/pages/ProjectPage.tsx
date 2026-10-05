import { Link, Navigate, useParams } from 'react-router-dom';
import Masthead from '../components/Masthead';
import { Tags, YouTube } from '../components/ProjectBits';
import SideNav from '../components/SideNav';
import { getProject } from '../data/projects';

const Bullets = ({ points }: { points: string[] }) => (
  <ul className="prose-list mt-3">
    {points.map((point) => (
      <li key={point}>{point}</li>
    ))}
  </ul>
);

/** Case-study layout: header facts, then Context / Role / Method / Results / Figures / Stack. */
const ProjectPage = () => {
  const { slug = '' } = useParams();
  const project = getProject(slug);

  if (!project) return <Navigate to="/work" replace />;

  const figures = project.pageImages ?? (project.image ? [project.image] : []);

  const parts = [
    project.context && { id: 'context', label: 'Context & objective' },
    project.contributions.length > 0 && { id: 'role', label: 'Role & scope' },
    project.sections && { id: 'method', label: 'Methodology' },
    project.metrics && { id: 'results', label: 'Results' },
    figures.length > 0 && { id: 'figures', label: 'Figures' },
    { id: 'stack', label: 'Built with' },
  ].filter((part): part is { id: string; label: string } => Boolean(part));

  const facts = [
    { label: 'Role', value: project.role },
    { label: 'When', value: project.period },
    { label: 'Area', value: project.domains.join(', ') },
  ].filter((fact) => fact.value);

  return (
    <>
      <Masthead
        above={
          <p className="text-sm dim">
            <Link to="/work" className="text-link">
              Work
            </Link>{' '}
            / {project.name}
          </p>
        }
        title={project.title}
      />

      <div className="wrap after-masthead">
        <div className="cols">
          <article className="s4 t4">
            <p className="lead">{project.intro}</p>

            <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="label">{fact.label}</dt>
                  <dd className="mt-1">{fact.value}</dd>
                </div>
              ))}
            </dl>

            {project.links && project.links.length > 0 && (
              <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-semibold">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-link">
                    {link.label} ↗
                  </a>
                ))}
              </p>
            )}

            {project.video && (
              <div className="mt-10">
                <YouTube url={project.video} title={`${project.title} demo`} />
              </div>
            )}

            <div className="mt-14 space-y-14">
              {project.context && (
                <section id="context" className="anchor">
                  <h2 className="section-heading">Context & objective</h2>
                  <p className="mt-3 secondary">{project.context}</p>
                </section>
              )}

              {project.contributions.length > 0 && (
                <section id="role" className="anchor">
                  <h2 className="section-heading">Role & scope</h2>
                  <Bullets points={project.contributions} />
                </section>
              )}

              {project.sections && (
                <section id="method" className="anchor">
                  <h2 className="section-heading">Methodology</h2>
                  <div className="mt-6 space-y-10">
                    {project.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="font-semibold">{section.title}</h3>
                        {section.video && (
                          <div className="mt-3">
                            <YouTube url={section.video} title={`${project.title} — ${section.title}`} />
                          </div>
                        )}
                        <Bullets points={section.points} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {project.metrics && (
                <section id="results" className="anchor">
                  <h2 className="section-heading">Results</h2>
                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.metrics.map((m) => (
                      <li key={m.label} className="metric">
                        <p className="metric-value">{m.value}</p>
                        <p className="text-sm secondary">{m.label}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {figures.length > 0 && (
                <section id="figures" className="anchor">
                  <h2 className="section-heading">Figures</h2>
                  <div className="mt-5 space-y-4">
                    {figures.map((img) => (
                      <figure key={img.src}>
                        <div className="figure">
                          <img src={img.src} alt={img.alt} />
                        </div>
                        <figcaption className="mt-2 text-sm dim">{img.alt}</figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              <section id="stack" className="anchor">
                <h2 className="section-heading">Built with</h2>
                <div className="mt-4">
                  <Tags items={project.stack} />
                </div>
              </section>
            </div>
          </article>

          <aside className="s2 t4 page-aside">
            <SideNav items={parts} label="On this page" />
          </aside>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
