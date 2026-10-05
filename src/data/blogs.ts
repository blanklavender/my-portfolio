/** One piece of a post, in reading order. List items can carry a nested list under them. */
export type BlogBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: BlogListItem[] };

export interface BlogListItem {
  text: string;
  children?: string[];
}

export interface Blog {
  slug: string;
  title: string;
  /** One line shown on the Blogs listing. */
  summary: string;
  /** When it was written, as shown on the page. */
  date: string;
  topics: string[];
  body: BlogBlock[];
}

export const blogs: Blog[] = [
  {
    slug: 'understanding-3dgs',
    title: 'Understanding 3DGS',
    summary: 'My notes from figuring out what 3D Gaussian Splatting actually does, and what gsplat is under the hood.',
    date: 'October 2026',
    topics: ['3D Gaussian Splatting', 'Computer Vision'],
    body: [
      { type: 'heading', text: 'Definition' },
      {
        type: 'list',
        items: [
          { text: "It's a way to take the rough point cloud and polish it by making it match the photos." },
          {
            text: 'So basically it gives the point cloud a more custom surface, way better than triangle meshes.',
          },
          {
            text: 'Every point becomes a soft (translucent) and fuzzy (fading outwards, or stretched in different directions) blob.',
          },
          {
            text: 'It then renders the blobs into an image, compares it with the real photo, and based on the error it backpropagates, just for this model. So the weights are custom to this one model.',
          },
          { text: 'It needs two things: camera poses and a starting point cloud (so, like, from SfM).' },
        ],
      },

      { type: 'heading', text: 'Model structure' },
      {
        type: 'list',
        items: [
          {
            text: 'A differentiable tile-based rasterizer: it turns the Gaussians into a 2D image, and the gradients flow back through it?',
          },
          {
            text: "Adaptive density control: a clone/split/prune heuristic (I'm guessing a probability function) for managing the blobs.",
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Yeah, that makes sense. The researchers contributed a new representation, the rasterizer (I wonder what coding language it would have been written in) and the densification algorithm (ADC). So in other words, math and code.',
      },
      {
        type: 'paragraph',
        text: "Basically, when I run this thing on my setup, I'm just running an optimization algorithm that keeps looping under constrained conditions to achieve maximum overlap. So 3DGS is almost a linear-equation optimization: like fitting a solution under constrained conditions until the sweet spot is reached. So, code plus density control. I still don't understand what a density control system means. Math and code, wow! Power combo! So I bring my constrained images and re-optimize with the rasterizer every time. What I'm looking at is also called vanilla 3DGS.",
      },
      {
        type: 'paragraph',
        text: 'Also, interestingly, Adam is used as the optimizer. Adaptive control is applied every 100 iterations: prune the almost transparent blobs, clone in under-reconstructed areas and split in over-reconstructed areas. (Interesting!)',
      },
      {
        type: 'paragraph',
        text: "The rasterizer is, at the end of the day, a renderer, right? So basically you split the image into tiles, alpha-blend everything based on how the Gaussians are layered, and render it in real time! Low-cost viewing!",
      },

      { type: 'heading', text: 'So what exactly is gsplat?' },
      {
        type: 'paragraph',
        text: "We all know CUDA is a programming language for GPUs, right? That's why you need an NVIDIA GPU to run gsplat. So, good choice on the laptop. gsplat is nothing but a CUDA implementation of this rasterizer, plus a Python API, plus examples. When we write a Python script and import the package, it runs as the CUDA implementation underneath, but we use the Python API functions to make the calls.",
      },
      {
        type: 'paragraph',
        text: 'So when I call it and give it the ingredients, it gives me the gradients. These gradients are stored and used to generate the photo-real looking object. Splatfacto, on the other hand, just wraps a full pipeline around it (almost like a wrapper); gsplat is the engine, so we can probably build around it and add depth terms to restrict it further. We are basically replacing COLMAP.',
      },

      { type: 'heading', text: 'Ingredients' },
      {
        type: 'list',
        items: [
          {
            text: 'Camera poses + initial point cloud, in COLMAP format',
            children: ['Pose sanity check? How do I do that?'],
          },
        ],
      },

      { type: 'heading', text: 'Make sure of' },
      { type: 'list', items: [{ text: 'Lighting' }, { text: 'Undistorted images' }] },

      { type: 'heading', text: 'General method of implementation' },
      {
        type: 'list',
        items: [
          { text: 'Capture around the target object. (People with robot arms would bypass COLMAP.)' },
          { text: 'Initialize the Gaussians by setting a splat at each point.' },
          {
            text: 'Training is decided by the number of steps, like 7k to 30k.',
            children: [
              "Basically it renders the photo from a known camera pose, backpropagates and nudges every blob's properties, and even clones or splits blobs where details are missing.",
              'Obtain the .ply of Gaussians.',
            ],
          },
        ],
      },

      { type: 'heading', text: 'Now, in my case' },
      {
        type: 'list',
        items: [
          {
            text: "If my poses are wrong, it's supposed to show up as blurs in the places where it's unknown. (We can look at it after one run.)",
          },
          { text: "But Claude's suggestion is to maybe guardrail it further down the line." },
        ],
      },

      { type: 'heading', text: 'Lookout' },
      {
        type: 'paragraph',
        text: 'So, BLURS = pose or data problems. Solution: more iterations (can play with this) + denser views (which we already have).',
      },
    ],
  },
];

export const getBlog = (slug: string) => blogs.find((b) => b.slug === slug);
