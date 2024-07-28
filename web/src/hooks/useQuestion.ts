import { useState } from "react";
import { getQuestion } from "../api/question";
import { getKeyCorrect, getKeyWrong } from "../tools/score";
import { useLocalStorage } from "./useLocalStorage";

interface Question {
  desc: string;
  options: string[];
  correctAnswerIndex: number;
  isComplete?: boolean;
}

const SUBJECTS = [
  "Math Add",
  "Math Subtract",
  "Math Multiply",
  "Math simple equation",
  "Animal world",
  "Ocean life",
  "Forest animals",
  "Pets",
  "Vacation",
  "Travel",
  "Geography",
  "Countries",
  "Paint",
  "Colors",
  "Art",
  "Drawing",
  "School",
  "Learning",
  "Books",
  "Reading",
  "Bluey",
  "Paw Patrol",
  "Peppa Pig",
  "Cartoon characters",
  "Translate to Russian",
  "Translate from Russian",
  "Human body",
  "Health",
  "Food",
  "Nutrition",
  "Sports",
  "Exercise",
  "Outdoor activities",
  "Games",
  "Music",
  "Instruments",
  "Singing",
  "Dancing",
  "Science",
  "Space",
  "Planets",
  "Stars",
  "Weather",
  "Seasons",
  "Climate",
  "Nature",
  "Time",
  "Days of the week",
  "Months",
  "Telling time",
  "Shapes",
  "Sizes",
  "Comparisons",
  "Directions",
];

const getSystemMessage = () =>
  "You are a creative question generator for children. Always strive to create unique and varied questions based on the given subject. Ensure the question is appropriate for a 6-year-old child. Seed: " +
  Date.now();

const getPrompt = (subject: string) =>
  `Generate a random simple question for a 6-year-old child about ${subject}. It can be a general knowledge question, a simple math problem, or a language question. Your reply has to only contain the question and answer options, separated by '|'. The first option should be the correct answer. Keep it very concise, like 'What color is the sky?|Blue|Red|Green'.`;

const getRandomSubject = () => {
  const randomIndex = ~~(Math.random() * SUBJECTS.length);
  return SUBJECTS[randomIndex];
};

function parseAndShuffleQuestion(aiResponse: string): Question {
  const [desc, ...options] = aiResponse.split("|");

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledOptions = shuffleArray([...options]);
  const correctAnswerIndex = shuffledOptions.indexOf(options[0]);

  return {
    desc,
    options: shuffledOptions,
    correctAnswerIndex,
  };
}

export const useQuestion = () => {
  const [correct, setCorrect] = useLocalStorage(getKeyCorrect(), 0);
  const [wrong, setWrong] = useLocalStorage(getKeyWrong(), 0);
  const [question, setQuestion] = useState<Question | undefined>();
  const [pressedIndex, setPressedIndex] = useState<number | undefined>();

  const getNewQuestion = async () => {
    setPressedIndex(undefined);
    const reply = await getQuestion({
      system: getSystemMessage(),
      prompt: getPrompt(getRandomSubject()),
    });
    const q = parseAndShuffleQuestion(reply);
    setQuestion(q);
  };

  const selectOption = (index: number) => {
    if (question?.isComplete) {
      return;
    }
    setPressedIndex(index);
    const isCorrect = index === question?.correctAnswerIndex;
    if (isCorrect) {
      setCorrect(correct + 1);
    } else {
      setWrong(wrong + 1);
    }
    setQuestion({
      ...question!,
      isComplete: true,
    });
    return isCorrect;
  };

  return { question, getNewQuestion, selectOption, pressedIndex };
};
