import React, { useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#ffffff';
  }, []);

  return (
    <AuthProvider>
      <LanguageProvider>
        <CategoryProvider>
          <CurrencyProvider>
            <Home />
          </CurrencyProvider>
        </CategoryProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;