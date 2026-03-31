import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useLanguage } from '../contexts/LanguageContext';
import { airportsData } from '../data/airportsData';

const BookingModal = ({ show, onHide, vehicle }) => {
  const { language, t } = useLanguage();
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [fromAirport, setFromAirport] = useState('');
  const [toAirport, setToAirport] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [duration, setDuration] = useState('');
  
  const isCar = vehicle?.type === 'car';

  // دالة لجلب اسم المطار مترجم
  const getAirportName = (airport) => {
    if (!airport) return '';
    switch(language) {
      case 'ar': return `${airport.name} (${airport.code}) - ${airport.city}`;
      case 'en': return `${airport.nameEn} (${airport.code}) - ${airport.cityEn}`;
      case 'fr': return `${airport.nameFr} (${airport.code}) - ${airport.cityFr}`;
      case 'es': return `${airport.nameEs} (${airport.code}) - ${airport.cityEs}`;
      default: return `${airport.name} (${airport.code}) - ${airport.city}`;
    }
  };

  // دالة لجلب اسم الدولة مترجم
  const getCountryName = (airport) => {
    if (!airport) return '';
    switch(language) {
      case 'ar': return airport.country;
      case 'en': return airport.countryEn;
      case 'fr': return airport.countryFr;
      case 'es': return airport.countryEs;
      default: return airport.country;
    }
  };

  useEffect(() => {
    if (!vehicle) return;
    
    if (isCar) {
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        if (days > 0) {
          setTotalPrice(vehicle.price * days);
          setDuration(`${days} ${t('perDay')}`);
        } else {
          setTotalPrice(vehicle.price);
          setDuration(`1 ${t('perDay')}`);
        }
      } else {
        setTotalPrice(vehicle.price);
        setDuration('');
      }
    } else {
      if (startDate && startTime && endDate && endTime) {
        const start = new Date(`${startDate}T${startTime}`);
        const end = new Date(`${endDate}T${endTime}`);
        const hours = Math.ceil((end - start) / (1000 * 60 * 60));
        if (hours > 0) {
          setTotalPrice(vehicle.price * hours);
          setDuration(`${hours} ${t('perHour')}`);
        } else {
          setTotalPrice(vehicle.price);
          setDuration(`1 ${t('perHour')}`);
        }
      } else {
        setTotalPrice(vehicle.price);
        setDuration('');
      }
    }
  }, [startDate, startTime, endDate, endTime, vehicle, isCar, t]);

  if (!vehicle) return null;

  const handleConfirm = async () => {
    if (!startDate) {
      alert(t('selectStartDate'));
      return;
    }

    if (isCar && !endDate) {
      alert(t('selectEndDate'));
      return;
    }

    if (!isCar && (!startTime || !endDate || !endTime)) {
      alert(t('selectTime'));
      return;
    }

    if (!isCar && (!fromAirport || !toAirport)) {
      alert(t('selectAirports'));
      return;
    }

    const selectedFromAirport = airportsData.find(a => a.id === parseInt(fromAirport));
    const selectedToAirport = airportsData.find(a => a.id === parseInt(toAirport));

    let message = `${t('bookingConfirmed')} ${vehicle.name}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    if (!isCar) {
      message += `✈️ ${t('fromAirport')}: ${getAirportName(selectedFromAirport)}\n`;
      message += `📍 ${t('address')}: ${getCountryName(selectedFromAirport)}\n`;
      message += `✈️ ${t('toAirport')}: ${getAirportName(selectedToAirport)}\n`;
      message += `📍 ${t('address')}: ${getCountryName(selectedToAirport)}\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    }
    
    message += `📅 ${t('startDate')}: ${startDate} ${startTime ? `${t('startTime')} ${startTime}` : ''}\n`;
    message += `📅 ${t('endDate')}: ${endDate} ${endTime ? `${t('endTime')} ${endTime}` : ''}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `⏱️ ${t('duration')}: ${duration}\n`;
    message += `💰 ${t('totalPrice')}: $${totalPrice.toLocaleString()}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += t('weWillContact');

    alert(message);
    
    // إرسال الحجز إلى السيرفر
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleName: vehicle.name,
          vehicleType: vehicle.type,
          fromAirport: !isCar && fromAirport ? getAirportName(selectedFromAirport) : '',
          toAirport: !isCar && toAirport ? getAirportName(selectedToAirport) : '',
          startDate: startDate,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          totalPrice: totalPrice,
          userName: 'عميل',
          userEmail: 'client@email.com'
        })
      });
      const data = await response.json();
      console.log('✅ تم حفظ الحجز في قاعدة البيانات:', data);
    } catch (error) {
      console.log('❌ خطأ في حفظ الحجز:', error);
    }
    
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setFromAirport('');
    setToAirport('');
    onHide();
  };

  // تجميع المطارات حسب الدولة مع ترجمة اسم الدولة
  const airportsByCountry = airportsData.reduce((acc, airport) => {
    const countryKey = getCountryName(airport);
    if (!acc[countryKey]) {
      acc[countryKey] = [];
    }
    acc[countryKey].push(airport);
    return acc;
  }, {});

  return (
    <Modal show={show} onHide={onHide} size="lg" centered dir="rtl">
      <Modal.Header closeButton style={{ background: '#1a1a1a', borderBottom: '1px solid #333' }}>
        <Modal.Title style={{ color: '#667eea' }}>
          {isCar ? '🚗 ' + t('bookVehicle') + ' ' + t('carRental') : '✈️ ' + t('bookVehicle') + ' ' + t('jetRental')} : {vehicle.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#1a1a1a', maxHeight: '70vh', overflowY: 'auto' }}>
        <Row>
          <Col md={5}>
            <img 
              src={vehicle.image} 
              alt={vehicle.name} 
              style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }} 
            />
            <div style={{ 
              background: '#2a2a2a', 
              padding: '15px', 
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <h5 style={{ color: '#aaa' }}>{t('pricePer')}</h5>
              <h3 style={{ color: '#667eea' }}>
                ${vehicle.price.toLocaleString()}
                <small style={{ fontSize: '14px', color: '#666' }}>
                  {t('pricePer')}{isCar ? t('perDay') : t('perHour')}
                </small>
              </h3>
            </div>
          </Col>
          <Col md={7}>
            <Form>
              {!isCar && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ddd' }}>{t('fromAirport')}</Form.Label>
                    <Form.Select 
                      value={fromAirport}
                      onChange={(e) => setFromAirport(e.target.value)}
                      style={{ background: '#2a2a2a', border: '1px solid #333', color: 'white', padding: '10px' }}
                    >
                      <option value="">{t('selectFromAirport')}</option>
                      {Object.entries(airportsByCountry).map(([country, airports]) => (
                        <optgroup key={country} label={`📍 ${country}`}>
                          {airports.map(airport => (
                            <option key={airport.id} value={airport.id}>
                              {getAirportName(airport)}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ddd' }}>{t('toAirport')}</Form.Label>
                    <Form.Select 
                      value={toAirport}
                      onChange={(e) => setToAirport(e.target.value)}
                      style={{ background: '#2a2a2a', border: '1px solid #333', color: 'white', padding: '10px' }}
                    >
                      <option value="">{t('selectToAirport')}</option>
                      {Object.entries(airportsByCountry).map(([country, airports]) => (
                        <optgroup key={country} label={`📍 ${country}`}>
                          {airports.map(airport => (
                            <option key={airport.id} value={airport.id}>
                              {getAirportName(airport)}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </>
              )}

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ddd' }}>{t('startDate')}</Form.Label>
                <Form.Control 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ background: '#2a2a2a', border: '1px solid #333', color: 'white', padding: '10px' }}
                />
              </Form.Group>

              {!isCar && (
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#ddd' }}>{t('startTime')}</Form.Label>
                  <Form.Control 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    style={{ background: '#2a2a2a', border: '1px solid #333', color: 'white', padding: '10px' }}
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ddd' }}>{t('endDate')}</Form.Label>
                <Form.Control 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{ background: '#2a2a2a', border: '1px solid #333', color: 'white', padding: '10px' }}
                />
              </Form.Group>

              {!isCar && (
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#ddd' }}>{t('endTime')}</Form.Label>
                  <Form.Control 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    style={{ background: '#2a2a2a', border: '1px solid #333', color: 'white', padding: '10px' }}
                  />
                </Form.Group>
              )}

              <div style={{ 
                background: '#2a2a2a', 
                padding: '15px', 
                borderRadius: '10px',
                marginTop: '15px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong style={{ color: '#ddd' }}>{t('duration')}:</strong>
                  <span style={{ color: '#667eea', fontWeight: 'bold' }}>
                    {duration || t('notSelected')}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                  <strong style={{ color: '#ddd' }}>{t('totalPrice')}:</strong>
                  <strong style={{ color: '#667eea', fontSize: '1.3rem' }}>
                    ${totalPrice.toLocaleString()}
                  </strong>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{ background: '#1a1a1a', borderTop: '1px solid #333' }}>
        <Button variant="secondary" onClick={onHide} style={{ background: '#333', border: 'none' }}>
          {t('cancel')}
        </Button>
        <Button 
          variant="primary" 
          onClick={handleConfirm}
          style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none' }}
        >
          {t('confirm')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;