import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('MAD');
  const [symbol, setSymbol] = useState('DH');
  const [rate, setRate] = useState(10);
  const [country, setCountry] = useState('MA');

  // استخدام العملة الافتراضية (الدرهم المغربي)
  useEffect(() => {
    setCurrency('MAD');
    setSymbol('DH');
    setRate(10);
    setCountry('MA');
  }, []);

  const convertPrice = (priceInUSD) => {
    return Math.round(priceInUSD * rate);
  };

  const formatPrice = (priceInUSD) => {
    const converted = convertPrice(priceInUSD);
    return `${converted.toLocaleString()} ${symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      symbol, 
      rate, 
      country, 
      convertPrice, 
      formatPrice
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};