import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaCalendarAlt } from 'react-icons/fa';

const VehicleCard = ({ vehicle }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <Card style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <Card.Img 
          variant="top" 
          src={vehicle.image} 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
        <Card.Body>
          <Card.Title>{vehicle.name}</Card.Title>
          <Card.Text>{vehicle.description}</Card.Text>
          <div style={{ fontSize: '24px', color: '#667eea', fontWeight: 'bold' }}>
            ${vehicle.price.toLocaleString()}
            <small>/{vehicle.type === 'car' ? 'يوم' : 'ساعة'}</small>
          </div>
          <Button 
            onClick={handleClick}
            style={{ 
              width: '100%', 
              marginTop: '15px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              border: 'none',
              padding: '10px'
            }}
          >
            <FaCalendarAlt className="me-2" />
            احجز الآن
          </Button>
          {showMessage && (
            <div style={{ 
              marginTop: '10px', 
              padding: '10px', 
              background: '#4caf50', 
              color: 'white', 
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              ✅ تم الضغط على زر الحجز لـ {vehicle.name}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default VehicleCard;