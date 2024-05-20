import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { gameService } from "../services/gameService";
import { toast } from "sonner";

interface gameState {
  validWords: string[];
  letters: string[];
  centerLetter: string;
  score: number;
  maxScore: number;
  foundWords: string[];
  countdown: number;
  status: boolean;
}

const initialState: gameState = {
  validWords: [], // Geçerli kelimeler
  maxScore: 0, //Maximum Skor
  letters: [], // Kullanılabilir harfler
  centerLetter: "", // Ortadaki harf
  score: 0, // Skor
  foundWords: [], // Bulunan kelimeler
  countdown: 60, //Timer
  status: true, // Süre bittimi
};

const gameStateSlice = createSlice({
  name: "spellingBee",
  initialState,
  reducers: {
    addFoundWord(state, action: PayloadAction<string>) {
      const word = action.payload;

      //Kelime listede var mı kontrol et
      if (state.validWords.includes(word) && !state.foundWords.includes(word)) {
        state.foundWords.push(word);
        state.countdown += 15;
        state.score += word.length; // Kelimenin uzunluğu kadar puan ekle

        toast.success("You guessed it right. Congratulations!", {
          position: "bottom-center",
          style: { backgroundColor: "green", color: "wheat" },
        });
      } else {
        toast.warning("Wrong Answer Keep Trying!", {
          position: "bottom-center",
          style: { backgroundColor: "red", color: "wheat" },
        });
      }
    },
    resetGame(state) {
      state.validWords = [];
      state.letters = [];
      state.centerLetter = "";
      state.score = 0;
      state.foundWords = [];
      state.maxScore = 0;
      state.countdown = 60;
      state.status = true;
    },
    decreaseTime(state) {
      state.countdown -= 1;
      //Game Over
      if (state.countdown == 0) {
        state.status = false;
      }
    },
    changeStatus(state) {
      state.status = false;
    },
  },
  //Api çağrısı gerçekleştiğinde state'i güncelle.
  extraReducers(builder) {
    builder.addMatcher(
      gameService.endpoints.getWords.matchFulfilled,
      (state, { payload: { words } }) => {
        console.log(words);

        state.validWords = words.selectedWords;
        state.letters = words.selectedLetters;
        state.centerLetter = words.letterInTheMiddle;
        state.maxScore = words.selectedWords.reduce(
          (totalScore: number, word: string) => totalScore + word.length,
          0
        );
      }
    );
  },
});

export const { addFoundWord, resetGame, decreaseTime, changeStatus } =
  gameStateSlice.actions;

export default gameStateSlice.reducer;
