import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';
import HomePage from './pages/HomePage';
import ConferencesPage from './pages/ConferencesPage';
import AboutPage from './pages/AboutPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="py-8 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/conferences" element={<ConferencesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register/:id" element={<RegistrationPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
