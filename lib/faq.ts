export interface FaqEntry {
  question: string;
  answer: string;
}

export const FAQS: FaqEntry[] = [
  {
    question: "What is Rizz Assist?",
    answer:
      "Rizz Assist is an AI-powered self-improvement platform. Take personality, confidence, and social skills assessments, use appearance tools like face and body analyzers, and get practical recommendations plus a Personality Improvement Report.",
  },
  {
    question: "Are the personality tests free?",
    answer:
      "Yes. Assessments, full results, recommendations, and the improvement report are free. No account required.",
  },
  {
    question: "Does it generate pickup lines?",
    answer:
      "Yes. Based on your look, style, and the vibe you project, Rizz Assist generates original pickup lines tailored to you not copy-paste clichés.",
  },
  {
    question: "Is my photo stored?",
    answer:
      "Never. Your photo is processed in memory and discarded immediately. No accounts, no storage, no data sold.",
  },
  {
    question: "What should my photo look like?",
    answer:
      "A clear selfie or half-body photo in good lighting works best. Include your outfit if you want style and shades feedback too.",
  },
  {
    question: "Can it really improve my rizz?",
    answer:
      "It gives you the tools better styling, confidence cues, and personalized lines. What you do with them is on you.",
  },
];

export interface FaqGroup {
  category: string;
  items: FaqEntry[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    category: "General",
    items: [
      {
        question: "What is Rizz Assist?",
        answer:
          "Rizz Assist is an AI-powered self-improvement platform for personality, confidence, social skills, dating communication, and appearance tools — including photo analysis and a Personality Improvement Report.",
      },
      {
        question: "Who is Rizz Assist for?",
        answer:
          "Anyone who wants clearer self-awareness, stronger social confidence, better dating communication, or practical appearance/grooming guidance. No account required.",
      },
      {
        question: "Is Rizz Assist free?",
        answer:
          "Yes. Tools, assessments, full results, and the improvement report are free. No subscription required.",
      },
    ],
  },
  {
    category: "Assessments",
    items: [
      {
        question: "What do the personality and confidence tests measure?",
        answer:
          "They score patterns across dimensions like confidence, communication, charisma, social awareness, and authenticity based on your answers. They are practical reflection tools — not clinical diagnoses.",
      },
      {
        question: "How long do assessments take?",
        answer:
          "Most take about 3–5 minutes. You answer one statement at a time with a progress indicator and can go back.",
      },
      {
        question: "Can I retake assessments and track progress?",
        answer:
          "Yes. Results can be saved on your device in My Profile so you can compare scores over time.",
      },
      {
        question: "Is my assessment data private?",
        answer:
          "Answers are scored in your browser. Saved results stay on your device unless you clear them.",
      },
    ],
  },
  {
    category: "The Analysis",
    items: [
      {
        question: "What does Rizz Assist analyze in my photo?",
        answer:
          "The AI reviews your facial structure, expression, grooming, outfit colors and fit, and overall presentation to build your Rizz Report.",
      },
      {
        question: "How does it generate pickup lines?",
        answer:
          "Based on the vibe, confidence level, and style signals your photo projects, the AI crafts personalized pickup lines suited to your look not generic templates.",
      },
      {
        question: "How does it recommend shades?",
        answer:
          "The AI identifies your face shape from the photo and matches it against frame styles known to complement that structure oval, square, heart, round, and others.",
      },
      {
        question: "How accurate is the style analysis?",
        answer:
          "The AI applies visual styling principles consistently and objectively. Treat results as strong guidance rather than absolute rules personal taste always has a seat at the table.",
      },
    ],
  },
  {
    category: "Privacy & Data",
    items: [
      {
        question: "Is my photo stored?",
        answer:
          "No. Your photo is processed in memory only and discarded immediately after your results are generated. Nothing is stored on our servers.",
      },
      {
        question: "Do you sell my data?",
        answer:
          "Never. We collect no personal information, and your photo is never retained or shared.",
      },
      {
        question: "What happens if I close the tab?",
        answer:
          "The photo preview disappears from your browser. No server-side deletion is necessary because nothing was ever saved.",
      },
    ],
  },
  {
    category: "Results",
    items: [
      {
        question: "Can AI really improve my rizz?",
        answer:
          "It gives you the ingredients better styling, the right shades, sharper angles, and personalized lines. Your rizz is the multiplier.",
      },
      {
        question: "Should I use these pickup lines exactly as written?",
        answer:
          "They're a starting point and inspiration. Personalizing them to your own voice and context always makes them land better.",
      },
      {
        question: "Is this better than asking a friend?",
        answer:
          "Faster, unfiltered, and available 24/7. A great complement to honest friends not a replacement.",
      },
    ],
  },
];

export const ALL_FAQS: FaqEntry[] = FAQ_GROUPS.flatMap((g) => g.items);
