import { HRVIP_LAB, PAPER } from '../links';
import type { ReactNode } from 'react';

interface TimelineItem {
  date: string;
  body: ReactNode;
}

const items: TimelineItem[] = [
  { date: 'May 10, 2026', body: 'HackDavis 2026 Winner among 428 participants' },
  {
    date: 'Mar 6, 2026',
    body: 'Top 5 winners in Thesis Lightning Talk in CS department at UC Davis',
  },
  { date: 'May 26, 2025', body: 'Leaders for the Future Fellow Awardee at UC Davis' },
  {
    date: 'Mar 18, 2025',
    body: (
      <>
        <a href={PAPER} target="_blank" rel="noopener noreferrer" className="text-link">
          Paper
        </a>
        {' — "Restaurant Recommendation System Based on ML Algorithms and Real-Time Web Scraping"'}
      </>
    ),
  },
  {
    date: 'Jan 31, 2025',
    body: (
      <>
        Joined{' '}
        <a href={HRVIP_LAB} target="_blank" rel="noopener noreferrer" className="text-link">
          HRVIP Lab
        </a>{' '}
        as a Graduate Student Researcher
      </>
    ),
  },
  {
    date: 'Nov 14, 2024',
    body: 'Presented my data visualization and interaction project among the top 5 projects in ECS 272 Information Visualization course at UC Davis',
  },
  {
    date: 'Jul 23, 2024',
    body: 'Graduated with Rank 24 out of 132 students in Computer Engineering Graduating Class (Top 18%)',
  },
  {
    date: 'Feb 9, 2016',
    body: 'Level 1 award in Trinity College London Grade 2 Plectrum Guitar and Piano',
  },
];

const Timeline = () => (
  <section className="pb-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 className="section-heading">Timeline</h2>
      <ul className="mt-6 timeline">
        {items.map((item) => (
          <li key={item.date} className="timeline-item">
            <span className="timeline-date">{item.date}</span>
            <span className="timeline-body">{item.body}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Timeline;
