import { TR_ALPHABET, EN_ALPHABET } from "@/config";

type GenerateLetterCharactersReturn = [string[], string];

const generateRandomNumber = (array: string[]) => {
  return Math.floor(Math.random() * array.length);
};

export function GenerateLetterCharacters(
  language: string
): GenerateLetterCharactersReturn {
  
  const selectedLetters: string[] = [];
  let alphabet: string;
  let mostUsedLetters: string[];

  if (language === "tr") {
    alphabet = TR_ALPHABET;
    //Üretilecek kelime olasılığını arttırmak için.
    mostUsedLetters = ["a", "e", "r", "i", "n", "t", "l", "k", "m", "u"];
  } else if (language === "en") {
    alphabet = EN_ALPHABET;
    mostUsedLetters = ["e", "t", "a", "o", "i", "n", "s", "h", "r", "d"];
  } else {
    alphabet = TR_ALPHABET;
    mostUsedLetters = ["a", "e", "r", "i", "n", "t", "l", "k", "m", "u"];
  }

  //En çok kullanılan harfler dışında kalan harfler
  //Amaç en çok kullanılan ve kalan harfleri eşit bir şekilde seçmek
  const remainingLetters = alphabet
    .split("")
    .filter((letter) => !mostUsedLetters.includes(letter));
  const randomIndexForMiddle = generateRandomNumber(mostUsedLetters);

  //Ortadaki harfi en çok kullanılan harflerden seçip listeden çıkarıyoruz
  const letterInTheMiddle: string = mostUsedLetters[randomIndexForMiddle];

  const remainingMostUsedLetters = mostUsedLetters.filter(
    (letter) => letter !== letterInTheMiddle
  );

  for (let i = 0; i < 6; i++) {
    let getRandomLetterFromArray =
      i % 2 === 0 ? remainingMostUsedLetters : remainingLetters;

    const randomIndex = generateRandomNumber(getRandomLetterFromArray);
    const randomLetter = getRandomLetterFromArray[randomIndex];
    if (!selectedLetters.includes(randomLetter)) {
      selectedLetters.push(randomLetter);
      getRandomLetterFromArray.splice(randomIndex, 1); // Seçilen harfi çıkar
    }
  }

  //Seçilen harfler birbirinden farklı değil ise fonksiyonu tekrar çalıştır.
  const check: boolean =
    new Set([...selectedLetters.concat(letterInTheMiddle)]).size === 7;

  if (check) return [selectedLetters, letterInTheMiddle];
  else return GenerateLetterCharacters(language);
}
