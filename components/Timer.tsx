import { changeStatus, decreaseTime } from "@/redux/features/gameSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";

const Timer = () => {
  const { countdown } = useAppSelector((state) => state.gameSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        dispatch(decreaseTime());
      } else {
        clearInterval(timer);
        dispatch(changeStatus());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="rounded-full border-2 bg-slate-400 flex items-center justify-center h-10 w-10 border-slate-600 font-semibold">
      <span className={`${countdown > 10 ? "text-gray-100" : "text-red-600 animate-bounce"}`}>
        {countdown}
      </span>
    </div>
  );
};

export default Timer;
