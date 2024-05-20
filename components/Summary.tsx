import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { resetGame } from "@/redux/features/gameSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Badge } from "./ui/badge";

type ModalStateProps = {
  setInputState: (value: string) => void;
  refetch: () => void;
};

export function Summary({ refetch, setInputState }: ModalStateProps) {
  const dispatch = useAppDispatch();
  const { status, score, foundWords } = useAppSelector(
    (state) => state.gameSlice
  );

  const handleClose = () => {
    dispatch(resetGame());
    refetch();
    setInputState("");
  };
  return (
    <AlertDialog open={!status} onOpenChange={handleClose}>
      <AlertDialogContent className="w-[310px] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Time is Up!</AlertDialogTitle>
          <AlertDialogDescription>
            Your Score is{" "}
            <span className="font-semibold text-green-500">{score}</span>
            <div className="mt-4">
              <span>You Have Found These</span>
              <div>
                {foundWords.length > 0 ? (
                  foundWords.map((word) => (
                    <Badge className="bg-yellow-500 m-1" key={word}>
                      {word}
                    </Badge>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-2 border-yellow-500">
            Play Again
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
