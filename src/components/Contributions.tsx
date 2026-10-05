import { useEffect, useState } from 'react';
import { GITHUB } from '../links';

interface Day {
  date: string;
  count: number;
  level: number;
}

const USER = GITHUB.split('/').pop();

/** GitHub contribution calendar for the last year, drawn in the page colours. */
const Contributions = () => {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { total: { lastYear: number }; contributions: Day[] }) => {
        setDays(data.contributions);
        setTotal(data.total.lastYear);
      })
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return (
      <p className="secondary">
        The contribution map could not load right now; see{' '}
        <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-link">
          github.com/{USER}
        </a>
        .
      </p>
    );
  }

  if (!days) return <p className="dim">Loading contributions…</p>;

  // Pad the first column so each column runs Sunday to Saturday, like GitHub.
  const offset = new Date(`${days[0].date}T00:00:00`).getDay();

  return (
    <div>
      <div className="heatmap-scroll">
        <div className="heatmap" role="img" aria-label={`${total} contributions in the last year`}>
          {Array.from({ length: offset }, (_, i) => (
            <span key={`pad-${i}`} style={{ visibility: 'hidden' }} />
          ))}
          {days.map((day) => (
            <span
              key={day.date}
              data-level={day.level}
              title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
            />
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm secondary">
        {total} contributions in the last year ·{' '}
        <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-link font-semibold">
          github.com/{USER} ↗
        </a>
      </p>
    </div>
  );
};

export default Contributions;
