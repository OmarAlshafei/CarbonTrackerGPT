
const express = require("express");
const cors = require("cors");
const app = express();
const OpenAI = require('openai');
const axios = require('axios');

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
    messages: [{"role": "user", "content": prompt}],
  });



  res.json({ message: chatCompletion.choices[0].message });
});


app.post("/api/CarbonEmissions", async (req, res)=>{
  let {make, model, miles} = req.body;

  const encodedParams = new URLSearchParams();
  encodedParams.set('vehicle_make', make);
  encodedParams.set('vehicle_model', model);
  encodedParams.set('distance_value', miles);
  encodedParams.set('distance_unit', 'mi');

  const options = {
    method: 'POST',
    url: 'https://carbonsutra1.p.rapidapi.com/vehicle_estimate_by_model',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx',
      'X-RapidAPI-Key': 'c8978ec990msh123912b707b02b7p159836jsn73eac02d58f3',
      'X-RapidAPI-Host': 'carbonsutra1.p.rapidapi.com'
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.json({response: response}).
  } catch (error) {
    console.error(error);
  }
});


app.listen(8000, () => {
  console.log('Server is running on port 8000.');
});

