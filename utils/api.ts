import axios from "axios";

export const fetchTypingText = async (): Promise<string> => {
  const response = await axios.get("https://baconipsum.com/api/?type=meat-and-filler&paras=1");
  return response.data[0];
};