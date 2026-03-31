import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

const AuthModal = ({ show, onHide }) => {
  const { register, verifyEmail, login } = useAuth();
  
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });
  const [tempUserData, setTempUserData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      Swal.fire('خطأ', 'كلمة المرور غير متطابقة', 'error');
      return;
    }
    
    const success = await register(formData.fullName, formData.email, formData.password);
    if (success) {
      setTempUserData({ fullName: formData.fullName, email: formData.email, password: formData.password });
      setMode('verify');
    }
  };

  const handleVerify = () => {
    if (tempUserData) {
      verifyEmail(formData.verificationCode, tempUserData.fullName, tempUserData.email, tempUserData.password);
      onHide();
      setMode('login');
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '', verificationCode: '' });
    }
  };

  const handleLogin = () => {
    const success = login(formData.email, formData.password);
    if (success) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered dir="rtl" style={{ background: 'rgba(0,0,0,0.9)' }}>
      <Modal.Header closeButton style={{ background: '#0a0a0a', borderBottom: '1px solid #222' }}>
        <Modal.Title style={{ color: '#667eea' }}>
          {mode === 'login' && '🔐 تسجيل الدخول'}
          {mode === 'register' && '📝 إنشاء حساب جديد'}
          {mode === 'verify' && '✅ تأكيد البريد الإلكتروني'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#0a0a0a' }}>
        {mode === 'login' && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ddd' }}>📧 البريد الإلكتروني</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                style={{ background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '12px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ddd' }}>🔒 كلمة المرور</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                style={{ background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '12px' }}
              />
            </Form.Group>
            <Button 
              onClick={handleLogin}
              style={{ 
                width: '100%', 
                background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                border: 'none', 
                padding: '12px',
                fontWeight: 'bold',
                borderRadius: '8px'
              }}
            >
              تسجيل الدخول
            </Button>
            <div style={{ textAlign: 'center', marginTop: '15px', color: '#aaa' }}>
              ليس لديك حساب؟{' '}
              <span 
                onClick={() => { setMode('register'); setFormData({ ...formData, verificationCode: '' }); }}
                style={{ color: '#667eea', cursor: 'pointer' }}
              >
                إنشاء حساب جديد
              </span>
            </div>
          </Form>
        )}

        {mode === 'register' && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ddd' }}>👤 الاسم الكامل</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="أحمد محمد"
                value={formData.fullName}
                onChange={handleChange}
                style={{ background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '12px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ddd' }}>📧 البريد الإلكتروني</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                style={{ background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '12px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ddd' }}>🔒 كلمة المرور</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                style={{ background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '12px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ddd' }}>🔒 تأكيد كلمة المرور</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{ background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '12px' }}
              />
            </Form.Group>
            <Button 
              onClick={handleRegister}
              style={{ 
                width: '100%', 
                background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                border: 'none', 
                padding: '12px',
                fontWeight: 'bold',
                borderRadius: '8px'
              }}
            >
              إنشاء حساب
            </Button>
            <div style={{ textAlign: 'center', marginTop: '15px', color: '#aaa' }}>
              لديك حساب بالفعل؟{' '}
              <span 
                onClick={() => setMode('login')}
                style={{ color: '#667eea', cursor: 'pointer' }}
              >
                تسجيل الدخول
              </span>
            </div>
          </Form>
        )}

        {mode === 'verify' && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ddd' }}>📧 تم إرسال كود التحقق إلى {tempUserData?.email}</Form.Label>
              <Form.Control
                type="text"
                name="verificationCode"
                placeholder="أدخل الكود المكون من 6 أرقام"
                value={formData.verificationCode}
                onChange={handleChange}
                style={{ background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '12px' }}
              />
              <Form.Text style={{ color: '#aaa' }}>
                كود التجربة: 123456
              </Form.Text>
            </Form.Group>
            <Button 
              onClick={handleVerify}
              style={{ 
                width: '100%', 
                background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                border: 'none', 
                padding: '12px',
                fontWeight: 'bold',
                borderRadius: '8px'
              }}
            >
              تأكيد الكود
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;