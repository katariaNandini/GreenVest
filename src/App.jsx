// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import LandingPage from './LandingPage'
// import Footer from './Footer'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//      <div className='overflow-x-hidden'>
//     <LandingPage /> 
//     </div>
//   )
// }

// export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LandingPage from './LandingPage'
import Footer from './Footer'
import FeaturePage from './FeaturePage'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ProtectedRoute from './components/auth/ProtectedRoute'
import GreenFundSearch from './components/GreenFundSearch'
import BuyStock from './components/BuyStock'
import TransactionPage from './components/TransactionPage'

// function App() {
//   return (
//     <Router>
//       <div className='overflow-x-hidden'>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route 
//             path="/features" 
//             element={
//               <ProtectedRoute>
//                 <FeaturePage />
//               </ProtectedRoute>
//             } 
//           />
//           <Route path="/green-funds" element={<GreenFundSearch />} />
//         </Routes>
//       </div>
//     </Router>
//   )
// }
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/features" element={<FeaturePage />} />
        <Route path="/green-funds" element={<GreenFundSearch />} />
        <Route path="/invest" element={<BuyStock />} />
        <Route path="/funds" element={<GreenFundSearch />} />
        <Route path="/transaction" element={<TransactionPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
