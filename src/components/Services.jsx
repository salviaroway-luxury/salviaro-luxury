import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="services" style={{ padding: '80px 0', background: '#0a0a0a' }}>
      <Container>
        <h2 style={{ textAlign: 'center', color: 'white', fontSize: '2.5rem', marginBottom: '50px' }}>
          {t('ourServices')}
        </h2>
        <Row>
          <Col md={4} className="mb-4">
            <div style={{ 
              background: '#111', 
              padding: '30px', 
              borderRadius: '15px', 
              textAlign: 'center',
              border: '1px solid #222'
            }}>
              <h3 style={{ color: '#667eea', marginBottom: '15px' }}>🕐 {t('service247')}</h3>
              <p style={{ color: '#aaa' }}>{t('service247Desc')}</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div style={{ 
              background: '#111', 
              padding: '30px', 
              borderRadius: '15px', 
              textAlign: 'center',
              border: '1px solid #222'
            }}>
              <h3 style={{ color: '#667eea', marginBottom: '15px' }}>🛡️ {t('safety')}</h3>
              <p style={{ color: '#aaa' }}>{t('safetyDesc')}</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div style={{ 
              background: '#111', 
              padding: '30px', 
              borderRadius: '15px', 
              textAlign: 'center',
              border: '1px solid #222'
            }}>
              <h3 style={{ color: '#667eea', marginBottom: '15px' }}>⭐ {t('luxuryService')}</h3>
              <p style={{ color: '#aaa' }}>{t('luxuryServiceDesc')}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Services;