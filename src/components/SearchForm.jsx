import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useCategory } from '../contexts/CategoryContext';

const SearchForm = () => {
  const { category } = useCategory();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
  });

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🔍 جاري البحث عن ${category === 'cars' ? 'سيارات' : 'طائرات'} من ${searchData.from} إلى ${searchData.to} في تاريخ ${searchData.date}`);
  };

  return (
    <section style={{ marginTop: '-60px', position: 'relative', zIndex: 10, padding: '0 15px' }}>
      <Container>
        <div style={{ 
          background: 'rgba(0,0,0,0.8)', 
          backdropFilter: 'blur(10px)',
          padding: '30px', 
          borderRadius: '15px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={4}>
                <Form.Control
                  type="text"
                  name="from"
                  placeholder={category === 'cars' ? 'من أي مدينة؟' : 'من أين؟'}
                  value={searchData.from}
                  onChange={handleChange}
                  style={{ background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '12px' }}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="text"
                  name="to"
                  placeholder={category === 'cars' ? 'إلى أي مدينة؟' : 'إلى أين؟'}
                  value={searchData.to}
                  onChange={handleChange}
                  style={{ background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '12px' }}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="date"
                  name="date"
                  value={searchData.date}
                  onChange={handleChange}
                  style={{ background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '12px' }}
                />
              </Col>
              <Col md={1}>
                <Button type="submit" style={{ width: '100%', background: '#667eea', border: 'none', padding: '12px' }}>
                  🔍
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </section>
  );
};

export default SearchForm;