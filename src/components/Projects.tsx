interface ProjectItem {
  title: string;
  description: string;
  points: string[];
  url?: string; // optional clickable link (replaceable)
}

const Projects = () => {
  const projects: ProjectItem[] = [
    {
      title: 'Restaurant Recommendation System using ML Algorithms and Web Scraping',
      description: '(First Author - IEEE Xplore Publication)',
      url: '#',
      points: [
        'Led a team of 4 to build a scalable ML-driven recommendation platform with React, PostgreSQL, Flask, and Python.',
        'Designed and deployed RESTful APIs with ERDs/DFDs to perform CRUD operations over 10K+ restaurants and reviews.',
        'Implemented real-time scraping pipelines using Selenium and Botasaurus, achieving 300 record updates in 90s.',
        'Applied NLP pipelines for opinion mining, user reliability and feature extraction to enrich user sentiment modeling.',
        'Integrated collaborative and content-based filtering using using tag-profiled embeddings to improve accuracy.',
      ],
    },
    {
      title: 'Autonomous Vision System for Space Robotics',
      description: '(Computer Vision)',
      url: '#',
      points: [
        'Built a Python-based visual localization pipeline using AprilTags and RGB-D camera SDKs for an autonomous robot vision system designed to guide precise plant growth in space, reaching under sub-0.2 px reprojection error after calibration.',
        'Processed 3D point clouds using OpenCV, Open3D, and C++, reaching over 95% geometric estimation alignment.',
        'Deployed Meta SAM and NVIDIA FoundationPose models for segmenting growing plants, enabling dynamic perception.',
      ],
    },
    {
      title: 'Data Visualization of Green House Gas Emissions in America',
      description: '(Data Science, UI&UX Design)',
      url: '#',
      points: [
        'Built an interactive D3.js and React-based data visualization dashboard that analyzed over 500K CO/kg emission records across multiple industrial sectors to identify and compare key emission contributors.',
        'Engineered drill-down visual analytics (hierarchical bubbles, stacked bars, pie charts) to surface insights.',
      ],
    },
  ];

  return (
    <section id="projects" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" style={{color: 'var(--text-primary)'}}>Projects</h2>
        <div className="space-y-8 sm:space-y-12">
          {projects.map((project, index) => (
            <div key={index} className="metallic-card p-4 sm:p-6 rounded-lg">
              {/* Stack on mobile, flex row on tablet+ */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold" style={{color: 'var(--text-primary)'}}>{project.title}</h3>
                  <p className="mt-1 text-sm sm:text-base" style={{color: 'var(--text-secondary)'}}>{project.description}</p>
                </div>
                {project.url && (
                  <div className="md:ml-auto mt-2 md:mt-0">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="elegant-link text-sm sm:text-base"
                    >
                      View Project
                    </a>
                  </div>
                )}
              </div>
              <ul className="mt-4 space-y-2">
                {project.points.map((point, idx) => (
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

export default Projects;