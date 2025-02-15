import React, { useState } from 'react';
import { FaLeaf, FaWater, FaSeedling, FaUsers, FaSolarPanel, FaChartLine } from 'react-icons/fa';

const ImpactCalculator = () => {
  const [investment, setInvestment] = useState('');
  const [fundType, setFundType] = useState('environmental');
  const [duration, setDuration] = useState('1');

  // Enhanced impact factors for different fund types
  const impactFactors = {
    environmental: {
      co2: 0.5,      // tons per $1000 annually
      water: 1000,    // liters per $1000 annually
      energy: 500,    // kWh per $1000 annually
      social: 2       // people impacted per $1000 annually
    },
    social: {
      co2: 0.3,
      water: 800,
      energy: 300,
      social: 5
    },
    governance: {
      co2: 0.4,
      water: 900,
      energy: 400,
      social: 3
    }
  };

  const calculateImpact = () => {
    const investmentAmount = parseFloat(investment) || 0;
    const years = parseInt(duration) || 1;
    const factor = impactFactors[fundType];
    
    return {
      co2: ((investmentAmount / 1000) * factor.co2 * years).toFixed(2),
      water: Math.round((investmentAmount / 1000) * factor.water * years),
      energy: Math.round((investmentAmount / 1000) * factor.energy * years),
      social: Math.round((investmentAmount / 1000) * factor.social * years)
    };
  };

  const impact = calculateImpact();

  const styles = {
    mainContent: {
      marginLeft: '200px',
      minHeight: '100vh',
      width: 'calc(100% - 400px)',
      backgroundColor: '#111827',
      color: '#f3f4f6',
      overflowY: 'auto',
      position: 'relative',
      padding: '40px 60px',
      marginRight: '200px',
      display: 'flex',
      alignItems: 'center'
    },
    container: {
      width: '100%',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '0'
    },
    title: {
      fontSize: '2.5rem',
      color: '#10b981',
      marginBottom: '32px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    card: {
      backgroundColor: '#1f2937',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid #374151',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    inputContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginBottom: '24px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      color: '#10b981',
      fontSize: '1.1rem',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      backgroundColor: '#111827',
      border: '2px solid #374151',
      borderRadius: '8px',
      color: '#f3f4f6',
      fontSize: '1.1rem',
      transition: 'all 0.2s ease',
      ':focus': {
        borderColor: '#10b981',
        outline: 'none'
      }
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      backgroundColor: '#111827',
      border: '2px solid #374151',
      borderRadius: '8px',
      color: '#f3f4f6',
      fontSize: '1.1rem'
    },
    impactGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px'
    },
    impactCard: {
      backgroundColor: '#111827',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #374151',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    impactIcon: {
      color: '#10b981',
      fontSize: '28px',
      marginBottom: '16px'
    },
    impactValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#10b981',
      marginBottom: '8px'
    },
    impactLabel: {
      color: '#d1d5db',
      fontSize: '1.1rem'
    },
    note: {
      backgroundColor: '#111827',
      padding: '16px',
      borderRadius: '8px',
      color: '#d1d5db',
      fontSize: '0.9rem',
      marginTop: 'auto'
    }
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          <FaChartLine />
          ESG Impact Calculator
        </h1>

        <div style={styles.card}>
          <div style={styles.inputContainer}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Investment Amount ($)</label>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                placeholder="Enter amount"
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Fund Type</label>
              <select
                value={fundType}
                onChange={(e) => setFundType(e.target.value)}
                style={styles.select}
              >
                <option value="environmental">Environmental Fund</option>
                <option value="social">Social Impact Fund</option>
                <option value="governance">Governance Fund</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Investment Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                style={styles.select}
              >
                {[1, 2, 3, 4, 5, 10, 15, 20].map(year => (
                  <option key={year} value={year}>{year} {year === 1 ? 'year' : 'years'}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.impactGrid}>
            <div style={styles.impactCard}>
              <FaLeaf style={styles.impactIcon} />
              <div style={styles.impactValue}>{impact.co2} tons</div>
              <div style={styles.impactLabel}>CO₂ Emissions Reduced</div>
            </div>

            <div style={styles.impactCard}>
              <FaWater style={styles.impactIcon} />
              <div style={styles.impactValue}>{impact.water.toLocaleString()} L</div>
              <div style={styles.impactLabel}>Water Conserved</div>
            </div>

            <div style={styles.impactCard}>
              <FaSolarPanel style={styles.impactIcon} />
              <div style={styles.impactValue}>{impact.energy.toLocaleString()} kWh</div>
              <div style={styles.impactLabel}>Clean Energy Generated</div>
            </div>

            <div style={styles.impactCard}>
              <FaUsers style={styles.impactIcon} />
              <div style={styles.impactValue}>{impact.social} people</div>
              <div style={styles.impactLabel}>Lives Impacted</div>
            </div>
          </div>

          <div style={styles.note}>
            <p>Note: These calculations are estimates based on industry averages and historical data. 
               Actual environmental and social impact may vary based on specific fund performance and implementation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCalculator; 