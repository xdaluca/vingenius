import axios from 'axios';

const openai_api_key = process.env.API_KEY;

const api = axios.create({
    baseURL: 'http://localhost:3001/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getWineRecommendation = async (flavorProfile: string, countryOrRegion: string, year: string) => {
  const prompt = `Suggest a wine with a ${flavorProfile} flavor profile from ${countryOrRegion} produced in ${year}.`;

  try {
    const response = await api.post('getWineRecommendation', {
        flavorProfile,
        countryOrRegion,
        year,
      });

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    } else {
      throw new Error('No recommendation found');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
