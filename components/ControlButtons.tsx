import React from "react";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { addFoundWord, resetGame } from "@/redux/features/gameSlice";
import Timer from "./Timer";

type InputStateProps = {
  inputState: string;
  setInputState: (value: string) => void;
  refetch: () => void;
};

const ControlButtons: React.FC<InputStateProps> = ({
  inputState,
  setInputState,
  refetch,
}) => {
  const dispatch = useAppDispatch();

  const handleAddWord = () => {
    dispatch(addFoundWord(inputState));
    setInputState("");
  };

  const handleDeleteLastChar = () => {
    setInputState(inputState.slice(0, -1));
  };

  const reset = () => {
    dispatch(resetGame());
    refetch();
    setInputState("");
  };

  return (
    <div className="mt-16 space-x-4 flex items-center justify-center">
      <Button
        onClick={handleDeleteLastChar}
        className="w-20 bg-red-500 hover:bg-red-600"
      >
        Delete
      </Button>
      <Button
        onClick={reset}
        size={"icon"}
        className="w-10 bg-yellow-500 rounded-full hover:bg-yellow-600"
      >
        <RefreshCw />
      </Button>
      <Button
        onClick={handleAddWord}
        className="w-20 bg-green-500 hover:bg-green-600"
      >
        Enter
      </Button>
      <Timer/>
    </div>
  );
};

export default ControlButtons;
