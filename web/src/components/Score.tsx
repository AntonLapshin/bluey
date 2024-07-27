import { useLocalStorage } from "../hooks/useLocalStorage";
import { getKeyCorrect, getKeyWrong } from "../tools/score";

export const Score = () => {
  const [correct] = useLocalStorage(getKeyCorrect(), 0);
  const [wrong] = useLocalStorage(getKeyWrong(), 0);

  return (
    <div style={{ fontSize: 21}}>
      {correct} / {correct + wrong}
    </div>
  );
};
