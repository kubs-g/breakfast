const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

async function callDeepSeek(prompt) {
  const url = `${process.env.DEEPSEEK_BASE_URL}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
  };

  const body = {
    model: "deepseek/deepseek-r1-0528:free",
    messages: [
      { role: "system", content: "You are a nutritionist and chef assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  };

  const response = await axios.post(url, body, { headers });
  return response.data.choices?.[0]?.message?.content;
}

module.exports = { callDeepSeek };
