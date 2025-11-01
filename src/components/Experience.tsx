interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  date: string;
  points: string[];
  link?: string;
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      title: 'Teaching Assistant',
      company: 'University of California, Davis',
      location: 'Davis, CA',
      date: 'Mar 2025 - Dec 2025',
      points: [
        'Taught 100+ students C++, data structures, and object-oriented programming through interactive code demonstrations.',
        'Led weekly office hours to resolve complex algorithmic and runtime issues, guiding students in software design and clean coding practices.',
        'Adapted course materials and assignments based on student performance analytics and feedback.',
      ],
    },
    {
      title: 'Software Engineer - Lead Frontend',
      company: 'Pilotcrew AI',
      location: 'Davis, CA',
      date: 'Jun 2025 - Sep 2025',
      link: 'pilotcrew.ai',
      points: [
        'Built an end-to-end LLM benchmarking interface using React, TypeScript, and Tailwind CSS to support automated and human-evaluated comparisons across 47 large language models in a cross-functional 5-member team.',
        'Optimized query handling through server-side rendering, reducing response latency to under 500ms for 10K+ records.',
        'Developed a parallel chunked file upload architecture with integrated validation, metadata extraction, and pre-processing workflows, enabling stable and consistent 1 GB dataset uploads in under 75s.',
        'Engineered reusable responsive UI components (real-time radial progress bars, data tables) and intuitive guiding tooltip features for continuous LLM performance tracking, enhancing interface interactivity and responsiveness.',
      ],
    },
    {
      title: 'Web Development Intern',
      company: 'Skrapnest',
      location: 'Mumbai, India',
      date: 'Aug 2023 – Nov 2023',
      link: 'skrapnest-prototype.vercel.app',
      points: [
        'Architected and deployed the full-stack prototype for a waste-management platform connecting over 20 scrap dealers and consumers, using React, Firebase, JavaScript, and CSS to deliver a functional MVP that secured $5K in seed funding.',
        'Integrated REST APIs for real-time order management, enabling role-based operations and data synchronization.',
        'Implemented Firebase OTP authentication with validation pipelines, strengthening secure access and data integrity.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" style={{color: 'var(--text-primary)'}}>Experience</h2>
        <div className="space-y-8 sm:space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="metallic-card p-4 sm:p-6 rounded-lg">
              {/* Stack on mobile, row on tablet+ */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                <h3 className="text-lg sm:text-xl font-semibold" style={{color: 'var(--text-primary)'}}>{exp.title}</h3>
                <p className="text-sm sm:text-base md:text-right" style={{color: 'var(--text-secondary)'}}>{exp.date}</p>
              </div>
              <div className="mt-2">
                <p className="text-sm sm:text-base" style={{color: 'var(--text-primary)'}}>
                  {exp.company}
                  {exp.link && (
                    <span className="ml-2">
                      (<a href={`https://${exp.link}`} className="elegant-link" target="_blank" rel="noopener noreferrer">
                        {exp.link}
                      </a>)
                    </span>
                  )}
                </p>
                <p className="text-sm sm:text-base mt-1" style={{color: 'var(--text-secondary)'}}>{exp.location}</p>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.points.map((point, idx) => (
                  <li key={idx} className="text-sm sm:text-base pl-4 relative before:content-['•'] before:absolute before:left-0" style={{color: 'var(--text-secondary)'}}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;