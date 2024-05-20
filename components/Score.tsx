import React, { useMemo } from "react";
import { Progress } from "./ui/progress";
import { useAppSelector } from "@/redux/store";
import { Star } from "lucide-react";

const Score = () => {
  const { foundWords, maxScore } = useAppSelector((state) => state.gameSlice);

  function calculateProgress(foundWords: string[], maxScore: number): number {
    const totalScore = foundWords.reduce(
      (totalScore: number, word: string) => totalScore + word.length,
      0
    );
    return (totalScore / maxScore) * 100;
  }

  //Re-render'ı engelle.
  const memoizeScore = useMemo(() => {
    return calculateProgress(foundWords, maxScore);
  }, [foundWords]);

  return (
    <div className="flex items-center justify-center mt-4">
      <Progress className="max-w-[250px] " value={memoizeScore} />
      <p className="text-sm font-semibold text-yellow-500 ml-2">
        {memoizeScore ? memoizeScore?.toFixed(1) : 0}/100
      </p>
      <Star fill="#ffd924" className="w-3 h-3 text-yellow-500"/>
    </div>
  );
};

export default Score;
