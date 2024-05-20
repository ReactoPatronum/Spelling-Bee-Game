import { GenerateLetterCharacters } from "./generateRandomLetters";

// Bir stringde boşluk olup olmadığını kontrol eden fonksiyon
function checkWhitespace(str: string): boolean {
  return /\s/.test(str);
}

// Kontrol edilecek kelimenin içinde seçilen harfler dışında bir harf var mı kontrol ediliyor
function Intersection(
  word: string,
  lettersToCheck: string[],
  selectedWords: string[]
): void {
  
  const checkTheWord = Array.from(word).every((char) =>
    lettersToCheck.includes(char)
  );

  if (checkTheWord && word.length > 3) {
    selectedWords.push(word);
  }
}

export function findWordsMatchingLetters(words: string[], language: string) {
  const [selectedLetters, letterInTheMiddle] =
    GenerateLetterCharacters(language);

  const lettersToCheck = selectedLetters.concat(letterInTheMiddle);
  const selectedWords: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();
    if (
      word.length < 4 ||
      !word.includes(letterInTheMiddle) ||
      checkWhitespace(word)
    ) {
      continue;
    }

    Intersection(word, lettersToCheck, selectedWords);
  }

  console.log({ selectedLetters, letterInTheMiddle, selectedWords });

  return { selectedLetters, letterInTheMiddle, selectedWords }; 
}
