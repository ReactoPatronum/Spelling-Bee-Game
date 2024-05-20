import { startGame } from "@/actions/startGame";
import { NextResponse } from "next/server";
import { GameLetters, Language } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const lang: string | null = searchParams.get("lang");

  const words: GameLetters = await startGame(lang as Language);

  return NextResponse.json({ words });
}
