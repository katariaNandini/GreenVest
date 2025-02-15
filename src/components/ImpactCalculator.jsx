import React, { useState } from 'react';

const ImpactCalculator = () => {
  const [investment, setInvestment] = useState('');
  const [duration, setDuration] = useState('1');
  const [sector, setSector] = useState('solar');

  // Impact factors (simplified example)
  const impactFactors = {
    solar: { co2: 0.5, trees: 12, water: 1000 }, // per $1000 invested annually
    wind: { co2: 0.4, trees: 10, water: 800 },
    hydro: { co2: 0.3, trees: 8, water: 1200 },
    sustainable: { co2: 0.35, trees: 9, water: 900 }
  };

  const calculateImpact = () => {
    const investmentAmount = parseFloat(investment) || 0;
    const years = parseInt(duration) || 1;
    const factor = impactFactors[sector];
    
    return {
      co2: ((investmentAmount / 1000) * factor.co2 * years).toFixed(2),
      trees: Math.round((investmentAmount / 1000) * factor.trees * years),
      water: Math.round((investmentAmount / 1000) * factor.water * years)
    };
  };

  const impact = calculateImpact();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-green-500 mb-6">Environmental Impact Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Investment Amount ($)</label>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Investment Duration (Years)</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                {[1, 2, 3, 4, 5, 10, 15, 20].map(year => (
                  <option key={year} value={year}>{year} {year === 1 ? 'year' : 'years'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Investment Sector</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="solar">Solar Energy</option>
                <option value="wind">Wind Power</option>
                <option value="hydro">Hydroelectric</option>
                <option value="sustainable">Sustainable Agriculture</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-400">Your Environmental Impact</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-300">CO2 Reduction</p>
                <p className="text-2xl font-bold">{impact.co2} tons</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Trees Equivalent</p>
                <p className="text-2xl font-bold">{impact.trees} trees</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Water Saved</p>
                <p className="text-2xl font-bold">{impact.water} gallons</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-300">
            Note: These calculations are estimates based on industry averages. Actual environmental impact may vary based on specific projects and implementation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImpactCalculator; 