import { useLocalStorage } from "../hooks/useLocalStorage";
import { getKeyCorrect, getKeyWrong } from "../tools/score";

export const Score = () => {
  const [correct] = useLocalStorage(getKeyCorrect(), 0);
  const [wrong] = useLocalStorage(getKeyWrong(), 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 150,
        borderRadius: "100%",
        backgroundColor: "#ff00a9a8",
        border: "10px solid #ffffff69",
        boxShadow: "5px 5px 19px #666666",
        padding: "2rem",
      }}
    >
      <span style={{ fontSize: "3rem", color: "white", lineHeight: 1 }}>
        {correct}
      </span>
      <span style={{ color: "white" }}>out of {correct + wrong}</span>
    </div>
  );
};
