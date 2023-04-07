const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const openai_api_key = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.post('/api/getWineRecommendation', async (req, res) => {
  const { flavorProfile, countryOrRegion, year } = req.body;
  const prompt = `Suggest a wine with a ${flavorProfile} flavor profile from ${countryOrRegion} produced in ${year}.`;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "ada",
      prompt,
      max_tokens: 50,
      n: 1,
      stop: "\n",
      temperature: 0.7,
      top_p: 1,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openai_api_key}`
      },
    });

    if (response.data.choices && response.data.choices.length > 0) {
      res.json({ recommendation: response.data.choices[0].text.trim() });
    } else {
      throw new Error('No recommendation found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the wine recommendation.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
