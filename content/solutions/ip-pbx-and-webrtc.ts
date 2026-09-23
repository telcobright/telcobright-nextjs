import type { SolutionPage } from '../types';

/**
 * IP PBX and WebRTC
 *
 * Migrated verbatim from https://telcobright.com/ip-pbx-and-webrtc/
 * Blocks appear in the same order, with the same words, as the old page.
 */
export const page: SolutionPage = {
  slug: "ip-pbx-and-webrtc",
  title: "IP PBX and WebRTC",
  subtitle: "IP PBX and WebRTC",
  summary: "The Multi-Tenant Hosted IP PBX service is designed to provide a scalable, reliable, and feature-rich IP-based communication solution for multiple tenants.",
  legacyPath: "/ip-pbx-and-webrtc/",
  featured: true,
  blocks: [
    { t: 'h', level: 2, id: "1-overview", text: "1. Overview", html: "1. Overview" },
    { t: 'p', html: "The Multi-Tenant Hosted IP PBX service is designed to provide a scalable, reliable, and feature-rich IP-based communication solution for multiple tenants. This service will offer advanced telephony features, seamless WebRTC integration, and robust security measures to ensure high-quality voice and video communication." },
    { t: 'h', level: 2, id: "2-core-features", text: "2. Core Features", html: "2. Core Features" },
    { t: 'h', level: 2, id: "2-1-multi-tenancy", text: "2.1 Multi-Tenancy", html: "2.1 Multi-Tenancy" },
    {
      t: 'ul',
      items: [
        "<b>Tenant Isolation:</b> Ensure complete data and configuration isolation between tenants.",
        "<b>Custom Branding:</b> Allow tenants to customize their branding, including logos, colors, and themes.",
        "<b>Scalable Resource Allocation: </b>Dynamically allocate resources based on tenant needs.",
      ],
    },
    { t: 'h', level: 2, id: "2-2-pbx-features", text: "2.2 PBX Features", html: "2.2 PBX Features" },
    {
      t: 'ul',
      items: [
        "<b>Call Management: </b>Call forwarding, call transfer, call hold, call waiting, and call parking.",
        "<b>IVR (Interactive Voice Response):</b> Configurable IVR menus for automated call routing.",
        "<b>Voicemail: </b>Voicemail services with email notifications and visual voicemail.",
        "<b>Auto Attendant:</b> Automated reception service for call routing.",
        "<b>Conference Calling:</b> Audio and video conferencing capabilities.",
        "<b>Ring Groups:</b> Group ringing for specific departments or teams.",
        "<b>Call Recording: </b>On-demand and automatic call recording options.",
      ],
    },
    { t: 'h', level: 2, id: "2-3-webrtc-support", text: "2.3 WebRTC Support", html: "2.3 WebRTC Support" },
    {
      t: 'ul',
      items: [
        "<b>Browser-Based Communication: </b>Enable voice and video calls directly from web browsers without the need for plugins.",
        "<b>Cross-Platform Compatibility:</b> Support for major browsers (Chrome, Firefox, Safari, Edge) and mobile devices.",
        "<b>NAT Traversal:</b> STUN and TURN server integration for seamless connectivity.",
        "<b>Security: </b>DTLS-SRTP encryption for secure WebRTC communication.",
      ],
    },
    { t: 'h', level: 2, id: "3-user-management", text: "3. User Management", html: "3. User Management" },
    {
      t: 'ul',
      items: [
        "<b>Role-Based Access Control (RBAC):</b> Define roles and permissions for administrators, managers, and regular users.",
        "<b>Self-Service Portal:</b> Allow users to manage their settings, voicemail, and call forwarding options.",
        "<b>Directory Services:</b> Integration with LDAP/Active Directory for user authentication and management.",
      ],
    },
    { t: 'h', level: 2, id: "4-administration-and-monitoring", text: "4. Administration and Monitoring", html: "4. Administration and Monitoring" },
    {
      t: 'ul',
      items: [
        "<b>Admin Dashboard:</b> Centralized dashboard for tenant administrators to manage users, call flows, and configurations.",
        "<b>Real-Time Monitoring: </b>Live monitoring of call status, quality metrics, and system performance.",
        "<b>Reporting and Analytics:</b> Detailed call logs, usage reports, and performance analytics.",
        "<b>Alerts and Notifications:</b> Configurable alerts for system events, performance issues, and security incidents.",
      ],
    },
    { t: 'h', level: 2, id: "5-security", text: "5. Security", html: "5. Security" },
    {
      t: 'ul',
      items: [
        "<b>Encryption:</b> TLS/SRTP for voice encryption, HTTPS for web interfaces, and DTLS-SRTP for WebRTC.",
        "<b>Authentication:</b> Strong password policies, multi-factor authentication (MFA), and OAuth support.",
        "<b>Firewall and DDoS Protection:</b> Integrated firewall and DDoS mitigation services.",
        "<b>Compliance:</b> Adherence to GDPR, HIPAA, and other relevant regulatory standards.",
      ],
    },
    { t: 'h', level: 2, id: "6-integration-and-apis", text: "6. Integration and APIs", html: "6. Integration and APIs" },
    {
      t: 'ul',
      items: [
        "<b>RESTful APIs:</b> Comprehensive API suite for integrating with third-party applications and custom solutions.",
        "<b>CRM Integration: </b>Pre-built connectors for popular CRM systems (Salesforce, HubSpot, Zoho).",
        "<b>Email and SMS Gateways: </b>Integration with email and SMS gateways for notifications and alerts.",
      ],
    },
    { t: 'h', level: 2, id: "7-deployment-and-scalability", text: "7. Deployment and Scalability", html: "7. Deployment and Scalability" },
    {
      t: 'ul',
      items: [
        "<b>Cloud Infrastructure: </b>Hosted on a scalable cloud platform (AWS, Azure, Google Cloud).",
        "<b>High Availability: </b>Redundant architecture to ensure 99.999% uptime.",
        "<b>Load Balancing: </b>Automatic load balancing to handle peak traffic and ensure consistent performance.",
        "<b>Disaster Recovery:</b> Backup and disaster recovery plans with geographically dispersed data centers.",
      ],
    },
    { t: 'h', level: 2, id: "8-support-and-maintenance", text: "8. Support and Maintenance", html: "8. Support and Maintenance" },
    {
      t: 'ul',
      items: [
        "<b>24/7 Support:</b> Round-the-clock technical support for all tenants.",
        "<b>Service Level Agreements (SLAs): </b>Defined SLAs with guaranteed response and resolution times.",
        "<b>Regular Updates: </b>Scheduled maintenance and regular updates to ensure the system is up-to-date with the latest features and security patches.",
      ],
    },
    { t: 'h', level: 2, id: "9-webrtc-specifics", text: "9. WebRTC Specifics", html: "9. WebRTC Specifics" },
    {
      t: 'ul',
      items: [
        "<b>WebRTC Gateway: </b>Integration with a WebRTC gateway to handle signaling and media conversion.",
        "<b>Codec Support: </b>Support for audio codecs (Opus, G.711, G.722) and video codecs (VP8, VP9, H.264).",
        "<b>Quality of Service (QoS): </b>QoS policies to prioritize WebRTC traffic for optimal call quality.",
        "<b>Browser SDK:</b> Provide a JavaScript SDK for developers to embed WebRTC capabilities into their web applications.",
      ],
    },
    { t: 'h', level: 2, id: "10-future-enhancements", text: "10. Future Enhancements", html: "10. Future Enhancements" },
    {
      t: 'ul',
      items: [
        "<b>AI and Machine Learning:</b> Implement AI-based features like voice recognition, sentiment analysis, and call analytics.",
        "<b>Unified Communications (UC): </b>Expansion to include instant messaging, presence, and collaborative tools.",
        "<b>IoT Integration:</b> Integration with IoT devices for smart office communication solutions.",
      ],
    },
  ],
};
