import { Link, Navigate, useParams } from 'react-router-dom';
import Masthead from '../components/Masthead';
import { getBlog, type BlogBlock } from '../data/blogs';

const Block = ({ block }: { block: BlogBlock }) => {
  switch (block.type) {
    case 'heading':
      return <h2 className="section-heading pt-6">{block.text}</h2>;
    case 'paragraph':
      return <p className="secondary">{block.text}</p>;
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return (
        <List className={block.ordered ? 'prose-list prose-list-ordered' : 'prose-list'}>
          {block.items.map((item) => (
            <li key={item.text}>
              {item.text}
              {item.children && (
                <ul className="prose-list mt-2">
                  {item.children.map((child) => (
                    <li key={child}>{child}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </List>
      );
    }
  }
};

/** A single post: breadcrumb and title in the masthead, the text across the first four columns. */
const BlogPage = () => {
  const { slug = '' } = useParams();
  const blog = getBlog(slug);

  if (!blog) return <Navigate to="/blogs" replace />;

  return (
    <>
      <Masthead
        above={
          <p className="text-sm dim">
            <Link to="/blogs" className="text-link">
              Blogs
            </Link>{' '}
            / {blog.title}
          </p>
        }
        title={blog.title}
      />

      <div className="wrap after-masthead">
        <div className="cols">
          <article className="s4 t4 lead-body blog-body">
            <p className="text-sm dim">
              {blog.date} · {blog.topics.join(', ')}
            </p>
            {blog.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
