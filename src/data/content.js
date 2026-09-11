// All copy sourced directly from the approved Famysys Studio deck brief.
// Nothing here is invented — clients, stats, awards, and testimonials are
// intentionally absent because none were supplied.
import dineflowImg from '../assets/portfolio/websites/dineflow.webp'
import skillhubImg from '../assets/portfolio/websites/skillhub.webp'
import lenaDenaImg from '../assets/portfolio/websites/lena-dena.png'
import kahFishImg from '../assets/portfolio/websites/kah-fish.png'
import hajjUmrahImg from '../assets/portfolio/websites/hajj-umrah.jpg'
import aspirasysBannerImg from '../assets/portfolio/print-design/banners/aspirasys-internship.jpg'
import srFoodkraftBannerImg from '../assets/portfolio/print-design/banners/sr-foodkraft.jpg'
import misshePosterImg from '../assets/portfolio/print-design/posters/misshe-award-show.jpg'
import bagsShoesPosterImg from '../assets/portfolio/print-design/posters/bags-shoes.jpg'
import techzoneEidPosterImg from '../assets/portfolio/print-design/posters/techzone-eid.jpg'
import socialFlyersProductImg from '../assets/portfolio/print-design/product-posters/social-flyers-banners.jpg'
import megaBundleProductImg from '../assets/portfolio/print-design/product-posters/mega-bundle.jpg'
import youtubeThumbnailsProductImg from '../assets/portfolio/print-design/product-posters/youtube-thumbnails.jpg'

export const whoWeAre = {
  headline: 'Famysys is a founder-led technology partner.',
  copy: 'We help businesses build, automate and transform with practical, scalable digital solutions.',
  highlights: [
    {
      title: '30+ Years of Experience',
      copy: 'Founder experience spanning IT services, product engineering, enterprise delivery and business leadership.',
    },
    {
      title: 'Outcome-Led Delivery',
      copy: 'Senior teams align technology to business priorities—and stay accountable for measurable progress.',
    },
  ],
  established: '2022',
  locations: 'USA · India',
  visionMission: [
    {
      title: 'Vision',
      copy: 'Professional creative production, without the agency overhead—accessible to every business, regardless of size.',
    },
    {
      title: 'Mission',
      copy: 'We combine human creativity with smart technology—design, video and AI-assisted production—to deliver professional, ready-to-use content.',
    },
  ],
}

export const processSteps = [
  {
    index: '01',
    title: 'Understand',
    copy: 'We understand your business, audience and objective.',
  },
  {
    index: '02',
    title: 'Create',
    copy: 'We develop the concept, script, design direction or production approach.',
  },
  {
    index: '03',
    title: 'Produce',
    copy: 'We combine creative expertise, modern tools and AI where it adds value.',
  },
  {
    index: '04',
    title: 'Refine',
    copy: 'We review, refine and incorporate feedback within the agreed scope.',
  },
  {
    index: '05',
    title: 'Deliver',
    copy: 'You receive polished, platform-ready creative assets.',
  },
]

export const engagementModels = [
  {
    tag: 'Launch',
    title: 'Essential Content',
    audience: 'For small businesses, local businesses, startups and growing brands.',
    examples: ['Social creatives', 'Short-form content', 'Promotional assets', 'Basic video production'],
  },
  {
    tag: 'Grow',
    title: 'Growth Content',
    audience: 'For businesses needing a consistent flow of creative content.',
    examples: ['Short-form video', 'UGC editing', 'AI-assisted video', 'Social creatives', 'Motion', 'Content adaptations'],
  },
  {
    tag: 'Scale',
    title: 'Advanced Creative',
    audience: 'For established businesses, B2B companies, product brands and marketing teams.',
    examples: ['Advanced video', 'Explainer videos', 'Training content', 'Motion graphics', 'Product visuals', 'Multi-format creative production'],
  },
  {
    tag: 'Creative Partnership',
    title: 'Your Flexible Creative Team',
    audience: 'For businesses requiring ongoing creative support across multiple formats.',
    examples: [],
  },
]

export const serviceCategories = [
  {
    title: 'Creative Design',
    tagline: 'Professional visuals for your business.',
    examples: ['Social media creatives', 'Banners', 'Posters', 'Catalogues', 'Marketing collateral', 'Presentations'],
  },
  {
    title: 'Video Production',
    tagline: 'Content designed to communicate and engage.',
    examples: ['Reels', 'Shorts', 'Promotional videos', 'Business videos', 'UGC editing', 'Content repurposing'],
  },
  {
    title: 'AI Video & Virtual Presenters',
    tagline: 'Create professional video content faster.',
    examples: ['AI videos', 'AI presenters', 'AI UGC', 'Product videos', 'Marketing content'],
  },
  {
    title: 'Explainer & Training',
    tagline: 'Make complex ideas easy to understand.',
    examples: ['Explainer videos', 'Training videos', 'Course content', 'Onboarding videos', 'Instructional content'],
  },
  {
    title: 'Motion & Visual Effects',
    tagline: 'Bring ideas to life through movement.',
    examples: ['Motion graphics', 'Animated typography', 'Visual effects', 'Compositing'],
  },
  {
    title: 'Product & Brand Visuals',
    tagline: 'Make products and brands look their best.',
    examples: ['Product visuals', 'Lifestyle visuals', 'Campaign visuals', 'Promotional assets'],
  },
]

// The Websites category uses the same coverflow gallery pattern as the
// video categories (see WebsiteGallery.jsx), just with project screenshots
// instead of embedded clips. `image` is intentionally absent on every
// entry until real thumbnail files are supplied — the card falls back to
// a plain placeholder rather than showing a fabricated screenshot.
export const websiteProjects = [
  {
    key: 'basha',
    title: 'Basha',
    category: 'Storefront & Kitchen Platform',
    summary: 'Storefront, admin panel and Android app on one API, one menu and one order record.',
    bullets: ['The menu, in the browser', 'A menu the owner controls', 'The same panel, on the floor'],
    url: 'https://famysys.com/portfolio/v2/restaurant-ordering-platform/',
    previewUrl: 'https://www.bashafood.in/',
  },
  {
    key: 'ferrobid',
    title: 'FerroBid',
    category: 'Industrial Auction Platform',
    summary: 'A metal e-auction: nine roles, earnest money per lot, and a close that extends itself.',
    bullets: ['Free to browse, registered to bid', 'Live bidding, on a clock that extends', 'Won lots run on to the gate pass'],
    url: 'https://famysys.com/portfolio/v2/metal-auction-marketplace/',
    previewUrl: 'https://ferrobid.aspirasys.in/#/home',
  },
  {
    key: 'dineflow',
    title: 'DineFlow',
    category: 'Order-to-Kitchen Platform',
    summary: 'Web, app and QR ordering, the counter, the kitchen pass, the rider and the branch report on one order record.',
    bullets: ['Three ways to order, chosen first', 'One counter, one queue, five states', 'Seven roles against seventeen modules'],
    url: 'https://famysys.com/portfolio/v2/dineflow-restaurant-os/',
    image: dineflowImg,
  },
  {
    key: 'royal-tiles',
    title: 'Royal Tiles',
    category: 'Tile Storefront & 3D Visualiser',
    summary: 'A showroom, a real-time 3D room that lays any tile on a floor or wall, and the console that stocks both.',
    bullets: ['It opens on a room, not a grid', 'Lay the tile down and walk around it', 'The console opens on stock'],
    url: 'https://famysys.com/portfolio/v2/stone-showroom-3d-visualiser/',
    previewUrl: 'https://royal.aspirasys.in/',
  },
  {
    key: 'miniminds-studio',
    title: 'MiniMinds Studio',
    category: "Children's Book Catalogue",
    summary: 'A storefront of 32 titles routed to Amazon and Flipkart, and the Studio that edits them and counts the redirects.',
    // Third bullet pending — user's source screenshot was illegible there.
    bullets: ['Thirty-two titles, filtered in place', 'A dashboard that counts clicks out, not views'],
    url: 'https://famysys.com/portfolio/v2/childrens-book-catalogue/',
    previewUrl: 'https://studiominiminds.com/',
  },
  {
    key: 'kkm-keychains',
    title: 'KKM Keychains',
    category: 'Bulk Keychains & Gifts',
    summary: 'A WordPress catalogue of 580-plus designs with no prices, and a quote path behind every one.',
    bullets: ['One catalogue, and no price on it', 'The page ends in a quote, not a checkout', 'Sized for corporate quantities'],
    url: 'https://famysys.com/portfolio/v2/bulk-gifting-catalogue/',
    previewUrl: 'https://kkmkeychains.in/',
  },
  {
    key: 'hajj-umrah',
    title: 'Hajj & Umrah',
    category: 'Travel Booking Platform',
    summary: 'A pilgrim’s path in four steps on the site, and the operator console that publishes it.',
    bullets: ['A journey broken into four steps', 'Departures by the Islamic calendar', 'One console behind all of it'],
    url: 'https://famysys.com/portfolio/v2/pilgrimage-booking-platform/',
    // Live preview blocked by the site (X-Frame-Options: SAMEORIGIN /
    // CSP frame-ancestors 'self'). Screenshot stays in the card; click
    // still opens the live site via liveUrl.
    image: hajjUmrahImg,
    liveUrl: 'https://moulana.aspirasys.in/',
  },
  {
    key: 'tnhss',
    title: 'TNHSS',
    category: 'Room & Hall Booking System',
    summary: "One inventory of 110 rooms behind a public site, a desk, a cleaner's board and a branch console.",
    bullets: ['Pick two dates, see what is free', 'Every room as a card, with its state', 'The cleaner sees the same board'],
    url: 'https://famysys.com/portfolio/v2/institutional-room-booking/',
    previewUrl: 'https://tnhajsociety.org/',
  },
  {
    key: 'bva-global',
    title: 'BVA Global',
    category: 'Corporate Site',
    summary: 'A corporate site built as one continuous page, from positioning to delivery method.',
    bullets: ['A claim, a promise, and the reason', 'Four services, one sentence each', 'The whole engagement, in one strip'],
    url: 'https://famysys.com/portfolio/v2/supply-chain-consultancy-site/',
    previewUrl: 'https://bvaglobal.ai/',
  },
  {
    key: 'kah-fish',
    title: 'KAH Fish',
    category: 'Wholesale Day-Book',
    summary: 'Purchases, sales and payments written once; balances current; an A5 bill from the entry itself.',
    bullets: ['The day opens on the position', 'The entry, printed as an A5 bill', 'Five roles, one grid'],
    url: 'https://famysys.com/portfolio/v2/wholesale-day-book/',
    image: kahFishImg,
  },
  {
    key: 'lena-dena',
    title: 'Lena Dena',
    category: 'Restaurant Bookkeeping System',
    summary: "A restaurant's books on one panel: takings, costs, a configured receipt and a trail of who entered what.",
    bullets: ['Open it at closing; the day is counted', 'Every cost carries a category and a state', 'Who did what, and when, on one page'],
    url: 'https://famysys.com/portfolio/v2/restaurant-books/',
    image: lenaDenaImg,
  },
  {
    key: 'skillhub',
    title: 'SkillHub',
    category: 'Course · Trainee Management',
    summary: 'Two role-based surfaces over one record, from enrolment to job-ready.',
    bullets: ['A journey with dates on it', 'The programme, at a glance', 'One account, one role, one surface'],
    url: 'https://famysys.com/portfolio/v2/trainee-management-portal/',
    image: skillhubImg,
  },
]

// Portfolio media. Video entries embed Google Drive files via the
// `/preview` player so they play in-frame without SharePoint sign-in.
// Digital Print & Design is static image work — see
// src/assets/portfolio/README.md.
export const portfolioCategories = [
  {
    key: 'ugc',
    label: 'UGC edits',
    ratio: 'portrait',
    process: {
      input:
        'You share raw, unedited footage filmed on your end — clips, talking-head takes or product shots — plus the platform, tone and message you want the final UGC piece to land.',
      output:
        'We edit, caption and polish it into finished, platform-ready social content. Tools: Google Flow, Higgsfield — with GPT & Claude for script support, hooks and planning.',
    },
    videos: [
      {
        title: 'Business Tips',
        src: 'https://drive.google.com/file/d/1HCrRxq40Utr5pfWqD7hkUPY3NHiCT_YE/preview',
      },
      {
        title: 'Frozen Foods',
        src: 'https://drive.google.com/file/d/1LxoEepYJ1O9a-xN5CZ0NiaGp33zYqAcb/preview',
      },
      {
        title: 'Ghee',
        src: 'https://drive.google.com/file/d/18bLH9SOCBUloiUb22PmI3ZafSZuR5O5z/preview',
      },
    ],
  },
  {
    key: 'motion-graphics',
    label: 'Motion graphics',
    ratio: 'landscape',
    process: {
      input:
        'You share the brief — script or talking points, brand assets, source footage, presentation decks or training material — and the length, aspect ratio and platforms you need.',
      output:
        'We animate, edit and deliver polished, platform-ready motion graphics. Tools: After Effects, Premiere Pro, CapCut, Blender — with GPT & Claude for script writing and planning.',
    },
    videos: [
      {
        title: 'AspiraSys Introduction',
        src: 'https://drive.google.com/file/d/1oRYmOchAM-7GQJfF-pAV9PJm9-NID1Nt/preview',
      },
      {
        title: 'Introducing NI Digital Org',
        src: 'https://drive.google.com/file/d/1wakhhx4FO4nHQx9cawsHpS4FN5EABhvP/preview',
      },
      {
        title: 'IT Career Roadmap Shorts',
        src: 'https://drive.google.com/file/d/1Emk9B0eTdI5rpn_WDRz3L44URoOgSAoe/preview',
      },
    ],
  },
  {
    key: 'synthesia',
    label: 'Synthesia',
    ratio: 'landscape',
    process: {
      input:
        'You share the topic, audience and learning goal — plus any existing script, slides, brand guidelines or training material we should follow.',
      output:
        'We produce polished presenter-led videos ready for training, onboarding or marketing. Tools: Synthesia, GPT & Claude for script writing and planning.',
    },
    videos: [
      {
        title: 'CIPL - Induction for New Joinee',
        src: 'https://drive.google.com/file/d/1qXUtHdtX5h0RfcfPiQ7qUccUEwvRZK5j/preview',
      },
      {
        title: 'Control Your CPARS to Win More Contracts',
        src: 'https://drive.google.com/file/d/1B6g7KnKRtYJP84-BXq2G_mQoH-h7nQM6/preview',
      },
      {
        title: 'CPARS Million Dollar Wake Up',
        src: 'https://drive.google.com/file/d/1MrliDwNmAk53Z35z-bM6P_xjulS0f6a5/preview',
      },
    ],
  },
  {
    key: 'ai-video',
    label: 'AI Video',
    ratio: 'portrait',
    process: {
      input:
        'You share the product, message or scenario — reference visuals, brand assets, voice preference and where the video will run (reels, ads, product pages).',
      output:
        'We generate and refine AI-assisted video into a polished, ready-to-use final cut. Tools: Flow, Higgsfield — with GPT & Claude for script writing and planning.',
    },
    videos: [
      {
        title: 'AI Video 01',
        src: 'https://drive.google.com/file/d/1d_8xWJjl2La3qVEayOPobRTwJn9wkoUw/preview',
      },
      {
        title: 'AI Video 02',
        src: 'https://drive.google.com/file/d/1onx8mIM44RqCSPTZoccPCRdE3K8HFZdS/preview',
      },
      {
        title: 'AI Video 03',
        src: 'https://drive.google.com/file/d/1hG1oF5SOVw1pL0P-Ex6Zt_nFNxzhYi43/preview',
      },
    ],
  },
  {
    key: 'print-design',
    label: 'Digital Print & Design',
    copy: 'Banners, catalogues and posters designed for business impact.',
    ratio: 'portrait',
    process: {
      input:
        'You share brand assets (logo, colours, fonts), the core message, sizes or placements needed, and any reference designs or campaign copy.',
      output:
        'We design print-ready and digital-ready banners, posters and product posters. Tools: Canva, Figma, Illustrator, Photoshop — with GPT & Claude for copy and planning support.',
    },
    subcategories: [
      {
        key: 'banners',
        label: 'Banners',
        ratio: 'landscape',
        images: [
          {
            key: 'aspirasys-internship',
            title: 'AspiraSys Internship Program',
            image: aspirasysBannerImg,
          },
          {
            key: 'sr-foodkraft',
            title: 'SR Foodkraft',
            image: srFoodkraftBannerImg,
          },
        ],
      },
      {
        key: 'posters',
        label: 'Posters',
        ratio: 'portrait',
        images: [
          {
            key: 'misshe-award-show',
            title: "Mis'She Award Show Season 2",
            image: misshePosterImg,
          },
          {
            key: 'bags-shoes',
            title: 'Bags & Shoes',
            image: bagsShoesPosterImg,
          },
          {
            key: 'techzone-eid',
            title: 'Tech Zone Eid Mubarak',
            image: techzoneEidPosterImg,
          },
        ],
      },
      {
        key: 'product-posters',
        label: 'Product Posters',
        ratio: 'landscape',
        images: [
          {
            key: 'social-flyers-banners',
            title: 'Social Media Flyers & Banners',
            image: socialFlyersProductImg,
          },
          {
            key: 'mega-bundle',
            title: '10K Mega Bundle',
            image: megaBundleProductImg,
          },
          {
            key: 'youtube-thumbnails',
            title: 'YouTube Thumbnails',
            image: youtubeThumbnailsProductImg,
          },
        ],
      },
    ],
  },
  {
    key: 'websites',
    label: 'Websites',
    ratio: 'landscape',
    projects: websiteProjects,
  },
  {
    key: 'presentation',
    label: 'Presentation',
    ratio: 'landscape',
    title: 'Corporate Capability',
    category: 'Capability deck',
    summary: 'Live Famysys corporate capability presentation — positioning through selected work.',
    bullets: ['Interactive 12-slide deck', 'Click the preview to present', 'Open fullscreen when needed'],
    url: 'https://famysys.com/corporate/',
    embedUrl: 'https://famysys.com/corporate/',
  },
]
