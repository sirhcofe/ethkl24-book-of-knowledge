type Prompt = {
  question: string;
  choices: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  answer: "a" | "b" | "c" | "d";
};
