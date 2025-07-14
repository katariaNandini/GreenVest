import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import Footer from './Footer'
import FeaturePage from './FeaturePage'
// import Login from './components/auth/Login'
// import Signup from './components/auth/Signup'
// import ProtectedRoute from './components/auth/ProtectedRoute'
import GreenFundSearch from './components/GreenFundSearch'

function App() {
  return (
    <Router>
      <div className='overflow-x-hidden'>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/features" element={<FeaturePage />} />
          <Route path="/green-funds" element={<GreenFundSearch />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App