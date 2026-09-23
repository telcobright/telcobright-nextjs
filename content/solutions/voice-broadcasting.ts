import type { SolutionPage } from '../types';

/**
 * Voice Broadcasting
 *
 * Migrated verbatim from https://telcobright.com/voice-broadcasting/
 * Blocks appear in the same order, with the same words, as the old page.
 */
export const page: SolutionPage = {
  slug: "voice-broadcasting",
  title: "Voice Broadcasting",
  subtitle: "Voice Broadcasting Specifications",
  summary: "Our Voice Broadcasting Solution offers efficient call and email management with predictive dialing, compliance, remote access, call recording, and customizable IVRs. It supports auto-dialing, multi-server use, and integrates with databases and web pages.",
  legacyPath: "/voice-broadcasting/",
  featured: true,
  blocks: [
    { t: 'h', level: 2, id: "voice-broadcasting", text: "Voice Broadcasting", html: "Voice Broadcasting" },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p>Inbound, Outbound and Blended call handling and Inbound Email handling</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Outbound agent-controlled, broadcast and predictive dialing</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Full USA, Canada and UK reegulatory compliance capability</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Web-based agent and administrative interfaces</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to have agents operate remotely</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Integrated call recording</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Three-Way calling within the agent application</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Scheduled Callbacks: Agent-Only and Anyone</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Web-configurable IVRs and Voicemail boxes</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Scalable to hundreds of seats</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to use standard Telco lines and VOIP trunks</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability for an agent to call clients in succession from a database through a web-client</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to display a script for the agent to read with fields like name, address, etc. filled-in</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to set a campaign to auto-dial and send live calls to available agents</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to dial predictively in a campaign with an adaptive dialing algorithm</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to dial on a single campaign across multiple Asterisk servers, or multiple campaigns on a single server</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to transfer calls with customer data to a closer/verifier on the local system or a remote Asterisk server</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to open a custom web page with user data from the call, per campaign</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to autodial campaigns to start with a simple IVR then direct to agent</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to broadcast dial to customers with a pre-recorded message</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to park the customer with custom music per campaign</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to send a dropped call to a voicemail box, queue or extension per campaign if no agent is available</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to set outbound CallerID per campaign or per list</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to take inbound calls gathering CallerID</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to function as an ACD for inbound and fronter/closer verification calls</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to have an agent take both inbound and outbound calls in one session(blended)</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to start and stop recording an agent’s calls at any time</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to automatically record all calls</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to manually or automatically call upto two other customer numbers for the same lead</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Automatically dial unlimited alternate numbers per customer until you get an answer</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to schedule a callback with a customer as either any-agent or agent-specific</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability in Manual dial mode to preview leads before dialing</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability for agents to be logged in remotely anywhere with just a phone and a web browser</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Faster hangup and dispositioning of calls with one key press (HotKeys)</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Definable Agent Wrapup-time per campaign</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to add custom call dispositions per campaign</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to use custom database queries in campaign dialing</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Recycling of specified status calls at a specified interval without resetting a list</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Dialing with custom TimeZone restrictions including per state and per day-of-the-week</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Dialing with Answering Machine Detection, also playing a message for AM calls</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Multiple campaigns and lead-lists are possible</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Option of a drop timer with safe-harbor message for FTC compliance</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Variable drop call percentage when dialing predictively for FTC compliance</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>System-wide and per-campaign DNC lists that can optionally be activated per campaign</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>All calls are logged and statuses of calls are logged as well as agent time breakdowns</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Load Balancing of call across multiple inbound or outbound Asterisk servers is possible</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Agent phone login balancing and failover across multiple ViciDial servers</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Several real-time and summary reports available</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Real-time campaign display screens</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>3rd party conferencing(with DTMF macros and number presets)</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>3rd party blind call transfer</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>3rd party conferencing with agent drop-off</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Custom Music-On-Hold and agent alert sound for inbound calls</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Estimated hold time, place in line, overflow queues and several other inbound-only features</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Skills-based ranking and call routing per inbound group(queues) and campaign</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Queue Prioritization per campaign and inbound group</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Single agent call queueing</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to set user levels and permissions for certain features and campaigns</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability for managers to listen-in on agent conversations</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability for managers to enter conversations with agents and customers</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability for managers to change the selected queues for an agent</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability for agents to select a Pause Code when they are not active</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability for agents to control volume levels and mute themselves</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability for agents to view the statuses of other agents on the system</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability for agents to view details for calls in queue that the agent is selected to take calls from</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability for agents to select and click to take calls in queue from their agent screen</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Agent shift enforcement by day and time, defined per user group</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Full QueueMetrics-compatible call logging, inbound and outbound</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Several Vtiger integration features: user-sync, account-sync, data interconnection</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Full integration with Sangoma Call Progress Detection(CDP) for better Answering Machine Detection(AMD)</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Multi-function web-based agent API allowing for control of agent sessions including click-to-dial outside of the agent screen</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Lead import web-based API</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Web-based data export utilities</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Separate Time-clock application to track user work time</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Web-based administration</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>DID, phone and carrier trunk provisioning through the web interface</p>" },
          ],
        },
      ],
    },
  ],
};
