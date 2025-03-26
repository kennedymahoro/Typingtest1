import axios from "axios";

export const fetchTypingText = async (): Promise<string> => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    return response.data[0].q; // Return only the quote, no author
  } catch (error) {
    console.error("Error fetching quote:", error);
    return "Failure is simply the opportunity to begin again, this time more intelligently."; // Default quote
  }
};
