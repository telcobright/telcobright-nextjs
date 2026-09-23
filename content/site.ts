/**
 * Site-wide chrome: header, footer, contact details, social links.
 *
 * Everything here mirrors telcobright.com as it stands. Where the old site
 * pointed a link at "#", it still points at "#" — those pages were never built.
 * See MIGRATION.md ("Dead links kept as-is") before changing that.
 */

export const site = {
  name: 'Telcobright Limited',
  shortName: 'Telcobright',
  tagline: 'Telecom meets modern IT',
  description:
    'Elevate Your Systems to New Heights with Smart, Agile, and Innovative Solutions, Specially Curated for the Demands and Challenges of Modern IT Environments',
  url: 'https://telcobright.com',
  locale: 'en_US',
  contact: {
    address: 'Venus Complex, KHA-199, Level-5, Middle Badda Gulshan, Dhaka 1212, Bangladesh',
    phone: '+880 19411 99607',
    phoneHref: '+8801941199607',
    email: 'info@telcobright.com',
    /** The header's mail icon carried this subject line. */
    mailto: 'mailto:info@telcobright.com?subject=Welcome%20to%20Telcobright%20Limited',
  },
  social: {
    facebook: 'https://www.facebook.com/telcobright/',
    linkedin: 'https://www.linkedin.com/company/telcobright-limited/',
    /**
     * The footer showed a Medium icon but never linked it. Put the URL here and
     * the icon becomes a link; leave it null and it renders exactly as the old
     * footer did — an icon that goes nowhere.
     */
    medium: null as string | null,
  },
  logos: {
    /** The white mark, used by both the dark header and the dark footer. 141x44. */
    header: '2024/01/Frame-4.png',
    footer: '2024/01/Frame-4.png',
  },
  copyright: 'Copyright © 2023 | All Rights Reserved By Telcobright Limited',
} as const;

/** Primary navigation, in the order the live header lists it. */
export const headerNav = [
  {
    label: 'Our Product & Solutions',
    href: '#',
    children: [
      { label: 'SMS Gateway', href: '/solutions/sms-gateway' },
      { label: 'Billing Solutions', href: '/solutions/billing-solutions' },
      { label: 'CDR Analyzer System', href: '/solutions/cdr-analyzer-system' },
      { label: 'Common Interconnection SMS', href: '/solutions/common-interconnection-sms' },
      { label: 'Mobile App Development', href: '/solutions/mobile-app-development' },
    ],
  },
  { label: 'Additional Services', href: '#additional-solutions' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
] as const;

/**
 * Footer columns, reproduced from the live footer including the links that
 * resolve to "#". Nothing was added, removed or re-pointed.
 */
export const footerNav = [
  {
    title: 'Products & Services',
    links: [
      { label: 'SMS Gateway', href: '#' },
      { label: 'Billing Solutions', href: '#' },
      { label: 'Management', href: '#' },
      { label: 'Apps & Others​', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Who we are', href: '#' },
      { label: 'Case Study', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Work with us', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Press Release', href: '#' },
    ],
  },
] as const;

/** The newsletter panel above the footer columns. */
export const newsletter = {
  title: 'Subscribe Our Newsletter',
  body: 'Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.',
};
