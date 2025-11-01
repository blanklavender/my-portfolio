interface EducationItem {
  school: string;
  location: string;
  degree: string;
  gpa: string;
  date: string;
}

const Education = () => {
  const educationList: EducationItem[] = [
    {
      school: 'University of California, Davis',
      location: 'Davis, California',
      degree: 'Master of Science in Computer Science',
      gpa: '3.94',
      date: 'Sep. 2024 – Jun 2026',
    },
    {
      school: 'University of Mumbai',
      location: 'Mumbai, India',
      degree: 'Bachelor of Engineering in Computer Engineering (Minor in Artificial Intelligence)',
      gpa: '3.85',
      date: 'Jul 2020 – May 2024',
    },
  ];

  return (
    <section id="education" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" style={{color: 'var(--text-primary)'}}>Education</h2>
        <div className="space-y-6 sm:space-y-8">
          {educationList.map((edu, index) => (
            <div key={index} className="relative metallic-card p-4 sm:p-6 rounded-lg">
              {/* Desktop: Date and GPA in top-right, Mobile: Stack at top */}
              <div className="absolute top-3 right-3 text-right hidden md:block">
                <div style={{color: 'var(--accent-silver)', fontSize: '0.875rem', opacity: 0.9}}>{edu.date}</div>
                <div className="mt-1 text-base font-bold" style={{color: 'var(--accent-silver)', opacity: 0.9}}>GPA: {edu.gpa} / 4.0</div>
              </div>
              {/* Mobile: Stack date and GPA at top */}
              <div className="mb-3 md:hidden">
                <div className="text-sm mb-1" style={{color: 'var(--accent-silver)', opacity: 0.9}}>{edu.date}</div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold md:pr-32" style={{color: 'var(--text-primary)'}}>{edu.school}</h3>
              <p className="mt-1 text-sm sm:text-base" style={{color: 'var(--text-secondary)'}}>{edu.location}</p>
              <p className="mt-2 text-sm sm:text-base" style={{color: 'var(--text-primary)'}}>{edu.degree}</p>
              <div className="mb-3 md:hidden">
                <div className="text-base font-bold pt-2" style={{color: 'var(--accent-silver)', opacity: 0.9}}>GPA: {edu.gpa} / 4.0</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;