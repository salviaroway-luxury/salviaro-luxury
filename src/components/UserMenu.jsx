import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaKey, FaEdit, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import './UserMenu.css';

const UserMenu = () => {
  const { user, isAuthenticated, changePassword, changeName, logout } = useAuth();
  const { t } = useLanguage();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [newName, setNewName] = useState('');

  if (!isAuthenticated) return null;

  const handleChangePassword = () => {
    changePassword(passwordData.oldPassword, passwordData.newPassword, passwordData.confirmNewPassword);
    setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    setShowPasswordModal(false);
  };

  const handleChangeName = () => {
    if (newName.trim()) {
      changeName(newName);
      setNewName('');
      setShowNameModal(false);
    }
  };

  return (
    <>
      <Dropdown align="end" className="user-menu">
        <Dropdown.Toggle variant="dark" className="user-toggle">
          <FaUserCircle size={24} />
          <span className="user-name">{user?.fullName?.split(' ')[0]}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="user-dropdown">
          <Dropdown.Item onClick={() => setShowNameModal(true)}>
            <FaEdit /> {t('changeName') || 'تعديل الاسم'}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowPasswordModal(true)}>
            <FaKey /> {t('changePassword') || 'تغيير كلمة المرور'}
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>
            <FaSignOutAlt /> {t('logout') || 'تسجيل الخروج'}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* نافذة تغيير كلمة المرور */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
            <h3>{t('changePassword') || 'تغيير كلمة المرور'}</h3>
            <input
              type="password"
              placeholder={t('oldPassword') || 'كلمة المرور القديمة'}
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              className="auth-input"
            />
            <input
              type="password"
              placeholder={t('newPassword') || 'كلمة المرور الجديدة'}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="auth-input"
            />
            <input
              type="password"
              placeholder={t('confirmNewPassword') || 'تأكيد كلمة المرور الجديدة'}
              value={passwordData.confirmNewPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
              className="auth-input"
            />
            <div className="modal-buttons">
              <button onClick={() => setShowPasswordModal(false)}>{t('cancel') || 'إلغاء'}</button>
              <button onClick={handleChangePassword}>{t('confirm') || 'تأكيد'}</button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تغيير الاسم */}
      {showNameModal && (
        <div className="modal-overlay" onClick={() => setShowNameModal(false)}>
          <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
            <h3>{t('changeName') || 'تعديل الاسم'}</h3>
            <input
              type="text"
              placeholder={t('newName') || 'الاسم الجديد'}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="auth-input"
            />
            <div className="modal-buttons">
              <button onClick={() => setShowNameModal(false)}>{t('cancel') || 'إلغاء'}</button>
              <button onClick={handleChangeName}>{t('confirm') || 'تأكيد'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMenu;