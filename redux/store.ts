import { configureStore } from "@reduxjs/toolkit";
import gameSliceReducer from "./features/gameSlice";
import { gameService } from "./services/gameService";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [gameService.reducerPath]: gameService.reducer,
    gameSlice: gameSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([gameService.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
