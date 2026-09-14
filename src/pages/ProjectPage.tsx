import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Tags, YouTube } from '../components/ProjectBits';
import { getProject } from '../data/projects';

const Bullets = ({ points }: { points: string[] }) => (
  <ul className="mt-2 space-y-2">
    {points.map((point) => (
      <li
        key={point}
        className="pl-3.5 relative before:content-['•'] before:absolute before:left-0"
        style={{ color: 'var(--text-secondary)' }}
      >
        {point}
      </li>
    ))}
  </ul>
);

const ProjectPage = () => {
  const { slug = '' } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/projects" replace />;

  const pageImages = project.pageImages ?? (project.image ? [project.image] : []);

  return (
    <section className="py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link to="/projects" className="text-link text-sm">
          ← Projects
        </Link>

        <div className="mt-6">
          <Tags items={project.domains} kind="domain" />
        </div>
        <p className="project-card-meta mt-3">{project.period}</p>
        <h1 className="text-2xl sm:text-3xl mt-1" style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h1>
        <p className="mt-2 text-base" style={{ color: 'var(--text-secondary)' }}>
          {project.intro}
        </p>

        {project.links && project.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-4 text-base">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-link">
                {link.label} ↗
              </a>
            ))}
          </div>
        )}

        {project.video && (
          <div className="mt-8">
            <YouTube url={project.video} title={`${project.title} demo`} />
          </div>
        )}

        {pageImages.length > 0 && (
          <div className="mt-8 space-y-4">
            {pageImages.map((img) => (
              <div key={img.src} className="project-image project-page-image">
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-base">
          {project.sections ? (
            <div className="space-y-10">
              {project.sections.map((section) => (
                <div key={section.title}>
                  <h2 className="subsection-label">{section.title}</h2>
                  {section.video && (
                    <div className="mt-3">
                      <YouTube url={section.video} title={`${project.title} — ${section.title}`} />
                    </div>
                  )}
                  <Bullets points={section.points} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="subsection-label">What I did</p>
              <Bullets points={project.contributions} />
            </>
          )}
        </div>

        <div className="mt-8">
          <p className="subsection-label">Built with</p>
          <div className="mt-2">
            <Tags items={project.stack} kind="stack" />
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProjectPage;
