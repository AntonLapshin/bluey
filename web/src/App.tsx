import { useRef, useEffect } from "react";
import { BlueyImage } from "./components/BlueyImage";
import { Score } from "./components/Score";
import { Audio } from "./components/Audio";
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import { useEmail } from "./hooks/useEmail";
import { useQuestion } from "./hooks/useQuestion";
import { Panel } from "./components/Panel";
import { Button } from "./components/Button";
import { H1 } from "./components/H1";

function __App({ signOut }: WithAuthenticatorProps) {
  const email = useEmail();
  const { question, getNewQuestion, selectOption, pressedIndex } =
    useQuestion();
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
        // display: "flex",
        // flexDirection: "column",
        // gap: "1rem",
        padding: "2rem",
        backgroundColor: "#2fc7f9",
      }}
    >
      <Panel>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <div>{email}</div>
              <Button onClick={signOut}>Sign out</Button>
            </div>
            <Score />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ minWidth: 200, width: 200 }}>
              <BlueyImage />
            </div>
            {(!question || pressedIndex !== undefined) && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  width: "60%",
                }}
              >
                <H1>Are you ready for a new question?</H1>
                <div style={{ width: 100 }}>
                  <Button onClick={getNewQuestion}>Yes</Button>
                </div>
              </div>
            )}
          </div>
          {question && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <H1>{question.desc}</H1>
              <div style={{ display: "flex", gap: "1rem" }}>
                {question.options.map((option, index) => {
                  const variant =
                    pressedIndex !== undefined
                      ? index === question.correctAnswerIndex
                        ? "success"
                        : "error"
                      : "";

                  return (
                    <Button
                      variant={variant}
                      key={option}
                      onClick={() => selectOption(index)}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
          <Audio src="/hey.mp3" playRef={playHey} />
          <Audio src="/ask.mp3" playRef={playAsk} />
        </div>
      </Panel>
    </div>
  );
}

export const App = withAuthenticator(__App, {
  socialProviders: ["google"],
});
