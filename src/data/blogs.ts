/** One piece of a post, in reading order. List items can carry a nested list under them. */
export type BlogBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: BlogListItem[]; ordered?: boolean };

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
    title: 'How 3D Gaussian Splatting finally clicked to me',
    summary: 'Points become blobs, a short training loop, and why blurs point back to your camera poses.',
    date: 'Oct 6, 2026',
    topics: ['3D Gaussian Splatting', 'Computer Vision'],
    body: [
      { type: 'heading', text: 'So what is 3D Gaussian Splatting?' },
      {
        type: 'paragraph',
        text: "3DGS is an optimization problem. But instead, a smart one. It was a huge improvement over its predecessor Neural Radiance Fields (NeRF) which used a legit machine learning model. The concept is very interesting, and I used it for my space farming project. Here's how I understood it.",
      },
      {
        type: 'paragraph',
        text: 'You start with a rough 360 degree point cloud of your object, and 3DGS polishes it until it matches your photos. The process of creating this skeletal starter is usually handled by an SfM (Structure from Motion) technique which is not discussed in this article.',
      },
      {
        type: 'paragraph',
        text: 'What advantage does this have? For situations where you need synthetic data generation for real objects, and you have camera data available, this was a breakthrough. One important thing I had to unlearn early: this is not building a surface or a mesh. It is learning a representation you can render from new camera angles, so a view you never photographed still looks photo-real. That is the whole game.',
      },
      {
        type: 'paragraph',
        text: 'Underneath, it is really just an optimization. The model renders its blobs into an image, compares that image to the real photo, and nudges the blobs to close the gap. Repeat thousands of times and the blobs settle into something that looks like the real scene from any direction.',
      },

      { type: 'heading', text: 'The one move: points become blobs' },
      {
        type: 'paragraph',
        text: 'Here is the single idea the whole method rests on. Take each point in that starting cloud and turn it into a fuzzy, translucent blob instead of a hard dot.',
      },
      {
        type: 'paragraph',
        text: '“Fuzzy” means it fades out at the edges rather than stopping sharply. “Translucent” means you can see through it and stack several on top of each other. Each blob also has a shape, so it can stretch and tilt to hug a thin leaf or a flat wall instead of staying a round ball.',
      },
      {
        type: 'paragraph',
        text: 'So every blob really carries four things: where it sits, what shape it is, how see-through it is, and what color it shows. Training is just the process of tuning those four knobs on every blob at once until the picture comes out right.',
      },

      { type: 'heading', text: 'The training loop' },
      { type: 'paragraph', text: 'The loop is the heart of it, and it is short:' },
      {
        type: 'list',
        ordered: true,
        items: [
          { text: 'Render the blobs into an image from a camera angle you actually photographed.' },
          { text: 'Compare that render to the real photo and measure the error.' },
          { text: 'Push the error backward and nudge every blob a little to make the next render closer.' },
        ],
      },
      { type: 'paragraph', text: 'Run that a few thousand times and the blobs converge on the scene.' },
      {
        type: 'paragraph',
        text: 'The part that surprised me: this training is for one scene only. The result is custom to that single model, not a general network you reuse elsewhere. Point it at a new object and you train again from scratch.',
      },
      {
        type: 'paragraph',
        text: 'To even start, it needs just two things: the camera poses (where each photo was taken from) and a starting point cloud. Both usually come from Structure from Motion (SfM), the classic trick of recovering 3D points and camera positions from a set of overlapping photos.',
      },

      { type: 'heading', text: 'What is actually inside the model' },
      { type: 'paragraph', text: 'There are two moving parts.' },
      {
        type: 'paragraph',
        text: 'The first is a differentiable, tile-based rasterizer. “Rasterizer” just means the thing that turns the 3D blobs into a flat 2D image. “Differentiable” is the key word: it is built so the error can flow backward through it, which is what lets step 3 of the loop nudge the blobs.',
      },
      {
        type: 'paragraph',
        text: 'The second is adaptive density control (ADC). This is the part I kept not understanding, so here it is plainly: it is a set of simple rules that add, split, and remove blobs as training goes. Not a magic probability function, just bookkeeping that keeps the right number of blobs in the right places.',
      },
      {
        type: 'paragraph',
        text: 'Put those together and the original paper really contributed three things: a new way to represent a scene (the blobs), a renderer for it (the rasterizer), and an algorithm to manage the blobs (densification). Math and code. A good combo.',
      },

      { type: 'heading', text: 'What happens when you run it' },
      {
        type: 'paragraph',
        text: 'When you run 3DGS, you are running that optimization loop over and over under one goal: make the render overlap the photos as closely as possible, then stop when it stops improving. Feed it a new set of images and you re-optimize from scratch. The plain version, with no extra tricks bolted on, is called vanilla 3DGS.',
      },
      { type: 'paragraph', text: 'A few details that are nice to know:' },
      {
        type: 'list',
        items: [
          { text: 'The optimizer is plain old Adam, the same workhorse used to train most neural networks.' },
          {
            text: 'Density control kicks in every ~100 iterations, and it does exactly three things:',
            children: [
              'Prune blobs that have gone nearly transparent (they are not contributing).',
              'Clone blobs in areas that are under-reconstructed (too little detail).',
              'Split blobs in areas that are over-reconstructed (one blob trying to cover too much).',
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'That trio is what “density control” actually means in practice. It is how the model decides where it needs more blobs and where it has too many.',
      },

      { type: 'heading', text: 'The rasterizer is just a fast renderer' },
      {
        type: 'paragraph',
        text: 'Strip away the training and the rasterizer is, at the end of the day, a renderer. Here is how it draws a frame:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          { text: 'Split the image into small tiles.' },
          { text: 'For each tile, take the blobs that land there in the order they are layered, front to back.' },
          { text: 'Blend them together by their transparency (alpha blending) to get the final pixels.' },
        ],
      },
      {
        type: 'paragraph',
        text: 'Because it works tile by tile, it is fast enough to draw frames in real time. That is the big practical payoff: once a scene is trained, viewing it is cheap and smooth, and you can fly the camera around freely.',
      },

      { type: 'heading', text: 'So what is gsplat?' },
      {
        type: 'paragraph',
        text: "CUDA is NVIDIA's language for programming GPUs, which is why gsplat needs an NVIDIA GPU. gsplat is simply a CUDA implementation of that rasterizer, wrapped in a friendly Python API and shipped with examples.",
      },
      {
        type: 'paragraph',
        text: 'So when I import it in a Python script, the heavy GPU work happens in the CUDA code underneath, but I only ever call the Python functions. I hand gsplat the ingredients and it hands back the signals that nudge every blob toward a photo-real result. (Those signals update the blobs during training; the finished blobs, not the signals, are what you render afterward.)',
      },
      {
        type: 'paragraph',
        text: 'Splatfacto is a step up from this: it wraps a whole pipeline around gsplat. So gsplat is the bare engine, and that is exactly why it is useful to build on. I can wrap my own pipeline around it and add extra constraints, like depth terms, to pin the geometry down further.',
      },
      {
        type: 'paragraph',
        text: 'And because my camera poses come from my own capture setup, I can skip the SfM step (COLMAP) entirely. Worth being precise here: gsplat does not replace what COLMAP does (it does not recover poses for you). I am skipping COLMAP because I already have the poses it would have produced.',
      },

      { type: 'heading', text: 'What you feed it, and how a run goes' },
      { type: 'paragraph', text: 'The ingredients are short:' },
      {
        type: 'list',
        items: [
          { text: 'Camera poses and an initial point cloud, in COLMAP format.' },
          { text: 'Consistent lighting across all the photos.' },
          { text: 'Undistorted images (lens distortion already corrected).' },
        ],
      },
      { type: 'paragraph', text: 'And a run comes together like this:' },
      {
        type: 'list',
        ordered: true,
        items: [
          {
            text: 'Capture images all around the target object. If your setup already knows its poses (a robot arm does), you bypass COLMAP here.',
          },
          { text: 'Initialize the blobs by dropping one splat at each point in the cloud.' },
          {
            text: 'Train for a set number of steps, usually somewhere between 7,000 and 30,000. Each step renders the scene from a known camera pose, measures the error, and nudges every blob, cloning or splitting blobs where detail is missing.',
          },
          { text: 'Export the trained blobs as a .ply file.' },
        ],
      },
      { type: 'paragraph', text: 'That .ply is your finished scene, ready to view or hand to the next stage.' },

      { type: 'heading', text: 'The practical takeaway: blurs are a clue' },
      {
        type: 'paragraph',
        text: 'Pose quality is the linchpin. If your camera poses are wrong, the model cannot line up the photos, so it hedges, and that hedging shows up as blur and fuzz in the regions it is unsure about. So the rule of thumb I am keeping:',
      },
      { type: 'paragraph', text: 'Blurs usually mean a pose or data problem.' },
      {
        type: 'paragraph',
        text: 'But the fix depends on which problem it is, and this is where I had to correct my first instinct. More iterations and denser views only help when the poses are already right; they let a correct setup resolve more detail. If the poses themselves are wrong, more iterations will not rescue it, the model will just keep trying to reconcile photos that do not agree. So the order is: confirm the poses first, then turn up iterations and lean on denser views for sharpness.',
      },
      {
        type: 'paragraph',
        text: 'It is also worth remembering that blur and floaters have other causes too: inconsistent lighting or exposure between shots, motion blur, too few overlapping views, or wrong camera intrinsics. Ruling those out is part of reading the clue.',
      },
      {
        type: 'paragraph',
        text: 'Which leaves the open question I started with: how do you sanity-check poses before burning a long training run? A few cheap checks: reproject the known 3D points back into each image and confirm they land on the right spots, eyeball that the recovered camera positions form the arc you actually captured, and watch for a low reprojection error from SfM. Catching a bad pose here is far cheaper than discovering it as blur after 30,000 steps.',
      },
    ],
  },
];

export const getBlog = (slug: string) => blogs.find((b) => b.slug === slug);
