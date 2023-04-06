import React, { useState } from 'react';
import { getWineRecommendation } from './chatGPT';

const App: React.FC = () => {
  const [flavorProfile, setFlavorProfile] = useState('');
  const [countryOrRegion, setCountryOrRegion] = useState('');
  const [year, setYear] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const wineRecommendation = await getWineRecommendation(flavorProfile, countryOrRegion, year);
      setRecommendation(wineRecommendation);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome to VinGenius!</h1>
      <p>Discover personalized wine recommendations with our AI-powered chatbot.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="flavorProfile">Flavor Profile:</label>
        <input
          type="text"
          id="flavorProfile"
          value={flavorProfile}
          onChange={(e) => setFlavorProfile(e.target.value)}
        />
        <br />

        <label htmlFor="countryOrRegion">Country/Region:</label>
        <input
          type="text"
          id="countryOrRegion"
          value={countryOrRegion}
          onChange={(e) => setCountryOrRegion(e.target.value)}
        />
        <br />

        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          min="1900"
          max="2099"
          step="1"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <br />

        <button type="submit">Find Wine</button>
      </form>

      {recommendation && (
        <div>
          <h2>Wine Recommendation:</h2>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default App;