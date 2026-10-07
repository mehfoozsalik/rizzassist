import type { AssessmentDefinition } from '../types';
import { q, SHARED_FAQS } from '../helpers';

export const charismaTest: AssessmentDefinition = {
  id: 'charisma',
  slug: 'charisma-test',
  title: 'Charisma Test',
  shortTitle: 'Charisma',
  category: 'social',
  description:
    'Discover how naturally engaging, confident, and socially magnetic your communication style is.',
  whatItMeasures:
    'Charisma here means presence, warmth, expressiveness, and the ability to make others feel engaged — built from habits you can practice, not mystique.',
  minutes: 4,
  relatedSlugs: ['social-skills-test', 'conversation-skills-test', 'confidence-test', 'personality-test'],
  faqs: SHARED_FAQS,
  questions: q('cha', [
    { text: 'People often seem more energized after talking with me.', dimension: 'charisma' },
    { text: 'I express enthusiasm without sounding forced.', dimension: 'charisma' },
    { text: 'I struggle to hold attention when telling a story.', dimension: 'conversation', reverse: true },
    { text: 'I make others feel like the most interesting person in the room.', dimension: 'listening' },
    { text: 'My facial expressions match what I’m saying.', dimension: 'charisma' },
    { text: 'I rely on humor that sometimes misses the room.', dimension: 'socialAwareness', reverse: true },
    { text: 'I can warm up a cold interaction within a few minutes.', dimension: 'charisma' },
    { text: 'I use people’s names and details naturally.', dimension: 'listening' },
    { text: 'I shrink my personality around high-status people.', dimension: 'confidence', reverse: true },
    { text: 'I share opinions in a way that invites dialogue.', dimension: 'communication' },
    { text: 'I notice when energy drops and gently shift the vibe.', dimension: 'socialAwareness' },
    { text: 'Compliments I give feel specific and sincere.', dimension: 'authenticity' },
    { text: 'I can be magnetic without needing to be the loudest.', dimension: 'charisma' },
    { text: 'I leave space for others to shine in group settings.', dimension: 'socialAwareness' },
  ]),
};

export const socialSkillsTest: AssessmentDefinition = {
  id: 'social-skills',
  slug: 'social-skills-test',
  title: 'Social Skills Test',
  shortTitle: 'Social Skills',
  category: 'social',
  description:
    'Assess everyday social skills — reading situations, including others, and navigating group dynamics.',
  whatItMeasures:
    'Social skills cover situational awareness, manners under pressure, inclusion, and flexible conversation habits.',
  minutes: 4,
  relatedSlugs: ['charisma-test', 'conversation-skills-test', 'social-awareness-test', 'listening-skills-test'],
  faqs: SHARED_FAQS,
  questions: q('ss', [
    { text: 'I can sense when it’s a good moment to change topics.', dimension: 'socialAwareness' },
    { text: 'I include quieter people without putting them on the spot.', dimension: 'socialAwareness' },
    { text: 'I dominate conversations without realizing it.', dimension: 'listening', reverse: true },
    { text: 'I navigate disagreements without burning bridges.', dimension: 'emotionalIntelligence' },
    { text: 'I know when to joke and when to be serious.', dimension: 'socialAwareness' },
    { text: 'I overshare personal details too early.', dimension: 'selfAwareness', reverse: true },
    { text: 'I thank people and follow up after favors.', dimension: 'socialAwareness' },
    { text: 'I can exit conversations gracefully.', dimension: 'conversation' },
    { text: 'I misjudge how well I know someone.', dimension: 'socialAwareness', reverse: true },
    { text: 'I adapt to different friend groups without losing myself.', dimension: 'authenticity' },
    { text: 'I notice phone etiquette and put mine away when needed.', dimension: 'socialAwareness' },
    { text: 'I repair small social mistakes quickly.', dimension: 'emotionalIntelligence' },
  ]),
};

export const conversationSkillsTest: AssessmentDefinition = {
  id: 'conversation-skills',
  slug: 'conversation-skills-test',
  title: 'Conversation Skills Assessment',
  shortTitle: 'Conversation Skills',
  category: 'social',
  description:
    'Find out how well you start, deepen, and sustain conversations that feel natural.',
  whatItMeasures:
    'Conversation skills include openings, follow-ups, storytelling balance, and graceful exits.',
  minutes: 4,
  relatedSlugs: ['charisma-test', 'listening-skills-test', 'rizz-test', 'communication-style-test'],
  faqs: SHARED_FAQS,
  questions: q('cs', [
    { text: 'I can start a conversation from almost any context.', dimension: 'conversation' },
    { text: 'My follow-up questions go deeper than surface facts.', dimension: 'listening' },
    { text: 'I run out of things to say after a few minutes.', dimension: 'conversation', reverse: true },
    { text: 'I share stories with a clear point and ending.', dimension: 'communication' },
    { text: 'I notice when the other person wants a turn to speak.', dimension: 'listening' },
    { text: 'I default to interviewing instead of exchanging.', dimension: 'conversation', reverse: true },
    { text: 'I reference earlier parts of the chat to create continuity.', dimension: 'conversation' },
    { text: 'I can revive a dying chat without forcing it.', dimension: 'charisma' },
    { text: 'I ask open questions more than closed ones.', dimension: 'communication' },
    { text: 'I get stuck in “what do you do?” loops.', dimension: 'conversation', reverse: true },
    { text: 'I leave conversations with a clear next step when it matters.', dimension: 'communication' },
    { text: 'People say talking with me feels easy.', dimension: 'charisma' },
  ]),
};

export const socialAwarenessTest: AssessmentDefinition = {
  id: 'social-awareness',
  slug: 'social-awareness-test',
  title: 'Social Awareness Test',
  shortTitle: 'Social Awareness',
  category: 'social',
  description:
    'Measure how well you pick up on social cues, group dynamics, and unspoken expectations.',
  whatItMeasures:
    'Social awareness reflects cue-reading, timing, and adjusting behavior to context without losing authenticity.',
  minutes: 3,
  relatedSlugs: ['social-skills-test', 'emotional-intelligence-test', 'listening-skills-test'],
  faqs: SHARED_FAQS,
  questions: q('saw', [
    { text: 'I can tell when someone wants the conversation to end.', dimension: 'socialAwareness' },
    { text: 'I notice status dynamics in a group.', dimension: 'socialAwareness' },
    { text: 'I miss sarcasm or awkward silence cues.', dimension: 'socialAwareness', reverse: true },
    { text: 'I adjust volume and proximity to the setting.', dimension: 'socialAwareness' },
    { text: 'I sense when a joke would land poorly.', dimension: 'socialAwareness' },
    { text: 'I talk about myself when the moment calls for listening.', dimension: 'listening', reverse: true },
    { text: 'I can read whether interest is polite or genuine.', dimension: 'socialAwareness' },
    { text: 'I notice when I’ve made someone uncomfortable.', dimension: 'emotionalIntelligence' },
    { text: 'I match formality to the room.', dimension: 'socialAwareness' },
    { text: 'I overestimate how much others are thinking about me.', dimension: 'selfAwareness', reverse: true },
  ]),
};

export const listeningSkillsTest: AssessmentDefinition = {
  id: 'listening-skills',
  slug: 'listening-skills-test',
  title: 'Listening Skills Assessment',
  shortTitle: 'Listening Skills',
  category: 'social',
  description:
    'Evaluate how actively you listen — and whether people feel heard when they talk to you.',
  whatItMeasures:
    'Listening skills cover attention, reflection, curiosity, and resisting the urge to redirect every story to yourself.',
  minutes: 3,
  relatedSlugs: ['conversation-skills-test', 'emotional-intelligence-test', 'communication-style-test'],
  faqs: SHARED_FAQS,
  questions: q('ls', [
    { text: 'I put my phone away when someone is speaking to me.', dimension: 'listening' },
    { text: 'I wait until they finish before forming my reply.', dimension: 'listening' },
    { text: 'I jump in with my own story too quickly.', dimension: 'listening', reverse: true },
    { text: 'I reflect emotions (“that sounds tough”) before advice.', dimension: 'emotionalIntelligence' },
    { text: 'I remember key details from past conversations.', dimension: 'listening' },
    { text: 'I ask clarifying questions instead of assuming.', dimension: 'listening' },
    { text: 'I multitask while people talk and miss nuance.', dimension: 'listening', reverse: true },
    { text: 'People thank me for really hearing them.', dimension: 'listening' },
    { text: 'I notice when I’m waiting to talk instead of listening.', dimension: 'selfAwareness' },
    { text: 'I can stay present even if the topic isn’t about me.', dimension: 'listening' },
  ]),
};
