"use client";
import React, { useEffect, useState } from "react";
import Honeycomb from "./Honeycomb";
import WordInput from "./WordInput";
import { useGetWordsQuery } from "@/redux/services/gameService";
import ControlButtons from "./ControlButtons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { resetGame } from "@/redux/features/gameSlice";
import Score from "./Score";
import { Summary } from "./Summary";

const Game = () => {
  const { foundWords,validWords } = useAppSelector((state) => state.gameSlice);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [inputState, setInputState] = useState<string>("");

  const { isFetching, refetch } = useGetWordsQuery({
    language: pathname.slice(1),
  });

  useEffect(() => {
    dispatch(resetGame());
  }, [pathname]);

  return isFetching ? (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <Image
        src={
          "https://cdn.pixabay.com/animation/2024/02/23/15/15/15-15-50-56_512.gif"
        }
        alt="bee-gif"
        width={300}
        height={300}
      />

      <p className="text-yellow-500 font-semibold text-center w-[250px] mt-6">
        I&apos;m trying hard to find the appropriate words, please wait.
      </p>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center relative">
      <div className=" w-full">
        <Score />
        <p className="text-sm font-bold my-3 text-yellow-500 text-center">
            {foundWords.length}/{validWords.length} <span className="text-sm">{pathname.slice(1) === "en"
                ? "Founded"
                : "Bulundu"}</span>
          </p>
        <div className="max-w-[310px] relative h-[75px] overflow-y-auto flex-wrap bg-slate-200 mx-auto p-1 rounded-xl flex items-center justify-start">
          
          {foundWords.length > 0 ? (
            foundWords.map((word) => (
              <Badge className="bg-yellow-500 m-1" key={word}>
                {word}
              </Badge>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">
              {pathname.slice(1) === "en"
                ? "Your Words.."
                : "Bulduğunuz Kelimeler"}
            </p>
          )}
        </div>
        <WordInput inputState={inputState} setInputState={setInputState} />
      </div>
      <Honeycomb setInputState={setInputState} />
      <ControlButtons
        refetch={refetch}
        inputState={inputState}
        setInputState={setInputState}
      />
      <Summary refetch={refetch} setInputState={setInputState}/>
    </div>
  );
};

export default Game;
