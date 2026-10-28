import type { AssessmentDefinition } from '../types';
import { q, SHARED_FAQS } from '../helpers';

export const rizzTest: AssessmentDefinition = {
  id: 'rizz',
  slug: 'rizz-test',
  title: 'Rizz Test',
  shortTitle: 'Rizz',
  category: 'dating',
  description:
    'Understand your conversation chemistry, flirting comfort, and dating strengths, then get practical ways to improve.',
  whatItMeasures:
    '“Rizz” here means dating communication skill: timing, playfulness, authenticity, and confident interest, not manipulation.',
  minutes: 4,
  relatedSlugs: ['dating-personality-test', 'flirting-style-test', 'dating-confidence-test', 'conversation-skills-test'],
  faqs: SHARED_FAQS,
  questions: q('rizz', [
    { text: 'I can show romantic interest without becoming overly intense.', dimension: 'datingConfidence' },
    { text: 'Banter comes fairly naturally to me.', dimension: 'charisma' },
    { text: 'I freeze when someone attractive gives me attention.', dimension: 'datingConfidence', reverse: true },
    { text: 'My texts feel playful and clear, not needy.', dimension: 'communication' },
    { text: 'I escalate from chat to plans without endless messaging.', dimension: 'datingConfidence' },
    { text: 'I rely on pickup lines more than genuine curiosity.', dimension: 'authenticity', reverse: true },
    { text: 'I can tease lightly without crossing boundaries.', dimension: 'socialAwareness' },
    { text: 'Silence after a good date makes me panic-text.', dimension: 'datingConfidence', reverse: true },
    { text: 'I listen for what they care about and follow that thread.', dimension: 'listening' },
    { text: 'I create memorable moments rather than interviewing them.', dimension: 'charisma' },
    { text: 'I know when chemistry isn’t mutual and step back gracefully.', dimension: 'socialAwareness' },
    { text: 'I feel proud of how I show up on dates.', dimension: 'authenticity' },
  ]),
};

export const datingPersonalityTest: AssessmentDefinition = {
  id: 'dating-personality',
  slug: 'dating-personality-test',
  title: 'Dating Personality Test',
  shortTitle: 'Dating Personality',
  category: 'dating',
  description:
    'Map how you approach dating, attachment-style habits, communication, and what you need to feel secure.',
  whatItMeasures:
    'Dating personality reflects patterns in closeness, communication, and decision-making. It is reflective guidance, not a clinical attachment diagnosis.',
  minutes: 4,
  relatedSlugs: ['rizz-test', 'dating-confidence-test', 'personality-test', 'flirting-style-test'],
  faqs: SHARED_FAQS,
  questions: q('dp', [
    { text: 'I move toward connection when I like someone rather than playing games.', dimension: 'authenticity' },
    { text: 'I need a lot of reassurance early on.', dimension: 'datingConfidence', reverse: true },
    { text: 'I communicate expectations clearly.', dimension: 'communication' },
    { text: 'I pull away when things start to feel real.', dimension: 'selfAwareness', reverse: true },
    { text: 'I choose partners based on values, not only chemistry.', dimension: 'selfAwareness' },
    { text: 'Ambiguity in dating feels unbearable quickly.', dimension: 'emotionalIntelligence', reverse: true },
    { text: 'I can enjoy dating casually without leading people on.', dimension: 'authenticity' },
    { text: 'I ghost when I’m unsure how to end things.', dimension: 'communication', reverse: true },
    { text: 'I share vulnerably at a pace that feels mutual.', dimension: 'emotionalIntelligence' },
    { text: 'I stay curious about their life beyond the spark.', dimension: 'listening' },
    { text: 'I know my dealbreakers and honor them.', dimension: 'selfAwareness' },
    { text: 'I can be warm without losing my standards.', dimension: 'datingConfidence' },
  ]),
};

export const flirtingStyleTest: AssessmentDefinition = {
  id: 'flirting-style',
  slug: 'flirting-style-test',
  title: 'Flirting Style Test',
  shortTitle: 'Flirting Style',
  category: 'dating',
  description:
    'Discover whether your flirting leans playful, sincere, bold, or reserved, and how to use it well.',
  whatItMeasures:
    'Flirting style looks at playfulness, sincerity, boldness, and comfort with mutual interest signals.',
  minutes: 3,
  relatedSlugs: ['rizz-test', 'dating-confidence-test', 'charisma-test'],
  faqs: SHARED_FAQS,
  questions: q('fl', [
    { text: 'Playful teasing is one of my natural flirting tools.', dimension: 'charisma' },
    { text: 'I show interest through sincere compliments more than jokes.', dimension: 'authenticity' },
    { text: 'I wait for clear signals before showing interest.', dimension: 'datingConfidence', reverse: true },
    { text: 'I can hold flirtatious eye contact.', dimension: 'charisma' },
    { text: 'My flirting sometimes comes off as just friendliness.', dimension: 'communication', reverse: true },
    { text: 'I escalate flirting only when it’s mutual.', dimension: 'socialAwareness' },
    { text: 'I enjoy light physical proximity when appropriate.', dimension: 'datingConfidence' },
    { text: 'I overdo humor to hide nerves.', dimension: 'selfAwareness', reverse: true },
    { text: 'I can say “I like talking with you” directly.', dimension: 'authenticity' },
    { text: 'Flirting feels fun more often than stressful.', dimension: 'datingConfidence' },
  ]),
};

export const conversationAnalyzer: AssessmentDefinition = {
  id: 'conversation-analyzer',
  slug: 'conversation-analyzer',
  title: 'Conversation Analyzer',
  shortTitle: 'Conversation Analyzer',
  category: 'dating',
  description:
    'Reflect on how your chats land, clarity, curiosity, pacing, and whether you create real connection.',
  whatItMeasures:
    'This self-assessment mirrors how you analyze dating and social conversations: openings, reciprocity, and next-step clarity.',
  minutes: 3,
  relatedSlugs: ['conversation-skills-test', 'rizz-test', 'first-message-analyzer'],
  faqs: SHARED_FAQS,
  questions: q('ca', [
    { text: 'My messages usually have a clear point or question.', dimension: 'communication' },
    { text: 'I match their message length and energy.', dimension: 'socialAwareness' },
    { text: 'I send walls of text when I’m nervous.', dimension: 'communication', reverse: true },
    { text: 'I ask about their interests before pitching myself.', dimension: 'listening' },
    { text: 'I create a reason to continue the chat.', dimension: 'conversation' },
    { text: 'I double-text out of anxiety rather than value.', dimension: 'datingConfidence', reverse: true },
    { text: 'I use humor that fits their vibe.', dimension: 'charisma' },
    { text: 'I suggest a call or meetup when chat is going well.', dimension: 'datingConfidence' },
    { text: 'I reread messages for tone before sending.', dimension: 'selfAwareness' },
    { text: 'People respond positively to how I chat.', dimension: 'charisma' },
  ]),
};

export const firstMessageAnalyzer: AssessmentDefinition = {
  id: 'first-message',
  slug: 'first-message-analyzer',
  title: 'First Message Analyzer',
  shortTitle: 'First Message',
  category: 'dating',
  description:
    'Assess the habits behind your openers, specificity, warmth, and whether you invite a real reply.',
  whatItMeasures:
    'First-message quality: personalization, low-pressure curiosity, and clarity, scored from your habits, not a pasted message AI scan (unless you use the Rizz Report).',
  minutes: 3,
  relatedSlugs: ['conversation-analyzer', 'rizz-test', 'dating-confidence-test'],
  faqs: SHARED_FAQS,
  questions: q('fm', [
    { text: 'My openers reference something specific in their profile.', dimension: 'communication' },
    { text: 'I avoid generic “hey” as my only opener.', dimension: 'conversation' },
    { text: 'I lead with a question that’s easy to answer.', dimension: 'conversation' },
    { text: 'I try too hard to be clever in the first line.', dimension: 'authenticity', reverse: true },
    { text: 'My opener shows genuine curiosity.', dimension: 'listening' },
    { text: 'I send the same copy-paste opener to everyone.', dimension: 'authenticity', reverse: true },
    { text: 'I keep first messages short and inviting.', dimension: 'communication' },
    { text: 'I can write an opener in under two minutes.', dimension: 'datingConfidence' },
    { text: 'I check tone so I don’t sound intense too fast.', dimension: 'socialAwareness' },
    { text: 'People usually reply to my openers.', dimension: 'charisma' },
  ]),
};
