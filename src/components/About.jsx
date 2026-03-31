import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" style={{ padding: '80px 0', background: '#000' }}>
      <Container>
        <Row>
          <Col lg={6}>
            <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '20px' }}>{t('aboutUs')}</h2>
            <p style={{ color: '#aaa', lineHeight: '1.8', marginBottom: '20px' }}>
              {t('aboutDesc')}
            </p>
            <p style={{ color: '#aaa', lineHeight: '1.8' }}>
              {t('aboutText')}
            </p>
          </Col>
          <Col lg={6}>
            <img 
              src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="About" 
              style={{ width: '100%', borderRadius: '15px' }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;