import { PAPER, REPAS } from '../links';
import baymaxImg from '../assets/projects/baymax.jpg';
import emissionsImg from '../assets/projects/industry-emissions.png';
import pitchSlappedImg from '../assets/projects/pitch-slapped.png';
import repasImg from '../assets/projects/repas.png';
import restaurantImg from '../assets/projects/restaurant.png';
import skrapnestImg from '../assets/projects/skrapnest.png';
import speedImg from '../assets/projects/speed.png';
import speedDetect1Img from '../assets/projects/speed-detect-1.png';
import speedDetect2Img from '../assets/projects/speed-detect-2.png';

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectSection {
  title: string;
  /** YouTube link for this part of the work; left empty until the video is up. */
  video?: string;
  points: string[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  /** Short lowercase name used in the Work listing. */
  name: string;
  /** Which Work section the project is listed under. */
  kind: 'research' | 'project';
  title: string;
  /** What I was on the project, shown in the page header. */
  role?: string;
  /** Why the project exists; the Context section of the project page. */
  context?: string;
  /** Headline numbers for the Results section of the project page. */
  metrics?: Metric[];
  /** One short line shown on the card and at the top of the project page. */
  intro: string;
  /** Domain tags (blue). */
  domains: string[];
  /** When it was done. */
  period: string;
  /** Tech stack tags (purple). */
  stack: string[];
  /** Bullet points of what I did. Used when the project has no sections. */
  contributions: string[];
  /** Optional breakdown into separate tasks, each with its own bullets and video. */
  sections?: ProjectSection[];
  /** Keep the entry but leave it off the projects grid. */
  hidden?: boolean;
  /** Card thumbnail, and the page image unless pageImages overrides it. */
  image?: ProjectImage;
  /** Images shown on the project page instead of `image`. */
  pageImages?: ProjectImage[];
  /** YouTube link embedded at the top of the project page. */
  video?: string;
  links?: { label: string; href: string }[];
}

// Ordered roughly by how much I would want someone to read first.
export const projects: Project[] = [
  {
    slug: 'repas-vision',
    name: 'space farming vision',
    kind: 'research',
    role: 'Graduate Student Researcher, HRVIP Lab',
    context:
      'REPAS studies how robots can farm on their own during long-duration missions, as part of NASA space-habitat research at the UC Davis Center for Spaceflight Research. The robot has to find the hydroponic trays, measure each plant and track its growth over days, with no person checking the readings. I work with agriculturists and engineers to build the perception pipeline that does this from RGB-D cameras.',
    metrics: [
      { value: '< 2 cm', label: 'canopy height error' },
      { value: '> 95%', label: 'alignment between 3D captures' },
      { value: '< 0.2 px', label: 'camera reprojection error' },
    ],
    title: 'CV Pipeline for Autonomous Space Farming',
    intro: 'Robot vision pipeline that tracks plant growth in a space habitat from RGB-D cameras, built as a Graduate Student Researcher at the HRVIP Lab, UC Davis.',
    domains: ['Research', 'Computer Vision', '3D'],
    period: '2025 – present',
    stack: ['Python', 'C++', 'OpenCV', 'Open3D', 'RGB-D cameras', 'AprilTags', 'Meta SAM', 'FoundationPose'],
    contributions: [],
    sections: [
      {
        title: 'Depth-based canopy detection',
        video: 'https://youtu.be/DAvp9Ysx8B8',
        points: [
          'Estimated plant canopy height purely from depth and geometry, with no learned model, reaching under 2 cm accuracy.',
          'Processed RGB-D point clouds with OpenCV, Open3D and C++, aligning depth to the tray plane before measuring.',
          'Segmented growing plants with Meta SAM so the height estimate follows each plant as it changes shape.',
        ],
      },
      {
        title: '3D reconstruction',
        video: 'https://youtu.be/EmaQUnxhkIc',
        points: [
          'Reconstructed the plant tray in 3D from multiple RGB-D views, reaching over 95% geometric alignment between captures.',
          'Built visualization and analysis tooling so growth can be compared across days from the reconstructed scene.',
        ],
      },
      {
        title: 'Hydroponic system localization',
        video: 'https://youtu.be/tTbrA0p8VvM',
        points: [
          'Built the visual localization pipeline with AprilTags and RGB-D camera SDKs so the robot can place itself relative to the growth trays.',
          'Calibrated the cameras to under 0.2 px reprojection error.',
          'Used NVIDIA FoundationPose for 6-DoF pose of tray components to keep localization stable between visits.',
        ],
      },
    ],
    image: { src: repasImg, alt: 'REPAS robot vision output over a hydroponic plant tray' },
    pageImages: [],
    links: [{ label: 'Official REPAS site', href: REPAS }],
  },
  {
    slug: 'realign',
    name: 'realign',
    kind: 'project',
    role: 'Fine-tuning and evaluation',
    metrics: [
      { value: '80.1%', label: 'model accuracy' },
      { value: 'r ≈ 0.02', label: 'alignment vs. correctness' },
    ],
    hidden: true,
    title: 'ReAlign',
    intro: 'Scores the reasoning quality of a fine-tuned math LLM, not just whether the final answer is right.',
    domains: ['LLM fine-tuning', 'Evaluation'],
    period: '2026',
    stack: ['Python', 'PyTorch', 'DeepSeek-Math-7B', 'LoRA', 'QLoRA', 'BFloat16', 'Apple Silicon'],
    contributions: [
      'Fine-tuned DeepSeek-Math-7B on a custom dataset, in native BFloat16 on an M4 Max and again with QLoRA, and compared the two.',
      'Runs took about two days each, so I set up remote access to the lab GPU and kept them running unattended.',
      'Built the evaluation harness and benchmark used to compare configurations; the model reached 80.1% accuracy.',
      'ReAlign aligns a model\'s reasoning trace with a reference solution using semantic embeddings and dynamic programming; we found alignment and correctness almost uncorrelated (r ≈ 0.02).',
    ],
  },
  {
    slug: 'restaurant-recommendation',
    name: 'restaurant recommender',
    kind: 'research',
    role: 'First author; led a team of 4',
    context:
      'Restaurant apps rank places by star ratings that hide what reviewers actually said. The aim was a recommender that reads live reviews, works out what people liked or disliked, weighs reviewers by how reliable they are, and matches that against what the user cares about. The work was published at DABCon 2024 (IEEE Xplore).',
    metrics: [
      { value: '75%', label: 'faster scraping than Selenium' },
      { value: '10K+', label: 'restaurant and review records' },
    ],
    title: 'Restaurant Recommendation System',
    intro: 'ML-driven restaurant recommendations built on live-scraped reviews; first-author paper in IEEE Xplore.',
    domains: ['Research paper', 'Web app', 'ML', 'Web scraping'],
    period: '2023 – 2025',
    stack: ['Python', 'Flask', 'React', 'PostgreSQL', 'Selenium', 'Botasaurus', 'NLP'],
    contributions: [
      'Architected and led a team of four for about a year, from data collection through to a working web app.',
      'Built scraping pipelines, first with Selenium and later Botasaurus, fast enough to scrape live while a user waits.',
      'Designed the PostgreSQL schema (ERDs/DFDs) and Flask REST API; built the React UI.',
      'Combined collaborative and content-based filtering over tag-profiled embeddings.',
      'Added an NLP pipeline for opinion mining and feature extraction, weighting reviewers by a reliability score.',
    ],
    image: { src: restaurantImg, alt: 'Restaurant recommendation web app showing ranked results' },
    links: [{ label: 'Paper on IEEE Xplore', href: PAPER }],
  },
  {
    slug: 'skrapnest',
    name: 'skrapnest',
    kind: 'project',
    role: 'Web development intern',
    metrics: [
      { value: '$5K', label: 'seed funding raised' },
      { value: '20+', label: 'scrap dealers connected' },
    ],
    title: 'Skrapnest',
    intro: 'Full-stack MVP for a scrap-collection marketplace that went on to raise $5K in seed funding.',
    domains: ['Internship', 'Startup', 'Web app', 'Supply chain'],
    period: 'Aug – Nov 2023',
    stack: ['React', 'Firebase', 'JavaScript', 'SQL', 'CSS'],
    contributions: [
      'Architected and deployed the full-stack prototype connecting over 20 scrap dealers and consumers.',
      'Integrated REST APIs for real-time order management with role-based operations for dealers and customers.',
      'Implemented Firebase OTP authentication with validation pipelines.',
    ],
    image: { src: skrapnestImg, alt: 'Skrapnest order dashboard' },
  },
  {
    slug: 'pitchslapped',
    name: 'pitchslapped',
    kind: 'project',
    role: 'Hackathon build',
    title: 'PitchSlapped',
    intro: 'A virtual Shark Tank: pitch out loud to three AI judges and get a scored report card.',
    domains: ['Hackathon', 'Voice AI', 'Web app'],
    period: '2026',
    stack: ['React', 'Vite', 'React Router', 'ElevenLabs Conversational AI', 'Claude API', 'Node.js', 'Express', 'CSS'],
    contributions: [
      'Real-time voice over an ElevenLabs Conversational AI WebSocket with bidirectional audio streaming.',
      'One agent role-plays all three judges using speaker tags, parsed on the frontend to attribute turns and light up the right judge.',
      'Claude extracts a running pitch summary during the session and generates the structured report card at the end.',
      'React + Vite multi-page flow (Landing → Pitch Prep → Pitch Room → Report) with hand-written CSS for judge speaking states.',
      'Ref-based transcript accumulation merged with the in-progress transcript for a live text view.',
      'Node/Express server that mints ElevenLabs tokens and proxies evaluation requests to Claude.',
    ],
    image: { src: pitchSlappedImg, alt: 'PitchSlapped pitch room with three judge panels' },
    pageImages: [],
    video: 'https://youtu.be/7fmk6_BBZTY',
  },
  {
    slug: 'baymax',
    name: 'baymax',
    kind: 'project',
    role: 'Frontend and integration, with Sakshi Singh',
    title: 'Baymax — AI Nurse Triage Assistant',
    intro: 'Interactive triage assistant that turns a patient\'s symptom description into follow-up questions and an Emergency Severity Index level, built with Sakshi Singh at HackDavis 2025.',
    domains: ['Hackathon', 'LLM', 'Health'],
    period: 'HackDavis 2025',
    stack: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'Django', 'LangChain', 'Gemini API', 'MongoDB'],
    contributions: [
      'Built the entire frontend in React, Vite and Tailwind: symptom intake, the adaptive follow-up question flow, and the ESI result view.',
      'Integrated the frontend with the Django backend API and the LangChain + Gemini agent that generates the follow-up questions and severity level.',
      'The agent converts unstructured symptom text into a structured triage assessment in real time; keeping the questions medically relevant and handling several patient sessions in parallel were the hard parts.',
      'Inspired by the Bell Law Firm article "Triage: A Critical First Step in Emergency Care"; the goal is to reduce human error at the first point of contact, with the clinician always making the final call.',
    ],
    image: { src: baymaxImg, alt: 'Baymax triage interface' },
    links: [{ label: 'Devpost', href: 'https://devpost.com/software/baymax-t9hr0d' }],
  },
  {
    slug: 'industry-emissions-dashboard',
    name: 'emissions dashboard',
    kind: 'project',
    role: 'Course project, ECS 272',
    metrics: [
      { value: '500K+', label: 'emission records' },
      { value: 'Top 5', label: 'projects in the class' },
    ],
    title: 'Industry Emissions Dashboard',
    intro: 'Interactive D3.js dashboard that tells the story of 500K+ industrial CO₂ emission records; top 5 project in ECS 272 at UC Davis.',
    domains: ['Data visualization', 'Climate'],
    period: 'Fall 2024',
    stack: ['D3.js', 'React', 'JavaScript', 'HTML', 'CSS'],
    contributions: [
      'Analysed over 500K CO₂-per-kg emission records across industrial sectors to find and compare the largest contributors.',
      'Built drill-down analytics: hierarchical bubbles for sector share, stacked bars for composition over time, pie charts for comparison.',
      'Chose visualizations so a reader can move from the big picture to a single sector.',
    ],
    image: { src: emissionsImg, alt: 'Emissions dashboard with hierarchical bubble chart' },
    links: [{ label: 'GitHub', href: 'https://github.com/blanklavender/IndustryEmissionsDash/tree/main' }],
  },
  {
    slug: 'book-genre-lstm',
    name: 'book genres',
    kind: 'project',
    hidden: true,
    title: 'Book Genre Prediction with LSTM',
    intro: 'Multi-class genre classifier over book descriptions, rebuilt in PyTorch with a stronger training setup.',
    domains: ['ML', 'NLP'],
    period: '2024',
    stack: ['Python', 'PyTorch', 'LSTM', 'Word embeddings'],
    contributions: [
      'Embedding layer over pretrained word vectors → 2-layer LSTM (hidden 256) → fully connected + softmax over genres, trained with cross-entropy.',
      'Doubled max sequence length from 10 to 20 so longer descriptions keep their meaning.',
      'Ported the model from TensorFlow to a PyTorch nn.Module; resized vocabulary and embeddings to the dataset.',
      'Split off a validation set with early stopping; learning rate 0.0005, dropout 0.5, 50 epochs.',
    ],
  },
  {
    slug: 'human-speed-detector',
    name: 'speed detector',
    kind: 'project',
    role: 'Solo build',
    title: 'Human Speed Detector',
    intro: 'Desktop app that tracks a person in video and plots their speed live.',
    domains: ['Computer vision', 'Sports'],
    period: '2023',
    stack: ['Python', 'OpenCV', 'YOLOv4', 'Haar cascades', 'Tkinter', 'Matplotlib'],
    contributions: [
      'Detected people and faces with YOLOv4, with cascade classifiers as a fallback, on video files and the webcam.',
      'Estimated speed from centroid displacement of the bounding box between frames, scaled by a calibration factor.',
      'Kept two people as separate tracks with a distance threshold, even when they cross paths.',
      'Two modes: athlete speed tracking, and flagging a sudden spike in movement as suspicious activity.',
      'Live Matplotlib graph of speed over time, updating as frames are processed.',
    ],
    image: { src: speedImg, alt: 'Speed detector overlay on a moving person' },
    pageImages: [
      { src: speedDetect1Img, alt: 'Detected person with bounding box and live speed readout' },
      { src: speedDetect2Img, alt: 'Speed-over-time graph updating alongside the video' },
    ],
  },
  {
    slug: 'level-up',
    name: 'level up',
    kind: 'project',
    hidden: true,
    title: 'Level Up',
    intro: 'Fitness app prototype from a hackathon, with a React Native UI and a Flask + MongoDB backend.',
    domains: ['Hackathon', 'Mobile'],
    period: '2023',
    stack: ['React Native', 'JavaScript', 'Python', 'Flask', 'MongoDB'],
    contributions: [
      'Built most of the React Native UI.',
      'Worked on connecting it to the Flask and MongoDB backend; login and signup were not finished in time.',
    ],
  },
  {
    slug: 'seasons-animation',
    name: 'seasons',
    kind: 'project',
    hidden: true,
    title: 'Seasons Animation',
    intro: 'Keyboard-driven graphics demo in C that switches between sunny, rainy and snowy scenes.',
    domains: ['Graphics'],
    period: '2022',
    stack: ['C'],
    contributions: [
      'Drew a landscape scene with simple primitives and per-frame updates.',
      'Switched between sunny, rain and snow on key presses.',
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
