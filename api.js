import axios from "axios";

const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";
const HF_ACCESS_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN;

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  const SYSTEM_PROMPT = "You are a helpful chef assistant.";

  // Combine all messages into a single string
  const inputs = `${SYSTEM_PROMPT} I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;

  const payload = {
    inputs, // A single string, not an array
    parameters: { max_tokens: 1024 },
  };

  try {
    const response = await axios.post(HF_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${HF_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    // Ensure the response has the expected structure
    if (response.data && response.data.generated_text) {
      return response.data.generated_text;
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error("Error fetching recipe:", error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch recipe. Please try again later.");
  }
}
