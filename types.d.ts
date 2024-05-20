type Language = "en" | "tr";

interface GameLetters {
    selectedLetters: string[];
    letterInTheMiddle: string;
    selectedWords: string[];
  }
  
  export type { GameLetters,Language };
