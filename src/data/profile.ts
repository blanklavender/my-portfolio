// Résumé facts shown on the home page. Source: 2026_July_Mahima_Resume_ML.pdf.

export const headline = "I'm a software engineer and computer vision researcher living in the United States.";

export const lookingFor = ['Software Engineer', 'ML Engineer', 'Perception Engineer'];

/** Three columns, each split into labelled groups. */
export const skillColumns: { title: string; groups: { label: string; items: string[] }[] }[] = [
  {
    title: 'Software',
    groups: [
      { label: 'Languages', items: ['Python', 'C/C++', 'TypeScript', 'JavaScript', 'SQL', 'HTML/CSS'] },
      {
        label: 'Frameworks',
        items: ['React', 'React Native', 'Node.js', 'Flask', 'FastAPI', 'Django', 'Tailwind CSS'],
      },
    ],
  },
  {
    title: 'ML & perception',
    groups: [
      {
        label: 'Machine learning',
        items: ['PyTorch', 'TensorFlow', 'NumPy', 'scikit-learn', 'LoRA / QLoRA', 'Recommendation systems'],
      },
      {
        label: '3D perception & robotics',
        items: ['OpenCV', 'Open3D', 'NeRF', '3DGS', '3D reconstruction', 'Pose estimation', 'ICP', 'Camera calibration'],
      },
    ],
  },
  {
    title: 'Data & infrastructure',
    groups: [
      { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'] },
      {
        label: 'Systems & tools',
        items: ['Docker', 'Linux', 'AWS', 'Git/GitHub', 'Distributed systems', 'ChatGPT', 'Claude'],
      },
    ],
  },
];
