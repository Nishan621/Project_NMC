import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PatientDashboard from './pages/PatientDashboard';
import './styles/Navbar.css';
import './styles/Footer.css';
import './styles/HomePage.css';
import './styles/LoginPage.css';
import './styles/SignUpPage.css';
import './styles/PatientDashboard.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;