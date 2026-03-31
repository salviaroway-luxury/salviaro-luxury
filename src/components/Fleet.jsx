import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCategory } from '../contexts/CategoryContext';
import { useLanguage } from '../contexts/LanguageContext';
import { carsData } from '../data/carsData';
import { jetsData } from '../data/jetsData';
import BookingModal from './BookingModal';

const Fleet = () => {
  const { category, setCategory } = useCategory();
  const { language, t } = useLanguage();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // جلب البيانات مع الترجمة
  const getVehicles = () => {
    const data = category === 'cars' ? carsData : jetsData;
    return data.map(vehicle => ({
      ...vehicle,
      name: vehicle[`name${language === 'ar' ? 'Ar' : language === 'en' ? 'En' : language === 'fr' ? 'Fr' : 'Es'}`] || vehicle.name,
      description: vehicle[`description${language === 'ar' ? 'Ar' : language === 'en' ? 'En' : language === 'fr' ? 'Fr' : 'Es'}`] || vehicle.descriptionAr
    }));
  };
  
  const vehicles = getVehicles();
  const title = category === 'cars' ? t('ourFleet') : t('ourFleetJets');
  const vehicleCount = vehicles.length;
  const countText = category === 'cars' ? t('carsCount') : t('jetsCount');

  const handleBookClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  return (
    <>
      <section id="fleet" style={{ padding: '80px 0', background: '#000000' }}>
        <Container>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px', color: 'white' }}>
            {title}
          </h2>
          <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px' }}>
            {vehicleCount} {countText}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '50px' }}>
            <button 
              onClick={() => setCategory('cars')}
              style={{
                padding: '12px 30px',
                background: category === 'cars' ? '#667eea' : 'transparent',
                color: category === 'cars' ? 'white' : '#aaa',
                border: '1px solid #667eea',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {t('carButton')} ({carsData.length})
            </button>
            <button 
              onClick={() => setCategory('jets')}
              style={{
                padding: '12px 30px',
                background: category === 'jets' ? '#667eea' : 'transparent',
                color: category === 'jets' ? 'white' : '#aaa',
                border: '1px solid #667eea',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {t('jetButton')} ({jetsData.length})
            </button>
          </div>

          <Row>
            {vehicles.map((vehicle) => (
              <Col lg={4} md={6} key={vehicle.id} className="mb-4">
                <Card style={{ 
                  background: '#111111', 
                  border: '1px solid #333', 
                  borderRadius: '15px', 
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  height: '100%'
                }}>
                  <Card.Img 
                    variant="top" 
                    src={vehicle.image} 
                    style={{ height: '200px', objectFit: 'cover' }} 
                  />
                  <Card.Body>
                    <Card.Title style={{ color: 'white', fontSize: '1.3rem', fontWeight: 'bold' }}>
                      {vehicle.name}
                    </Card.Title>
                    <Card.Text style={{ color: '#aaa', fontSize: '14px' }}>
                      {vehicle.description}
                    </Card.Text>
                    <div style={{ fontSize: '24px', color: '#667eea', fontWeight: 'bold', margin: '15px 0' }}>
                      ${vehicle.price.toLocaleString()}
                      <small style={{ fontSize: '14px', color: '#666' }}>
                        /{vehicle.type === 'car' ? t('perDay') : t('perHour')}
                      </small>
                    </div>
                    <Button 
                      onClick={() => handleBookClick(vehicle)}
                      style={{ 
                        width: '100%', 
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        border: 'none',
                        padding: '10px',
                        fontWeight: 'bold',
                        borderRadius: '8px'
                      }}
                    >
                      {t('bookNow')}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <BookingModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        vehicle={selectedVehicle}
      />
    </>
  );
};

export default Fleet;