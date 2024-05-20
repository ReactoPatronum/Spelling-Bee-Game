import { fetchDictionary } from "./getDictionary";
import { findWordsMatchingLetters } from "./getValidWords";
import { GameLetters, Language } from "@/types";

export async function startGame(language: Language): Promise<GameLetters> {
  const startTime = performance.now();

  //tüm kelimeleri al
  const words = await fetchDictionary(language);

  //kelimeleri kontrol et
  const wordsMatchingLetters = findWordsMatchingLetters(words, language);

  const endTime = performance.now();
  console.log("Çalışma süresi:", endTime - startTime, "milisaniye");

  if (wordsMatchingLetters.selectedWords.length > 5) {
    return wordsMatchingLetters;
  }

  return startGame(language);
}
