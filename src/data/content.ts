export interface PhotoItem {
  src: string;
  caption: string;
}

export interface MemoryItem {
  title: string;
  text: string;
}

export interface SurpriseContent {
  friendName: string;
  introTitle: string;
  introSubtitle: string;
  introLoadingText: string[];
  introGrowingText: string;
  introButtonText: string;
  bloomRevealText: string;
  bloomContinueText: string;
  messageTitle: string;
  messageBody: string[];
  memoriesTitle: string;
  memories: MemoryItem[];
  photosTitle: string;
  photos: PhotoItem[];
  finalTitle: string;
  finalMessage: string;
  finalRevealLines: string[];
  lastThingButtonText: string;
  lastMessageTitle: string;
  lastMessageSubtitle: string;
}

export const surpriseContent: SurpriseContent = {
  // 1. Friend's Name
  friendName: "Your Friend",

  // 2. Intro Screen (Screen 1)
  introTitle: "Something special...",
  introSubtitle: "Made just for you.",
  introLoadingText: [
    "Preparing something...",
    "Almost ready...",
    "Ready for you."
  ],
  introGrowingText: "Growing something special...",
  introButtonText: "TAP TO BLOOM",

  // 3. Rose Bloom (Screen 2)
  bloomRevealText: "I made this little thing for you.",
  bloomContinueText: "keep going ↓",

  // 4. Personal Message (Screen 3)
  messageTitle: "For you.",
  messageBody: [
    "Sometimes you don't need a special occasion to remind someone that they matter.",
    "So I made this little corner of the internet just for you."
  ],

  // 5. Memories / Appreciation (Screen 4)
  memoriesTitle: "Little things I appreciate about you",
  memories: [
    {
      title: "Your smile",
      text: "Because somehow it makes ordinary moments better."
    },
    {
      title: "Your energy",
      text: "Some people just make a place feel more alive."
    },
    {
      title: "Our memories",
      text: "Even the random, ridiculous moments are worth remembering."
    },
    {
      title: "Just being you",
      text: "No explanation needed."
    }
  ],

  // 6. Photo Memories (Screen 5)
  // Drop your photos into public/photos/ and set their paths here:
  // e.g., "/photos/photo1.jpg"
  photosTitle: "Moments & Memories",
  photos: [
    {
      src: "",
      caption: "One of my favorite memories."
    },
    {
      src: "",
      caption: "Unfiltered laughter and good times."
    },
    {
      src: "",
      caption: "To many more chapters together."
    }
  ],

  // 7. Final Reveal (Screen 6)
  finalTitle: "That's all.",
  finalRevealLines: [
    "That's all.",
    "But I wanted you to know...",
    "You are genuinely special to me.",
    "Thank you for being you. ❤️"
  ],

  // 8. Last Message (Screen 7)
  finalMessage: "I hope this made you smile.",
  lastThingButtonText: "One last thing →",
  lastMessageTitle: "I hope this made you smile.",
  lastMessageSubtitle: "— made with a little code and a lot of thought."
};
