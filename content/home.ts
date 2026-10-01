/**
 * Home page content, taken verbatim from https://telcobright.com/
 *
 * Every string below is what the live page renders, including the sections
 * that carry a heading but no body. The one deliberate departure is the six
 * service blurbs in `additional`, which all repeated one placeholder sentence
 * on the old site; see MIGRATION.md for the rest of what was placeholder there.
 */

export const hero = {
  eyebrow: 'Welcome to Telcobright Limited',
  /** "modern IT" renders in the orange→indigo brand gradient. */
  titleLead: 'Telecom meets',
  titleAccent: 'modern IT',
  body:
    'Elevate Your Systems to New Heights with Smart, Agile, and Innovative Solutions, Specially Curated for the Demands and Challenges of Modern IT Environments',
  cta: { label: 'Request For Appointment', href: 'mailto:info@telcobright.com' },
  background: '2024/06/tb_bg-2.png',
};

/** The card that sits to the right of the hero copy. */
export const heroCard = {
  image: '2024/08/telcobright.jpg',
  imageAlt: 'The Telcobright team',
  greeting: 'Hello',
  greetingIcon: '2024/06/waving-hand.svg',
  title: 'Got questions? Talk to our experts.',
  cta: { label: 'Send a Message', href: 'mailto:info@telcobright.com' },
  note: '*The team typically replies in a few hours',
};

/**
 * The live carousel is empty — the widget is on the page but no logos were ever
 * added to it. Every logo below was already sitting unused in the WordPress
 * media library, so these are Telcobright's own files, not stock art.
 *
 * Please confirm this list is current before launch. `2024/06/image-119.png` is
 * a second copy of the Summit Communications mark and is left out.
 */
export const clients = {
  title: 'Trusted by renowned companies in Bangladesh',
  logos: [
    { image: '2024/06/image-123.png', alt: 'Bangladesh Telecommunication Regulatory Commission (BTRC)' },
    { image: '2024/06/image-122.png', alt: 'Summit Communications Limited' },
    { image: '2024/06/image-124.png', alt: 'Bangla Telecom' },
    { image: '2024/06/image-120.png', alt: 'Mir Telecom' },
    { image: '2024/06/image-121.png', alt: 'SR Telecom Limited' },
    { image: '2024/06/image-125.png', alt: 'Agni Systems' },
    { image: '2024/06/logo-Mango-ICT-Services-Ltd-removebg-preview-1-1.png', alt: 'Mango ICT Services Ltd' },
    { image: '2024/06/jibondhara-removebg-preview-2.png', alt: 'Jibondhara Solutions' },
    { image: '2024/06/CCL_Logo-2.png', alt: 'Cosmopolitan Communications Limited' },
    { image: '2024/06/Brilliant_logo-1.png', alt: 'Brilliant Connect' },
  ],
};

export const introduction = {
  /** "Product" and "solutions" render in the brand gradient. */
  titleParts: [
    { text: 'Product', accent: true },
    { text: ' and ', accent: false },
    { text: 'solutions', accent: true },
    { text: ' we provide', accent: false },
  ],
  body:
    'Our company offers a range of innovative products and solutions to meet your business needs. These include a reliable SMS Gateway for marketing and customer support, advanced billing solutions, custom mobile app development, a comprehensive CDR Analyzer System, and efficient Common Interconnection SMS services.',
  cta: { label: 'Additional product and solutions', href: '#additional-solutions' },
};

/**
 * The eight product cards, in the order the live page lists them. Each links to
 * the migrated page for that product.
 *
 * Note: the Billing Solutions card repeats the SMS Gateway sentence on the live
 * site. That is not a copy/paste slip here — it is what the page says.
 */
export const products = [
  {
    title: 'SMS Gateway',
    body: 'Telcobright SMS Platform is a highly scalable distributed carrier-grade SMS platform with no single point of failure.',
    href: '/solutions/sms-gateway',
  },
  {
    title: 'Billing Solutions',
    body: 'Telcobright SMS Platform is a highly scalable distributed carrier-grade SMS platform with no single point of failure.',
    href: '/solutions/billing-solutions',
  },
  {
    title: 'CDR Analyzer System',
    body: 'CAS (CDR Analyzer System) serves as a crucial platform for the Bangladesh Telecommunication Regulatory Commission (BTRC) to analyze Call Detail Records (CDRs) and track billed duration from all ICXs (Interconnection Exchanges).',
    href: '/solutions/cdr-analyzer-system',
  },
  {
    title: 'Common Interconnection SMS',
    body: 'CISP (Common Interconnection SMS Platform) project by the Association of ICX Operators Bangladesh (AIOB) is a significant initiative in the telecommunications sector in Bangladesh.',
    href: '/solutions/common-interconnection-sms',
  },
  {
    title: 'Mobile App Development',
    body: 'Mobile App for Chat/Instant Messaging and WebRTC-based Audio and Video Features',
    href: '/solutions/mobile-app-development',
  },
  {
    title: 'IP PBX and WebRTC​',
    body: 'The Multi-Tenant Hosted IP PBX service is designed to provide a scalable, reliable, and feature-rich IP-based communication solution for multiple tenants.',
    href: '/solutions/ip-pbx-and-webrtc',
  },
  {
    title: 'Voice Broadcasting',
    body: 'Our Voice Broadcasting Solution offers efficient call and email management with predictive dialing, compliance, remote access, call recording, and customizable IVRs. It supports auto-dialing, multi-server use, and integrates with databases and web pages.',
    href: '/solutions/voice-broadcasting',
  },
  {
    title: 'Session Border Controller(SBC)',
    body: 'Our Session Border Controller (SBC) offers flexible deployment models with real-time analytics and advanced security features, all within a single software solution.',
    href: '/solutions/session-border-controller',
  },
];

export const additional = {
  eyebrow: 'WHY CHOOSE US',
  titleParts: [
    { text: 'Additional ', accent: false },
    { text: 'Product', accent: true },
    { text: ' and ', accent: false },
    { text: 'solutions', accent: true },
  ],
  image: '2024/06/1st-mockup.png',
  imageAlt: '',
  /**
   * On the old site all six repeated "System integration refers to the process
   * of bringing together different subsystems or components in order." These
   * replace that placeholder, one per service.
   */
  services: [
    {
      icon: '2024/06/icon1.svg',
      title: 'System Integration',
      body: 'We connect switches, billing, CRM and messaging platforms into one working system, so data moves between them without manual hand-offs.',
    },
    {
      icon: '2024/06/icon2.svg',
      title: 'Software Development',
      body: 'Custom telecom and business software, from carrier-grade back ends to web and mobile front ends, built around your requirements.',
    },
    {
      icon: '2024/06/icon3.svg',
      title: 'Devops management & training',
      body: 'We set up CI/CD, monitoring and automation for your platforms, and train your team to run them with confidence.',
    },
    {
      icon: '2024/06/icon4.svg',
      title: 'Network design & deployment',
      body: 'Planning, rollout and tuning of IP and telecom networks, from interconnect links to data-centre switching.',
    },
    {
      icon: '2024/06/icon4-1.svg',
      title: 'Cloud infrastructure management',
      body: 'We run and scale your servers and services in the cloud or on premises, with monitoring, backups and security patching.',
    },
    {
      icon: '2024/06/icon5.svg',
      title: 'Cloud API integration',
      body: 'We connect your systems to SMS, voice, payment and other third-party APIs, with the error handling and logging that production traffic needs.',
    },
  ],
};

export const highlights = [
  {
    titleParts: [
      { text: 'Soft Digital Signature', accent: true },
      { text: ' Integration Platform', accent: false },
    ],
    body: 'Our web design team has ample years of experience in the core areas of design to build a website that you need.',
    cta: { label: 'Start a project', href: 'mailto:info@telcobright.com' },
    image: '2024/06/laptopMockup.png',
    imageAlt: '',
    reverse: false,
  },
  {
    titleParts: [
      { text: 'System ', accent: false },
      { text: 'Network Automation', accent: true },
    ],
    body: 'We offer comprehensive support for advanced network automation solutions for faster service delivery, reduced expenses, more secure, stable network. We help service providers to reduce operations costs of modern IP and telecom network which are becoming increasingly complex. We use scripting and modern DevOPs tools to manage and synchronize various network elements in the network.',
    cta: { label: 'Start a Project', href: 'mailto:info@telcobright.com' },
    image: '2024/06/systemNetworkAutomation.png',
    imageAlt: '',
    reverse: true,
  },
];

/**
 * The live page carries this heading with no reviews under it — the testimonial
 * widget was never filled in, and there is no review text anywhere in the
 * WordPress database either.
 *
 * The carousel that renders this is built and ready. Paste real quotes into
 * `items` below and the section appears; while the array is empty the whole
 * section stays out of the page, exactly as it effectively is on the live site.
 * Nothing here is invented — no words are attributed to a client who did not
 * say them.
 */
export const testimonials = {
  eyebrow: 'TESTIMONIALS',
  titleParts: [
    { text: 'Explore Our ', accent: false },
    { text: 'Clients', accent: true },
    { text: ' Review', accent: false },
  ],
  items: [] as {
    quote: string;
    name: string;
    /** Job title, e.g. "Head of Network Operations". */
    role?: string;
    company?: string;
    /** Optional logo or portrait, as a path under public/media. */
    image?: string;
  }[],
};

/**
 * Same story as the testimonials: heading present, gallery empty on the live
 * site. These are Telcobright's own office and team photographs from the media
 * library — no stock imagery. `wide` marks the landscape shots so the grid can
 * give them two columns.
 */
export const gallery = {
  eyebrow: 'GALLERY',
  titleParts: [
    { text: 'Our ', accent: false },
    { text: 'Creative', accent: true },
    { text: ' Environment', accent: false },
  ],
  /**
   * Six distinct photographs, ordered so each row of the four-column grid fills
   * exactly: a `wide` tile takes two columns, so both rows are 2 + 1 + 1 and
   * neither is left with a gap at the end.
   *
   * Two library files are deliberately not here: `group-photo-1.jpeg` is the
   * same team photograph as `group-photo.jpeg` at a tighter crop, and
   * `2024/08/telcobright.jpg` already appears in the hero card further up the
   * page. Everything below is Telcobright's own office — no stock imagery.
   */
  images: [
    { image: '2024/06/Group-1000007240.png', alt: 'The Telcobright wall in the Dhaka office', wide: true },
    { image: '2024/06/Group-1000007238.png', alt: 'The open-plan engineering floor' },
    { image: '2024/06/Group-1000007239.png', alt: 'The meeting room' },

    { image: '2024/06/group-photo.jpeg', alt: 'The Telcobright team', wide: true },
    { image: '2024/06/ceo-office.jpeg', alt: 'A quiet corner of the office' },
    { image: '2024/06/Group-1000007241.png', alt: 'A desk in the Dhaka office' },
  ] as { image: string; alt: string; wide?: boolean }[],
};

export const faq = {
  eyebrow: 'FAQ',
  titleParts: [
    { text: 'Frequently Asked ', accent: false },
    { text: 'Questions', accent: true },
  ],
  items: [
    {
      q: 'How can I track the progress of my project?',
      a: 'We maintain transparent communication throughout the project lifecycle, providing regular updates and progress reports to keep you informed every step of the way.',
    },
    {
      q: 'How can I get a quote for my project?',
      a: 'You can get a quote by contacting us through our website’s contact form, emailing us directly, or calling our customer service line. We’ll discuss your project requirements and provide a detailed quote.',
    },
    {
      q: 'Do you offer support and maintenance services?',
      a: 'Yes, we offer comprehensive support and maintenance services to ensure your software remains up-to-date, secure, and fully functional.',
    },
    {
      q: 'How long does it take to develop a custom software solution?',
      a: 'The development time varies depending on the complexity and scope of the project. We will provide an estimated timeline after discussing your specific requirements.',
    },
    {
      q: 'What technologies do you use for software development?',
      a: 'We use a wide range of technologies including Java, Python, .NET, PHP, JavaScript, React, Angular, and more, ensuring we can meet diverse technical needs.',
    },
    {
      q: 'Can you integrate your solutions with our existing systems?',
      a: 'Yes, we specialize in seamless integration with existing systems, ensuring that our solutions enhance your current infrastructure without disruption.',
    },
    {
      q: 'Do you provide training for your software solutions?',
      a: 'Yes, we offer training sessions to help your team understand and effectively use the software solutions we provide.',
    },
    {
      q: 'What is your approach to data security?',
      a: 'We prioritize data security by implementing robust encryption methods, secure coding practices, and regular security audits to protect your sensitive information.',
    },
  ],
};
