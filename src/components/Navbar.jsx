import React, { useState, useEffect } from 'react';
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap';
import { FaPlane, FaCar, FaUser } from 'react-icons/fa';
import { useCategory } from '../contexts/CategoryContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import AuthModal from './AuthModal';
import UserMenu from './UserMenu';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { category } = useCategory();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <BSNavbar 
        expand="lg" 
        fixed="top" 
        className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
      >
        <Container>
          <BSNavbar.Brand 
            href="#home" 
            className="d-flex align-items-center"
            style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px' }}
          >
            {category === 'cars' ? <FaCar className="ms-2" style={{ fontSize: '22px' }} /> : <FaPlane className="ms-2" style={{ fontSize: '22px' }} />}
            <span style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px' }}>SALVIARO LUXURY</span>
          </BSNavbar.Brand>
          <BSNavbar.Toggle />
          <BSNavbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link onClick={() => scrollToSection('home')}>{t('home')}</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('fleet')}>
                {category === 'cars' ? t('fleet') : t('ourJets')}
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSection('services')}>{t('services')}</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('about')}>{t('about')}</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('contact')}>{t('contact')}</Nav.Link>
            </Nav>
            <LanguageSelector />
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button 
                variant="outline-light" 
                size="sm" 
                className="login-btn"
                onClick={() => setShowAuthModal(true)}
                style={{ marginLeft: '15px', borderRadius: '30px', padding: '8px 20px' }}
              >
                <FaUser style={{ marginLeft: '8px' }} />
                تسجيل الدخول
              </Button>
            )}
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>

      <AuthModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;