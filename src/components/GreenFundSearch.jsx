import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaLeaf, FaChartLine, FaInfoCircle } from 'react-icons/fa';
import '../styles/GreenFundSearch.css';

const GreenFundSearch = () => {
  const [mutualFunds, setMutualFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMutualFunds = async () => {
      try {
        const response = await axios.get('https://api.mfapi.in/mf');
        const fundsArray = Array.isArray(response.data) ? response.data : 
                         Array.isArray(response.data.data) ? response.data.data : [];
        
        const greenFunds = fundsArray.filter(fund => 
          fund.schemeName?.toLowerCase().includes('green') ||
          fund.schemeName?.toLowerCase().includes('sustainable') ||
          fund.schemeName?.toLowerCase().includes('esg')
        );
        
        setMutualFunds(greenFunds);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch mutual funds data');
        setLoading(false);
      }
    };

    fetchMutualFunds();
  }, []);

  const filteredFunds = mutualFunds.filter(fund =>
    fund.schemeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="green-fund-container">
      <div className="green-fund-header">
        <h2 className="green-fund-title">
          <FaLeaf className="leaf-icon" />
          Green Investment Funds
        </h2>
        <p className="green-fund-subtitle">
          Discover sustainable and environmentally conscious mutual funds for your green investment portfolio
        </p>
      </div>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search for green funds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading-message">
          <FaChartLine className="animate-spin" />
          Loading green funds...
        </div>
      ) : error ? (
        <div className="error-message">
          <FaInfoCircle /> {error}
        </div>
      ) : (
        <div className="funds-container">
          {filteredFunds.length > 0 ? (
            filteredFunds.map((fund) => (
              <div key={fund.schemeCode} className="fund-card">
                <h3 className="fund-title">
                  <FaLeaf className="fund-leaf-icon" />
                  {fund.schemeName}
                </h3>
                <div className="fund-info">
                  <p className="info-row">
                    <strong>Scheme Code:</strong> {fund.schemeCode}
                  </p>
                  {fund.isinGrowth && (
                    <p className="info-row">
                      <strong>ISIN (Growth):</strong> {fund.isinGrowth}
                    </p>
                  )}
                  {fund.isinDivReinvestment && (
                    <p className="info-row">
                      <strong>ISIN (Div. Reinvestment):</strong> {fund.isinDivReinvestment}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="error-message">No green mutual funds found</div>
          )}
        </div>
      )}
    </div>
  );
};
// try commit msg
export default GreenFundSearch; 