import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner, FaChartLine, FaLeaf, FaPercentage, FaRupeeSign, FaInfoCircle } from 'react-icons/fa';

const GreenMutualFund = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFund, setSelectedFund] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/green-funds');
        setFunds(response.data);
      } catch (error) {
        console.error('Error fetching funds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  const handleFundSelect = async (fund) => {
    setSelectedFund(fund);
    try {
      const response = await axios.get(`http://localhost:5000/api/recommendations/${fund.id}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const filteredFunds = funds.filter(fund =>
    fund.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getESGScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-green-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading green mutual funds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-green-400 flex items-center">
            <FaLeaf className="mr-3" />
            Green Mutual Funds
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search funds..."
              className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fund List */}
          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <FaChartLine className="mr-2" />
                Available Funds
              </h3>
              <div className="space-y-4">
                {filteredFunds.map((fund) => (
                  <div
                    key={fund.id}
                    className={`p-6 rounded-xl cursor-pointer transition-all transform hover:scale-102 ${
                      selectedFund?.id === fund.id
                        ? 'bg-gradient-to-r from-green-600 to-green-500 text-white'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => handleFundSelect(fund)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl font-semibold">{fund.name}</h4>
                      <div className={`text-lg font-bold ${getESGScoreColor(fund.esgScore)}`}>
                        {fund.esgScore.toFixed(1)}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-sm">
                        <div className="flex items-center text-gray-400 mb-1">
                          <FaRupeeSign className="mr-1" /> AUM
                        </div>
                        <div className="font-semibold">₹{fund.aum.toLocaleString()} Cr</div>
                      </div>
                      <div className="text-sm">
                        <div className="flex items-center text-gray-400 mb-1">
                          <FaPercentage className="mr-1" /> Expense Ratio
                        </div>
                        <div className="font-semibold">{fund.expenseRatio}%</div>
                      </div>
                      <div className="text-sm">
                        <div className="flex items-center text-gray-400 mb-1">
                          <FaInfoCircle className="mr-1" /> Risk Level
                        </div>
                        <div className="font-semibold">{fund.riskLevel}/5</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-6">Similar Funds</h3>
              {selectedFund ? (
                <div className="space-y-4">
                  {recommendations.map((fund) => (
                    <div 
                      key={fund.id} 
                      className="bg-gray-700 p-6 rounded-xl hover:bg-gray-600 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-semibold">{fund.name}</h4>
                        <div className="flex items-center">
                          <div className={`text-lg font-bold ${getESGScoreColor(fund.esgScore)}`}>
                            {fund.esgScore.toFixed(1)}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">
                          Similarity Score
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-24 bg-gray-600 rounded-full mr-2">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${fund.similarityScore}%` }}
                            />
                          </div>
                          <span className="text-green-400 font-semibold">
                            {fund.similarityScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <FaLeaf className="text-4xl mb-4" />
                  <p>Select a fund to see recommendations</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenMutualFund; 