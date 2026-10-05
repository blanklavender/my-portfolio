export const Tags = ({ items }: { items: string[] }) => (
  <ul className="tag-list">
    {items.map((item) => (
      <li key={item} className="tag">
        {item}
      </li>
    ))}
  </ul>
);

/** Accepts youtu.be/<id>, youtube.com/watch?v=<id> or an embed URL; returns the embed URL. */
const youtubeEmbedUrl = (url: string) => {
  const u = new URL(url);
  const id = u.hostname === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v') ?? u.pathname.split('/').pop();
  return `https://www.youtube-nocookie.com/embed/${id}`;
};

export const YouTube = ({ url, title }: { url: string; title: string }) => (
  <div className="video-frame">
    <iframe
      src={youtubeEmbedUrl(url)}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
);
