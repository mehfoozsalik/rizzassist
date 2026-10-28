import type { AssessmentDefinition } from '../types';
import { q, SHARED_FAQS } from '../helpers';

export const personalityTest: AssessmentDefinition = {
  id: 'personality',
  slug: 'personality-test',
  title: 'Personality Test',
  shortTitle: 'Personality',
  category: 'personality',
  description:
    'Discover your personality traits, communication style, social strengths, and areas for improvement with our AI-powered assessment.',
  whatItMeasures:
    'The RizzAssist Personality Assessment looks at how you communicate, show up socially, and approach relationships across confidence, authenticity, awareness, and emotional skills. It is a practical reflection tool, not a clinical personality inventory.',
  minutes: 5,
  relatedSlugs: ['confidence-test', 'communication-style-test', 'charisma-test', 'emotional-intelligence-test'],
  faqs: [
    {
      question: 'What does the personality test measure?',
      answer:
        'It measures patterns in confidence, communication, charisma, social awareness, emotional intelligence, authenticity, and conversation habits based on your answers.',
    },
    ...SHARED_FAQS,
  ],
  questions: q('pers', [
    { text: 'I usually feel comfortable being myself around new people.', dimension: 'authenticity' },
    { text: 'I adjust how I communicate depending on who I’m talking to.', dimension: 'socialAwareness' },
    { text: 'I can describe my strengths and weaknesses without much hesitation.', dimension: 'selfAwareness' },
    { text: 'In group settings, I often wait for others to start conversations.', dimension: 'confidence', reverse: true },
    { text: 'People tend to open up to me relatively quickly.', dimension: 'charisma' },
    { text: 'I notice when someone’s mood shifts mid-conversation.', dimension: 'emotionalIntelligence' },
    { text: 'I prefer honest disagreement over polite silence.', dimension: 'authenticity' },
    { text: 'I can explain my point clearly even when I’m nervous.', dimension: 'communication' },
    { text: 'I ask follow-up questions more often than I talk about myself.', dimension: 'listening' },
    { text: 'I replay conversations afterward and overthink what I said.', dimension: 'confidence', reverse: true },
    { text: 'I can keep a conversation going when small talk runs out.', dimension: 'conversation' },
    { text: 'I know what environments drain my energy versus energize me.', dimension: 'selfAwareness' },
    { text: 'I mirror other people’s energy without losing my own style.', dimension: 'charisma' },
    { text: 'I struggle to read whether someone is interested or just being polite.', dimension: 'socialAwareness', reverse: true },
    { text: 'I recover quickly after an awkward moment.', dimension: 'confidence' },
    { text: 'I validate people’s feelings before offering solutions.', dimension: 'emotionalIntelligence' },
    { text: 'My stories have a clear point and don’t ramble.', dimension: 'communication' },
    { text: 'I remember details people shared in previous conversations.', dimension: 'listening' },
    { text: 'I would rather be liked for who I am than impress everyone.', dimension: 'authenticity' },
    { text: 'I can name what I’m feeling in the moment.', dimension: 'selfAwareness' },
    { text: 'Starting conversations with strangers feels natural to me.', dimension: 'conversation' },
    { text: 'I notice when I’ve been dominating a conversation.', dimension: 'socialAwareness' },
    { text: 'I stay composed when plans change unexpectedly.', dimension: 'emotionalIntelligence' },
    { text: 'People say I’m easy to talk to.', dimension: 'charisma' },
  ]),
};

export const communicationStyleTest: AssessmentDefinition = {
  id: 'communication-style',
  slug: 'communication-style-test',
  title: 'Communication Style Test',
  shortTitle: 'Communication Style',
  category: 'personality',
  description:
    'Understand how you express yourself, listen, and connect, and where your style helps or holds you back.',
  whatItMeasures:
    'This assessment maps your communication habits: clarity, listening, emotional tone, and conversational balance. Results suggest style preferences, not fixed labels.',
  minutes: 4,
  relatedSlugs: ['personality-test', 'conversation-skills-test', 'listening-skills-test', 'charisma-test'],
  faqs: SHARED_FAQS,
  questions: q('comm', [
    { text: 'I say what I mean without excessive hedging.', dimension: 'communication' },
    { text: 'I check that the other person understood me before moving on.', dimension: 'communication' },
    { text: 'I interrupt when I already know what someone will say.', dimension: 'listening', reverse: true },
    { text: 'I use examples and stories to make points stick.', dimension: 'conversation' },
    { text: 'Tone of voice matters as much as my words to me.', dimension: 'emotionalIntelligence' },
    { text: 'I adapt formality based on the setting.', dimension: 'socialAwareness' },
    { text: 'I avoid conflict even when something bothers me.', dimension: 'authenticity', reverse: true },
    { text: 'I paraphrase others to confirm understanding.', dimension: 'listening' },
    { text: 'I can disagree without making it personal.', dimension: 'communication' },
    { text: 'Silence during conversation makes me rush to fill it.', dimension: 'confidence', reverse: true },
    { text: 'I notice when my message lands poorly and course-correct.', dimension: 'socialAwareness' },
    { text: 'I prefer texts that are clear over texts that are clever.', dimension: 'authenticity' },
    { text: 'I ask clarifying questions before assuming intent.', dimension: 'listening' },
    { text: 'My explanations tend to be longer than they need to be.', dimension: 'communication', reverse: true },
    { text: 'I match the other person’s pace in conversation.', dimension: 'charisma' },
    { text: 'I can give feedback that is direct and kind.', dimension: 'emotionalIntelligence' },
  ]),
};

export const selfAwarenessTest: AssessmentDefinition = {
  id: 'self-awareness',
  slug: 'self-awareness-test',
  title: 'Self-Awareness Assessment',
  shortTitle: 'Self-Awareness',
  category: 'personality',
  description:
    'See how clearly you understand your habits, triggers, strengths, and social impact on others.',
  whatItMeasures:
    'Self-awareness here means recognizing your patterns under social pressure, energy, emotions, and how others may experience you. It is reflective, not diagnostic.',
  minutes: 4,
  relatedSlugs: ['personality-test', 'emotional-intelligence-test', 'confidence-test'],
  faqs: SHARED_FAQS,
  questions: q('sa', [
    { text: 'I can name what I’m feeling within a few seconds.', dimension: 'selfAwareness' },
    { text: 'I know which topics make me defensive.', dimension: 'selfAwareness' },
    { text: 'I understand how my mood affects people around me.', dimension: 'socialAwareness' },
    { text: 'I often realize too late that I overreacted.', dimension: 'emotionalIntelligence', reverse: true },
    { text: 'I can list three personal strengths without fishing for compliments.', dimension: 'confidence' },
    { text: 'I seek feedback even when it might sting.', dimension: 'authenticity' },
    { text: 'I notice when I’m performing a version of myself.', dimension: 'authenticity' },
    { text: 'I know my limits for social battery.', dimension: 'selfAwareness' },
    { text: 'I can spot my own excuses in retrospect.', dimension: 'selfAwareness' },
    { text: 'I confuse confidence with arrogance sometimes.', dimension: 'socialAwareness', reverse: true },
    { text: 'I reflect on conversations to improve, not only to criticize myself.', dimension: 'emotionalIntelligence' },
    { text: 'I know what I want from friendships and dating.', dimension: 'selfAwareness' },
  ]),
};

export const emotionalIntelligenceTest: AssessmentDefinition = {
  id: 'emotional-intelligence',
  slug: 'emotional-intelligence-test',
  title: 'Emotional Intelligence Test',
  shortTitle: 'Emotional Intelligence',
  category: 'personality',
  description:
    'Assess how well you recognize emotions in yourself and others, and how you respond under social pressure.',
  whatItMeasures:
    'This tool reflects everyday emotional skills: noticing feelings, regulating reactions, and responding with empathy. It is not a clinical EQ diagnosis.',
  minutes: 4,
  relatedSlugs: ['personality-test', 'self-awareness-test', 'social-skills-test', 'listening-skills-test'],
  faqs: SHARED_FAQS,
  questions: q('ei', [
    { text: 'I notice subtle emotional cues in facial expressions and tone.', dimension: 'emotionalIntelligence' },
    { text: 'When I’m upset, I can still choose a constructive response.', dimension: 'emotionalIntelligence' },
    { text: 'I get stuck in rumination after social friction.', dimension: 'selfAwareness', reverse: true },
    { text: 'Friends come to me when they need to vent.', dimension: 'listening' },
    { text: 'I can sit with someone else’s discomfort without fixing it immediately.', dimension: 'emotionalIntelligence' },
    { text: 'Criticism makes me shut down for a while.', dimension: 'confidence', reverse: true },
    { text: 'I apologize when I’ve hurt someone, without over-explaining.', dimension: 'authenticity' },
    { text: 'I misread sarcasm or jokes fairly often.', dimension: 'socialAwareness', reverse: true },
    { text: 'I celebrate others’ wins without envy taking over.', dimension: 'emotionalIntelligence' },
    { text: 'I can de-escalate tension in a conversation.', dimension: 'communication' },
    { text: 'I recognize when stress is changing how I treat people.', dimension: 'selfAwareness' },
    { text: 'I give people the benefit of the doubt before assuming bad intent.', dimension: 'socialAwareness' },
  ]),
};
