export interface PhotoItem {
  id?: string;
  src: string;
  title?: string;
  caption: string;
  date?: string;
  category?: 'Favorites' | 'Adventures' | 'Moments';
  aspectRatio?: 'portrait' | 'landscape' | 'square';
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
  photosSubtitle?: string;
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

  // 6. Photo Gallery Album (Screen 5 & Direct Access)
  // Drop your photos into public/photos/ (e.g. photo1.jpg, photo2.jpg)
  // and set their paths here: e.g. "/photos/photo1.jpg"
  photosTitle: "Moments & Memories",
  photosSubtitle: "A collection of times worth remembering",
  photos: [
    {
      id: "photo-1",
      src: "",
      title: "Favorite Memory",
      caption: "One of my all-time favorite memories with you.",
      date: "Special Day",
      category: "Favorites",
      aspectRatio: "portrait",
    },
    {
      id: "photo-2",
      src: "",
      title: "Unfiltered Laughs",
      caption: "Unfiltered laughter and times we couldn't stop smiling.",
      date: "Good Times",
      category: "Moments",
      aspectRatio: "square",
    },
    {
      id: "photo-3",
      src: "",
      title: "On the Road",
      caption: "The spontaneous trips and adventures that turned into great stories.",
      date: "Adventure",
      category: "Adventures",
      aspectRatio: "portrait",
    },
    {
      id: "photo-4",
      src: "",
      title: "Everyday Magic",
      caption: "Quiet coffee talks and conversations that felt effortless.",
      date: "Golden Hour",
      category: "Moments",
      aspectRatio: "landscape",
    },
    {
      id: "photo-5",
      src: "",
      title: "Best Crew",
      caption: "Surrounded by good energy, celebrating small wins together.",
      date: "Celebration",
      category: "Favorites",
      aspectRatio: "square",
    },
    {
      id: "photo-6",
      src: "",
      title: "Next Chapters",
      caption: "To many more chapters, travels, and unforgettable moments ahead.",
      date: "Always",
      category: "Adventures",
      aspectRatio: "portrait",
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
