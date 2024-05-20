import React, { useEffect, useRef } from "react";
import { Input } from "./ui/input";

type InputStateProps = {
  inputState: string;
  setInputState: (value: string) => void;
};


const InputComponent: React.FC<InputStateProps> = ({ inputState, setInputState }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Input
      type="text"
      value={inputState}
      onChange={(e) => setInputState(e.target.value)}
      ref={inputRef}
      className="max-w-[310px] p-6 border-2 border-yellow-300 focus:border-yellow-500 my-5 font-semibold mx-auto  text-center uppercase caret-yellow-500"
    />
  );
};

export default InputComponent;
