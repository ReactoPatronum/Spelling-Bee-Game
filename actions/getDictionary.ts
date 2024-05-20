import { DICTIONARY_EN_URL, DICTIONARY_TR_URL } from "@/config";
import { Language } from "@/types";

export async function fetchDictionary(language: Language) {
  const URL = language === "tr" ? DICTIONARY_TR_URL : DICTIONARY_EN_URL;
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error("API request failed");
    }
    const words = await res.text();
    const wordArray = words.split("\n");
    return wordArray;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
