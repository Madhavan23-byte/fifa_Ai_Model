/**
 * Mock data for the AI features (Operations Copilot and Fan Assistant)
 */

export const FAN_SUGGESTED_PROMPTS = [
  { id: 1, label: 'Where is my seat?' },
  { id: 2, label: 'Nearest halal food?' },
  { id: 3, label: 'How long until kickoff?' },
  { id: 4, label: 'Medical assistance' },
]

export const COPILOT_SUGGESTED_PROMPTS = [
  { id: 1, label: 'Analyze Gate 3 congestion' },
  { id: 2, label: 'Predict crowd flow at full time' },
  { id: 3, label: 'Review active medical incidents' },
  { id: 4, label: 'Draft delay broadcast' },
]

export const COPILOT_MOCK_CONVERSATION = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'Gate 3 is at 94% capacity. What are the immediate risks and recommended actions?',
    timestamp: '18:42',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: '### Situation Analysis\nGate 3 has exceeded the safe operating threshold (90%). The current inward flow is 470 visitors per hour.\n\n### Primary Risks\n- **Crush hazard** at the turnstiles within 12 minutes.\n- Temperature in the concourse has risen to 28°C, increasing the risk of heat exhaustion.\n\n### Recommended Action Plan\n1. **Open Auxiliary Gate 3B** immediately.\n2. **Deploy 4 additional stewards** from Zone D (currently at 45% capacity) to Gate 3.\n3. **Broadcast a localized alert** to fans approaching Gate 3, redirecting them to Gate 2.',
    timestamp: '18:42',
    actionRequired: true,
  },
]

export const FAN_MOCK_CONVERSATION = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'Where is the nearest halal food stall? I am near section 102.',
    timestamp: '18:50',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: 'The nearest halal food stall is **Crescent Kitchen**, located on Level 1 Concourse near Section 108. \n\nIt is approximately a 3-minute walk from your current location at Section 102. Would you like me to show you the route on the map?',
    timestamp: '18:50',
  }
]
