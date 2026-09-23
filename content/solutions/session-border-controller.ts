import type { SolutionPage } from '../types';

/**
 * Session Border Controller(SBC)
 *
 * Migrated verbatim from https://telcobright.com/session-border-controllersbc/
 * Blocks appear in the same order, with the same words, as the old page.
 */
export const page: SolutionPage = {
  slug: "session-border-controller",
  title: "Session Border Controller(SBC)",
  subtitle: "Session Border Controller(SBC)",
  summary: "Our Session Border Controller (SBC) offers flexible deployment models with real-time analytics and advanced security features, all within a single software solution.",
  legacyPath: "/session-border-controllersbc/",
  featured: true,
  blocks: [
    { t: 'h', level: 2, id: "single-software-sbc-multiple-deployment-models", text: "Single Software SBC – Multiple Deployment Models", html: "Single Software SBC – Multiple Deployment Models" },
    { t: 'h', level: 2, id: "flexible-deployment", text: "Flexible Deployment", html: "Flexible Deployment" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "Common software across all deployment options",
        "Easy transition between deployment models",
        "Light-weight software footprint",
        "Can be deployed in both cloud based and dedicated hardware",
        "Private cloud support – VMware, KVM, Hyper-V",
      ],
    },
    { t: 'h', level: 2, id: "high-performance-and-scale", text: "High performance and scale", html: "High performance and scale" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "Scales to over 100,000 sessions and 1,000 sessions per second per single instance",
        "Easily deployed and operated through RESTful API to manage all SBC features and functions",
        "State-of-the-art EMS and local management GUI",
        "Native software transcoding",
        "High availability &amp; geo-redundancy",
        "Flexible network-wide licensing and progressive commercial models",
      ],
    },
    { t: 'h', level: 2, id: "applications", text: "Applications", html: "Applications" },
    { t: 'h', level: 2, id: "applications-2", text: "Applications", html: "Applications" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "Interconnecting diverse mobile and fixed networks – IP Multimedia Subsystem (IMS), Voice over LTE (VoLTE), IPX networks, NGN SIP and H.323 networks",
        "Enterprise SIP trunks",
        "Residential and business VoIP services",
        "Hosted Unified Communications (UC) and contact center services",
        "Distributed SIP peering leveraging virtualized environments",
        "IPv4 to IPv6 migration initiatives",
        "Managing multiple peering partners",
        "Traffic cost optimization and service quality improvement",
      ],
    },
    { t: 'h', level: 2, id: "real-time-analytics-and-advanced-security", text: "Real-time Analytics and Advanced Security", html: "Real-time Analytics and Advanced Security" },
    { t: 'h', level: 2, id: "real-time-analytics-and-reporting", text: "Real-time analytics and reporting", html: "Real-time analytics and reporting" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "Real-time search and visualization tools",
        "Reliably and securely extract, process and visualize real-time operational data and media and signaling traffic",
        "Enables better insight into commercial services and technical issues through increased understanding and anticipation of the trends in usage, session performance, and service quality Real-time dashboard and business intelligence reporting",
      ],
    },
    { t: 'h', level: 2, id: "advanced-security-features", text: "Advanced Security Features", html: "Advanced Security Features" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "Topology hiding",
        "Built-in firewall",
        "Dynamic access control lists and black lists",
        "Protection against DoS attacks",
        "Real-time message syntax and semantics inspection",
        "Protection against malformed messages",
        "Encryption, including TLS, IPsec, SRTP",
        "Message flood protection",
        "Rogue RTP detection and bandwidth control",
        "Support for bridging among private-public SIP IP interfaces for multitple legs of a call.",
        "Support for bridging among ipv4-ipv6 SIP IP interfaces for multitple legs of a call.",
        "Adaptive overload and traffic prioritization",
        "Dynamically distribute processor loads across all platform vCPUs while simultaneously protecting each vCPU from overload",
        "High performance through pre-allocating vCPUs to handle specific processing loads",
        "Idle and underutilized computing resources minimized",
      ],
    },
    { t: 'h', level: 2, id: "software-centric-transcoding", text: "Software-centric Transcoding", html: "Software-centric Transcoding" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "Transcoding among G.711, G.722, G.723.1, G.726, G.729, GSM, iLBC, Speex, SILK, Opus, AMR, AMR-WB codecs",
        "Video codec support h.264, h.265, vp8, vp9, mpeg4",
      ],
    },
    { t: 'h', level: 2, id: "flexible-peering-and-access", text: "Flexible Peering and Access", html: "Flexible Peering and Access" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "200K subscribers, more than 1,500 registrations/sec",
        "Access applications in mobile, fixed NGN and IMS/VoLTE networks",
        "Unified Communications, hosted PBX, business and consumer VoIP applications",
      ],
    },
    { t: 'h', level: 2, id: "high-performance-and-scale-2", text: "High Performance and Scale", html: "High Performance and Scale" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "Scales to over 70,000 sessions per instance",
        "High performance to 1,000 sessions per second",
        "High-Availability (1+1) with automatic switchover",
        "1Gb &amp; 10Gb interfaces",
      ],
    },
    { t: 'h', level: 2, id: "advanced-virtualized-media-handling", text: "Advanced Virtualized Media Handling", html: "Advanced Virtualized Media Handling" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "Efficient integrated software-based transcoding",
        "High performance DSP-based transcoding",
        "Extensive CODEC support",
      ],
    },
  ],
};
