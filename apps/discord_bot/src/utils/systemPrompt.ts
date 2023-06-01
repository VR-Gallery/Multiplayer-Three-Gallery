import fs from "fs";
import path from "path";

const PROMPT_FILE_PATH = path.resolve("./prompt.txt");

const getPrompt = (): string => {
  try {
    return fs.readFileSync(PROMPT_FILE_PATH, "utf8");
  } catch (error) {
    return "你是一個為了回答問題而生的機器人，你所有的回答應該都限制在兩句話以內，除非有特殊需求，並且盡量所有回答都要有表情符號";
  }
};

const setPrompt = (prompt: string): void => {
  try {
    fs.writeFileSync(PROMPT_FILE_PATH, prompt);
  } catch (error) {}
};

const useSystemPrompt = (): {
  getPrompt: () => string;
  setPrompt: (prompt: string) => void;
} => {
  return {
    getPrompt,
    setPrompt,
  };
};

export default useSystemPrompt;
