import { Link } from 'react-router-dom';
import Masthead from '../components/Masthead';
import { blogs } from '../data/blogs';

/** Blog listing: one entry per post in the first two columns. */
const Blogs = () => (
  <>
    <Masthead title="Blogs" />

    <div className="wrap after-masthead">
      <div className="cols">
        <ul className="s2 t2 space-y-6">
          {blogs.map((b) => (
            <li key={b.slug}>
              <Link to={`/blogs/${b.slug}`} className="entry">
                <span className="entry-title">{b.title}</span>
                <span className="entry-body block">{b.summary}</span>
                <span className="entry-meta block">
                  {b.date} · {b.topics.join(', ')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Same card as on the home page, half of the first two columns */}
    <section className="wrap pre-footer">
      <div className="cols">
        <div className="s2 t2 grid grid-cols-2 gap-2">
          <Link to="/work" className="quick-link">
            <small>Research & projects</small>
            Go to work →
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Blogs;
