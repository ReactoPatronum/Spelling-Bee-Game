import { useAppSelector } from "@/redux/store";
import React from "react";

type InputStateProps = {
  setInputState: (value: string) => void;
};

const Honeycombs = ({ setInputState }: InputStateProps) => {
  const { letters, centerLetter } = useAppSelector((state) => state.gameSlice);

  const handleClick = (i: number) => {
    //@ts-ignore
    setInputState((prev) => prev.concat(letters[i]));
  };

  const positions = [
    { pos: "top-2 left-1/2", trans: "-translate-x-1/2" },
    {
      pos: "top-1/4 right-4",
      trans: "translate-y-1/2 -translate-x-full",
    },
    {
      pos: "bottom-1/4 right-4",
      trans: "translate-y-1/2 -translate-x-full",
    },
    { pos: "bottom-2 left-1/2", trans: "-translate-x-1/2" },
    { pos: "bottom-1/4 left-4", trans: "translate-y-1/2" },
    { pos: "top-1/4 left-4", trans: "translate-y-1/2" },
  ];

  return (
    <div className="w-52 h-52 rotate-90 mt-12">
      <div className="flex items-center justify-center h-full w-full">
        <div
          //@ts-ignore
          onClick={() => setInputState((prev) => prev.concat(centerLetter))}
          className="honeycomb bg-yellow-500 h-20 w-24 dark:text-slate-500  active:scale-75 transition-all duration-200 
    cursor-pointer flex items-center justify-center absolute"
        >
          <p className="-rotate-90 text-2xl font-semibold">
            {centerLetter?.toLocaleUpperCase("tr")}
          </p>
        </div>
      </div>
      
      {positions.map(({ pos, trans }, i) => (
        <div
          onClick={() => handleClick(i)}
          key={i}
          className={`absolute ${pos} transform ${trans} flex items-center justify-center`}
        >
          <div
            className="honeycomb dark:text-slate-500 bg-[#e6e6e6] h-20 w-24  active:scale-75 transition-all duration-200 
    cursor-pointer flex items-center justify-center absolute"
          >
            <p className="-rotate-90 text-2xl font-semibold">
              {letters[i]?.toLocaleUpperCase("tr")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Honeycombs;
