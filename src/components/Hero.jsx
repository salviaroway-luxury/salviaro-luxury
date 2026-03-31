import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useCategory } from '../contexts/CategoryContext';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { category } = useCategory();
  const { t } = useLanguage();

  const backgrounds = {
    cars: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    jets: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  };

  const scrollToFleet = () => {
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) fleetSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      style={{
        height: '100vh',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${backgrounds[category]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'white',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container>
        <Row>
          <Col lg={6}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
              {category === 'cars' ? t('rentLuxuryCar') : t('rentPrivateJet')} <span style={{ borderBottom: '2px solid white', display: 'inline-block', paddingBottom: '5px' }}>{t('luxury')}</span>
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
              {category === 'cars' ? t('carsDesc') : t('jetsDesc')}
            </p>
            <Button 
              onClick={scrollToFleet}
              style={{
                background: 'transparent',
                border: '2px solid white',
                color: 'white',
                padding: '12px 35px',
                fontWeight: 'bold',
                borderRadius: '0',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              {t('browse')} {category === 'cars' ? t('carRental') : t('jetRental')}
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;