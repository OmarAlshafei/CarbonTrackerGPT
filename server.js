
const path = require('path');
const express = require("express");
const cors = require("cors");
const app = express();
const OpenAI = require('openai');
const port = process.env.PORT || 8000;
const axios = require('axios');
app.use(cors());
app.use((req, res, next) =>
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
  'Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

require('dotenv').config();
app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.set('port', (process.env.PORT || 8000));
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


app.post("/api/CarbonEmissions", async (req, res, next)=>{
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
      Authorization: process.env.CARBON_AUTH,
      'X-RapidAPI-Key': process.env.CARBON_API_KEY,
      'X-RapidAPI-Host': 'carbonsutra1.p.rapidapi.com'
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.status(200).json({data: response.data});
  } catch (error) {
    console.error(error);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

