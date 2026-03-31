import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t('bookingConfirmed'));
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" style={{ padding: '80px 0', background: '#0a0a0a' }}>
      <Container>
        <h2 style={{ textAlign: 'center', color: 'white', fontSize: '2.5rem', marginBottom: '50px' }}>
          {t('contactUs')}
        </h2>
        <Row>
          <Col lg={8} className="mx-auto">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder={t('yourName')}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ background: '#111', border: '1px solid #333', color: 'white', padding: '12px' }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder={t('yourEmail')}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{ background: '#111', border: '1px solid #333', color: 'white', padding: '12px' }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder={t('yourMessage')}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  style={{ background: '#111', border: '1px solid #333', color: 'white', padding: '12px' }}
                  required
                />
              </Form.Group>
              <Button 
                type="submit" 
                style={{ 
                  width: '100%', 
                  background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                  border: 'none', 
                  padding: '12px',
                  fontWeight: 'bold'
                }}
              >
                {t('send')}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;