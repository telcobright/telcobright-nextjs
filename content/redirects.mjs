/**
 * 301s from the legacy WordPress URLs to their new homes.
 *
 * `statusCode: 301` rather than `permanent: true` — the latter emits a 308,
 * which is equivalent for modern crawlers but not understood by every older
 * tool that will follow these links.
 *
 * Keeping these permanent preserves whatever ranking the old pages had and
 * stops inbound links from 404ing. The spam URLs that were injected into the
 * hacked WordPress install are deliberately NOT redirected — they should 410
 * or 404 so Google drops them.
 */
export const redirects = [
  { source: '/telcobright-sms-gateway', destination: '/solutions/sms-gateway', statusCode: 301 },
  { source: '/telcobright-billing-solutions', destination: '/solutions/billing-solutions', statusCode: 301 },
  { source: '/cdr-analyzer-system', destination: '/solutions/cdr-analyzer-system', statusCode: 301 },
  { source: '/common-interconnection-sms', destination: '/solutions/common-interconnection-sms', statusCode: 301 },
  {
    source: '/mobile-app-for-chat-instant-messaging-and-webrtc-based-audio-and-video-features',
    destination: '/solutions/mobile-app-development',
    statusCode: 301,
  },
  { source: '/ip-pbx-and-webrtc', destination: '/solutions/ip-pbx-and-webrtc', statusCode: 301 },
  { source: '/voice-broadcasting', destination: '/solutions/voice-broadcasting', statusCode: 301 },
  { source: '/session-border-controllersbc', destination: '/solutions/session-border-controller', statusCode: 301 },
  { source: '/sms', destination: '/solutions/sms-gateway', statusCode: 301 },
  { source: '/blog-landing-page-ebook-v1', destination: '/', statusCode: 301 },
  { source: '/maintenance', destination: '/', statusCode: 301 },
];
