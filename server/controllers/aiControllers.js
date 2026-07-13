import OpenAI from "openai";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if(plan !== 'premium' && free_usage >= 10){
    return res.json({ success: false, message: "Limit reached. Upgrade to continue."})
}

const response = await AI.chat.completions.create({
    model: "gemini-3.5-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens: length,
});

//output the response from the AI model
const content = response.choices[0].message.content;

  } catch (error) {
  }
}
