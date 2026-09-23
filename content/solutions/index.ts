import type { SolutionPage } from '../types';
import { page as smsGateway } from './sms-gateway';
import { page as billingSolutions } from './billing-solutions';
import { page as cdrAnalyzerSystem } from './cdr-analyzer-system';
import { page as commonInterconnectionSms } from './common-interconnection-sms';
import { page as mobileAppDevelopment } from './mobile-app-development';
import { page as ipPbxAndWebrtc } from './ip-pbx-and-webrtc';
import { page as voiceBroadcasting } from './voice-broadcasting';
import { page as sessionBorderController } from './session-border-controller';

/**
 * Order matches the "Product and solutions we provide" card list on the home
 * page of telcobright.com.
 */
export const solutions: SolutionPage[] = [
  smsGateway,
  billingSolutions,
  cdrAnalyzerSystem,
  commonInterconnectionSms,
  mobileAppDevelopment,
  ipPbxAndWebrtc,
  voiceBroadcasting,
  sessionBorderController,
];

export const featuredSolutions = solutions.filter((s) => s.featured);

export function getSolution(slug: string): SolutionPage | undefined {
  return solutions.find((s) => s.slug === slug);
}
