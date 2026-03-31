import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer style={{ 
      background: '#0a0a0a', 
      color: '#aaa', 
      padding: '50px 0 20px',
      borderTop: '1px solid #222',
      marginTop: '50px'
    }}>
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h4 style={{ color: 'white', marginBottom: '20px' }}>SALVIARO LUXURY</h4>
            <p style={{ lineHeight: '1.8' }}>
              {t('footerText')}
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <h4 style={{ color: 'white', marginBottom: '20px' }}>{t('quickLinks')}</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="#home" style={{ color: '#aaa', textDecoration: 'none' }}>{t('home')}</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#fleet" style={{ color: '#aaa', textDecoration: 'none' }}>{t('fleet')}</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#services" style={{ color: '#aaa', textDecoration: 'none' }}>{t('services')}</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#about" style={{ color: '#aaa', textDecoration: 'none' }}>{t('about')}</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#contact" style={{ color: '#aaa', textDecoration: 'none' }}>{t('contact')}</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h4 style={{ color: 'white', marginBottom: '20px' }}>{t('contactInfo')}</h4>
            <p>📍 {t('address')}</p>
            <p>📞 {t('phone')}</p>
            <p>✉️ {t('email')}</p>
          </Col>
        </Row>
        <hr style={{ borderColor: '#222', margin: '30px 0 20px' }} />
        <Row>
          <Col className="text-center">
            <p style={{ margin: 0, fontSize: '14px' }}>
              © 2024 SALVIARO LUXURY. {t('copyright')}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;