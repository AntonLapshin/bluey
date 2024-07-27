import { useRef, useEffect } from "react";
import { BlueyImage } from "./components/BlueyImage";
import { Score } from "./components/Score";
import { Audio } from "./components/Audio";

function App() {
  const playHey = useRef<() => void>();
  const playAsk = useRef<() => void>();

  useEffect(() => {
    setTimeout(() => {
      // playHey.current?.();
    }, 1000);

    setTimeout(() => {
      // playAsk.current?.();
    }, 5000);
  }, []);

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Score />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ width: "40%" }}>
          <BlueyImage />
        </div>
      </div>
      <Audio src="/hey.mp3" playRef={playHey} />
      <Audio src="/ask.mp3" playRef={playAsk} />
    </div>
  );
}

export default App;
