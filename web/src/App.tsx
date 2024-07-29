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
import { styled } from "./stitches.config";
import { Col, Flex, H1, Row, Text } from "./components/Primitives";
import { Loader } from "./components/Loader";

const AppContainer = styled("div", {
  width: "100dvw",
  height: "100dvh",
  backgroundColor: "#2fc7f9",
  padding: "0.5rem",
  "@bp1": {
    padding: "2rem",
  },
});

const BlueyImageContainer = styled("div", {
  width: 100,
  minWidth: 100,
  "@bp1": {
    minWidth: 150,
    width: 150,
  },
});

function __App({ signOut }: WithAuthenticatorProps) {
  const email = useEmail();
  // const playHey = useRef<() => void>();
  // const playAsk = useRef<() => void>();
  // const playCorrect = useRef<() => void>();
  // const playWrong = useRef<() => void>();

  const {
    loading,
    question,
    getNewQuestion,
    selectOption,
    pressedIndex,
    isPressed,
  } = useQuestion({
    onCorrect: () => {
      // playCorrect.current?.();
    },
    onWrong: () => {
      // playWrong.current?.();
    },
  });

  useEffect(() => {
    // setTimeout(() => {
    //   playHey.current?.();
    // }, 1000);

    setTimeout(() => {
      // playAsk.current?.();
    }, 1000);
  }, []);

  return (
    <AppContainer>
      <Panel>
        <Col css={{ gap: "1.5rem" }}>
          <Row
            css={{
              alignSelf: "end",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Text small>{email}</Text>
            <Button onClick={signOut}>Sign out</Button>
          </Row>
          <Row css={{ justifyContent: "center", gap: "2rem" }}>
            <BlueyImageContainer>
              <BlueyImage />
            </BlueyImageContainer>
            <Score />
          </Row>
          <Row css={{ gap: "1rem" }}></Row>
          <Col
            css={{
              position: "relative",
            }}
          >
            <Col
              css={{
                gap: "0.5rem",
                visibility:
                  (!question || isPressed) && !loading ? "visible" : "hidden",
              }}
            >
              <H1 css={{ textAlign: "center" }}>
                Are you ready for a new question?
              </H1>
              <div style={{ width: 100 }}>
                <Button onClick={getNewQuestion}>Yes</Button>
              </div>
            </Col>
            {loading && (
              <Flex css={{ position: "absolute", margin: "auto" }}>
                <Loader />
              </Flex>
            )}
          </Col>
          {question && (
            <Col
              css={{
                gap: "1rem",
              }}
            >
              <H1 css={{ textAlign: "center" }}>{question.desc}</H1>
              <Row css={{ gap: "0.5rem" }}>
                {question.options.map((option, index) => {
                  const color =
                    isPressed && index === question.correctAnswerIndex
                      ? "success"
                      : index === pressedIndex
                      ? "error"
                      : "default";

                  return (
                    <Button
                      color={color}
                      key={option}
                      disabled={loading}
                      onClick={() => selectOption(index)}
                    >
                      {option}
                    </Button>
                  );
                })}
              </Row>
            </Col>
          )}
          {/* <Audio src="/hey.mp3" playRef={playHey} />
          <Audio src="/ask.mp3" playRef={playAsk} />
          <Audio src="/correct.mp3" playRef={playCorrect} />
          <Audio src="/wrong.mp3" playRef={playWrong} /> */}
        </Col>
      </Panel>
    </AppContainer>
  );
}

export const App = withAuthenticator(__App, {
  socialProviders: ["google"],
});
