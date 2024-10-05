import { Prompt } from "@/types/prompt";
import { useEffect, useState } from "react";
import LoadingAnimation from "../LoadingAnimation";
import { motion } from "framer-motion";
import Card from "../Card";

const mockQuestion = {
  question: "why are you gae",
  choices: {
    a: "skibidi toilet",
    b: "rizz",
    c: "HELP ME",
    d: "amboutokum",
  },
  answer: "a",
} as Prompt;

const Questions = () => {
  const [promptObj, setPromptObj] = useState<Prompt | undefined>(undefined);
  const [questionNum, setQuestionNum] = useState(1);
  const [selectedAns, setSelectedAns] = useState("");
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setPromptObj(mockQuestion);
    }, 1000);
  }, []);

  const handleClick = (click: string) => {
    if (result !== null) return;
    setSelectedAns(click);
    if (click === promptObj?.answer) {
      setResult(true);
    } else {
      setResult(false);
    }
  };

  useEffect(() => {
    if (result !== null) {
      setTimeout(() => {
        setPromptObj(undefined);
        setQuestionNum(questionNum + 1);
        setSelectedAns("");
        setResult(null);
      }, 3000);
    }
  }, [result]);

  return (
    <>
      {promptObj ? (
        <motion.div
          key="question"
          className="w-screen h-screen flex flex-col space-y-7 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Card
            className={`w-[660px] max-w-[90%] py-4 px-4 sm:px-7 md:px-10 ${
              result !== null
                ? result
                  ? "bg-mnGreen"
                  : "bg-jasper"
                : "bg-saffron"
            } flex flex-col space-y-3`}
          >
            <p className="font-chewy text-base sm:text-lg md:text-xl text-black text-center">
              Question {questionNum}
            </p>
            <p className="font-chewy text-lg sm:text-xl md:text-2xl text-black text-center">
              {result !== null
                ? result
                  ? "Correct!"
                  : `Answer: ${promptObj.choices[promptObj.answer]}`
                : promptObj.question}
            </p>
          </Card>
          <div className="relative w-[660px] max-w-[90%] flex space-x-3">
            <Card
              className={`flex-1 py-2 ${
                selectedAns === "a" ? "bg-saffron" : "bg-white"
              }`}
              onClick={() => handleClick("a")}
            >
              <p
                className={`font-chewy text-lg sm:text-xl md:text-2xl ${
                  selectedAns === "a" ? "bg-saffron text-black" : "text-mnGreen"
                } text-center`}
              >
                {promptObj.choices.a}
              </p>
            </Card>
            <Card
              className={`flex-1 py-2 ${
                selectedAns === "b" ? "bg-saffron" : "bg-white"
              }`}
              onClick={() => handleClick("b")}
            >
              <p
                className={`font-chewy text-lg sm:text-xl md:text-2xl ${
                  selectedAns === "b" ? "bg-saffron text-black" : "text-mnGreen"
                } text-center`}
              >
                {promptObj.choices.b}
              </p>
            </Card>
          </div>
          <div className="relative w-[660px] max-w-[90%] flex space-x-3">
            <Card
              className={`flex-1 py-2 ${
                selectedAns === "c" ? "bg-saffron" : "bg-white"
              }`}
              onClick={() => handleClick("c")}
            >
              <p
                className={`font-chewy text-lg sm:text-xl md:text-2xl ${
                  selectedAns === "c" ? "bg-saffron text-black" : "text-mnGreen"
                } text-center`}
              >
                {promptObj.choices.c}
              </p>
            </Card>
            <Card
              className={`flex-1 py-2 ${
                selectedAns === "d" ? "bg-saffron" : "bg-white"
              }`}
              onClick={() => handleClick("d")}
            >
              <p
                className={`font-chewy text-lg sm:text-xl md:text-2xl ${
                  selectedAns === "d" ? "text-black" : "text-mnGreen"
                } text-center`}
              >
                {promptObj.choices.d}
              </p>
            </Card>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="loading"
          className="w-screen h-screen flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoadingAnimation size="lg" />
        </motion.div>
      )}
    </>
  );
};

export default Questions;
