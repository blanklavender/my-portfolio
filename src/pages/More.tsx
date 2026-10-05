import Masthead from '../components/Masthead';
import bikeCoffee from '../assets/gallery/bike-coffee.webp';
import hike from '../assets/gallery/hike.webp';
import newYork from '../assets/gallery/new-york.webp';
import piano from '../assets/gallery/piano.webp';

// 640px WebP copies of the photos in /gallery, so there is no full-size file to open or save.
const photos = [
  { src: bikeCoffee, name: 'bike+coffee.jpg' },
  { src: hike, name: 'hike.jpg' },
  { src: newYork, name: 'newyork.jpg' },
  { src: piano, name: 'piano.jpg' },
];

/** The "more" page: a 2×2 photo grid in the first four columns, a one-line focus under the menu. */
const More = () => (
  <>
    <Masthead title="about me" />

    <section className="wrap after-masthead">
      <div className="cols">
        <ul className="s4 t4 gallery">
          {photos.map((photo) => (
            <li key={photo.name}>
              {/* A background rather than an <img>: no "open/save image" menu, nothing to drag */}
              <span
                role="img"
                aria-label={photo.name}
                className="gallery-photo"
                style={{ backgroundImage: `url(${photo.src})` }}
                onContextMenu={(e) => e.preventDefault()}
              />
              <span className="gallery-name">{photo.name}</span>
            </li>
          ))}
        </ul>

        <div className="s2 t4">
          <p className="lead-body">off the clock: hiking trails, biking, playing piano and guitar, and a good debate.</p>
        </div>
      </div>
    </section>
  </>
);

export default More;
