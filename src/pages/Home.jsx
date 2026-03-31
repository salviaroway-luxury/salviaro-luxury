import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchForm from '../components/SearchForm';
import Fleet from '../components/Fleet';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchForm />
      <Fleet />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;