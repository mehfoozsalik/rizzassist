import type { AssessmentDefinition } from '../types';
import { q, SHARED_FAQS } from '../helpers';

export const confidenceTest: AssessmentDefinition = {
  id: 'confidence',
  slug: 'confidence-test',
  title: 'Confidence Test',
  shortTitle: 'Confidence',
  category: 'confidence',
  description:
    'Discover how confident you feel in social situations, and which habits quietly drain or boost that confidence.',
  whatItMeasures:
    'This assessment looks at social confidence: initiating, recovering from awkwardness, self-trust, and presence. Scores reflect current patterns, not a fixed identity.',
  minutes: 4,
  relatedSlugs: ['social-confidence-test', 'dating-confidence-test', 'first-impression-test', 'charisma-test'],
  faqs: SHARED_FAQS,
  questions: q('conf', [
    { text: 'I trust my judgment in unfamiliar social situations.', dimension: 'confidence' },
    { text: 'I speak up even when I’m not the expert in the room.', dimension: 'confidence' },
    { text: 'I avoid opportunities if there’s a chance of embarrassment.', dimension: 'confidence', reverse: true },
    { text: 'My body language usually matches the confidence I want to project.', dimension: 'charisma' },
    { text: 'I can accept compliments without deflecting.', dimension: 'authenticity' },
    { text: 'I recover within minutes after an awkward moment.', dimension: 'confidence' },
    { text: 'I compare myself harshly to others in social settings.', dimension: 'selfAwareness', reverse: true },
    { text: 'I initiate plans instead of waiting to be invited.', dimension: 'confidence' },
    { text: 'I can hold eye contact comfortably in conversation.', dimension: 'charisma' },
    { text: 'Fear of judgment stops me from sharing opinions.', dimension: 'confidence', reverse: true },
    { text: 'I prepare mentally before important conversations.', dimension: 'selfAwareness' },
    { text: 'I enter rooms with intention rather than shrinking to the edges.', dimension: 'confidence' },
    { text: 'I ask for what I need without excessive apology.', dimension: 'communication' },
    { text: 'Silence from others makes me assume I did something wrong.', dimension: 'emotionalIntelligence', reverse: true },
    { text: 'I take social risks that align with my values.', dimension: 'authenticity' },
    { text: 'I feel grounded when meeting someone impressive.', dimension: 'confidence' },
  ]),
};

export const socialConfidenceTest: AssessmentDefinition = {
  id: 'social-confidence',
  slug: 'social-confidence-test',
  title: 'Social Confidence Test',
  shortTitle: 'Social Confidence',
  category: 'confidence',
  description:
    'Measure how at ease you feel in groups, networking, and everyday social situations.',
  whatItMeasures:
    'Social confidence focuses on group dynamics, initiating chats, and staying present when attention is on you.',
  minutes: 3,
  relatedSlugs: ['confidence-test', 'social-skills-test', 'conversation-skills-test'],
  faqs: SHARED_FAQS,
  questions: q('sc', [
    { text: 'I feel reasonably at ease at parties where I know few people.', dimension: 'confidence' },
    { text: 'I can join a circling conversation without waiting for a perfect opening.', dimension: 'conversation' },
    { text: 'Networking events drain me to the point of avoidance.', dimension: 'confidence', reverse: true },
    { text: 'I introduce people to each other when it makes sense.', dimension: 'socialAwareness' },
    { text: 'I can tell a short story to a group without freezing.', dimension: 'charisma' },
    { text: 'I leave early because I feel out of place.', dimension: 'confidence', reverse: true },
    { text: 'I remember names and use them naturally.', dimension: 'listening' },
    { text: 'I can host or co-host without spiraling about details.', dimension: 'confidence' },
    { text: 'I notice who looks left out and include them.', dimension: 'socialAwareness' },
    { text: 'I stay present instead of planning my exit line.', dimension: 'confidence' },
    { text: 'I enjoy meeting new people more often than I dread it.', dimension: 'charisma' },
    { text: 'I recover if a joke doesn’t land.', dimension: 'confidence' },
  ]),
};

export const datingConfidenceTest: AssessmentDefinition = {
  id: 'dating-confidence',
  slug: 'dating-confidence-test',
  title: 'Dating Confidence Test',
  shortTitle: 'Dating Confidence',
  category: 'confidence',
  description:
    'See how confident you feel texting, flirting, and showing up as yourself on dates.',
  whatItMeasures:
    'Dating confidence covers initiation, handling ambiguity, authenticity on dates, and bouncing back from silence or rejection.',
  minutes: 4,
  relatedSlugs: ['rizz-test', 'dating-personality-test', 'flirting-style-test', 'confidence-test'],
  faqs: SHARED_FAQS,
  questions: q('dc', [
    { text: 'I can send the first message without over-editing for an hour.', dimension: 'datingConfidence' },
    { text: 'Ambiguous replies make me spiral.', dimension: 'datingConfidence', reverse: true },
    { text: 'I show up as myself on dates instead of a curated persona.', dimension: 'authenticity' },
    { text: 'I can flirt lightly without needing a perfect line.', dimension: 'charisma' },
    { text: 'Rejection makes me withdraw from dating for a long time.', dimension: 'datingConfidence', reverse: true },
    { text: 'I state preferences (timing, vibe, intentions) clearly.', dimension: 'communication' },
    { text: 'I enjoy the process of getting to know someone, not only the outcome.', dimension: 'datingConfidence' },
    { text: 'I compare matches constantly and feel behind.', dimension: 'selfAwareness', reverse: true },
    { text: 'I can end a date kindly when there’s no spark.', dimension: 'authenticity' },
    { text: 'Physical attraction makes me lose my conversational footing.', dimension: 'confidence', reverse: true },
    { text: 'I suggest plans confidently instead of “idk up to you.”', dimension: 'datingConfidence' },
    { text: 'I stay curious about them rather than performing.', dimension: 'listening' },
  ]),
};

export const firstImpressionTest: AssessmentDefinition = {
  id: 'first-impression',
  slug: 'first-impression-test',
  title: 'First Impression Assessment',
  shortTitle: 'First Impression',
  category: 'confidence',
  description:
    'Evaluate how you open conversations, present energy, and leave a memorable first impression.',
  whatItMeasures:
    'First impressions here mean opening energy, warmth, clarity, and presence in the first few minutes of meeting someone.',
  minutes: 3,
  relatedSlugs: ['confidence-test', 'charisma-test', 'style-assessment'],
  faqs: SHARED_FAQS,
  questions: q('fi', [
    { text: 'My greeting feels warm without being over-the-top.', dimension: 'charisma' },
    { text: 'I open with something specific rather than only “hey.”', dimension: 'conversation' },
    { text: 'I fidget or look at my phone when I first meet someone.', dimension: 'confidence', reverse: true },
    { text: 'I smile naturally when introducing myself.', dimension: 'charisma' },
    { text: 'I remember to ask their name and use it.', dimension: 'listening' },
    { text: 'I can summarize who I am in a sentence without rambling.', dimension: 'communication' },
    { text: 'Nerves make my voice go quiet or rushed.', dimension: 'confidence', reverse: true },
    { text: 'I make the other person feel noticed quickly.', dimension: 'socialAwareness' },
    { text: 'My appearance usually matches the impression I want to give.', dimension: 'selfAwareness' },
    { text: 'I leave people curious to talk again.', dimension: 'charisma' },
  ]),
};
