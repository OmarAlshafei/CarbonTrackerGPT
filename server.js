
const express = require("express");
const cors = require("cors");
const app = express();
const OpenAI = require('openai');

require('dotenv').config();
app.use(cors());
app.use(express.json());

app.post("/api/chatGPT", async (req, res) => {
  let {prompt} = req.body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": "Hello!"}],
  });

  res.json({ message: chatCompletion });
});

app.listen(8000, () => {
  console.log('Server is running on port 8000.');
});