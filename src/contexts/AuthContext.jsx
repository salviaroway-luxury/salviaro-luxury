import React, { createContext, useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);

  // تحقق من وجود مستخدم مسجل في localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // تسجيل مستخدم جديد
  const register = async (fullName, email, password) => {
    // التحقق من صحة الإيميل
    if (!email.includes('@') || !email.includes('.')) {
      Swal.fire('خطأ', 'الرجاء إدخال بريد إلكتروني صحيح', 'error');
      return false;
    }

    if (password.length < 6) {
      Swal.fire('خطأ', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
      return false;
    }

    if (!fullName || fullName.trim() === '') {
      Swal.fire('خطأ', 'الرجاء إدخال الاسم الكامل', 'error');
      return false;
    }

    // التحقق إذا كان الإيميل مستخدم من قبل
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const existingUser = JSON.parse(savedUser);
      if (existingUser.email === email) {
        Swal.fire('خطأ', 'هذا البريد الإلكتروني مسجل بالفعل', 'error');
        return false;
      }
    }

    // إنشاء كود تحقق عشوائي (6 أرقام)
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);

    // محاكاة إرسال الكود
    console.log(`📧 كود التحقق لـ ${email}: ${code}`);

    Swal.fire({
      title: 'تم إرسال كود التحقق',
      html: `تم إرسال كود التحقق إلى ${email}<br/><br/>
      <strong style="background:#f0f0f0; padding:10px; border-radius:10px; font-size:24px;">${code}</strong>
      <br/><br/>الرجاء إدخال هذا الكود للتأكيد`,
      icon: 'info',
      confirmButtonColor: '#667eea'
    });

    return true;
  };

  // تأكيد الإيميل بالكود
  const verifyEmail = (enteredCode, fullName, email, password) => {
    if (enteredCode === verificationCode) {
      const newUser = { 
        fullName, 
        email, 
        password, 
        createdAt: new Date().toISOString(),
        bookings: []
      };
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
      setVerificationCode(null);
      Swal.fire('نجاح', 'تم تأكيد البريد الإلكتروني وتسجيل الدخول بنجاح', 'success');
      return true;
    } else {
      Swal.fire('خطأ', 'كود التحقق غير صحيح', 'error');
      return false;
    }
  };

  // تسجيل الدخول
  const login = (email, password) => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      Swal.fire('خطأ', 'لا يوجد حساب بهذا البريد الإلكتروني', 'error');
      return false;
    }

    const userData = JSON.parse(savedUser);
    if (userData.email === email && userData.password === password) {
      setUser(userData);
      setIsAuthenticated(true);
      Swal.fire('نجاح', 'تم تسجيل الدخول بنجاح', 'success');
      return true;
    } else {
      Swal.fire('خطأ', 'البريد الإلكتروني أو كلمة المرور غير صحيحة', 'error');
      return false;
    }
  };

  // تغيير كلمة المرور
  const changePassword = (oldPassword, newPassword, confirmNewPassword) => {
    if (!user) {
      Swal.fire('خطأ', 'الرجاء تسجيل الدخول أولاً', 'error');
      return false;
    }

    if (user.password !== oldPassword) {
      Swal.fire('خطأ', 'كلمة المرور القديمة غير صحيحة', 'error');
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      Swal.fire('خطأ', 'كلمة المرور الجديدة غير متطابقة', 'error');
      return false;
    }

    if (newPassword.length < 6) {
      Swal.fire('خطأ', 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل', 'error');
      return false;
    }

    const updatedUser = { ...user, password: newPassword };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    Swal.fire('نجاح', 'تم تغيير كلمة المرور بنجاح', 'success');
    return true;
  };

  // تغيير الاسم
  const changeName = (newName) => {
    if (!user) {
      Swal.fire('خطأ', 'الرجاء تسجيل الدخول أولاً', 'error');
      return false;
    }

    if (!newName || newName.trim() === '') {
      Swal.fire('خطأ', 'الرجاء إدخال اسم صحيح', 'error');
      return false;
    }

    const updatedUser = { ...user, fullName: newName };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    Swal.fire('نجاح', 'تم تغيير الاسم بنجاح', 'success');
    return true;
  };

  // إضافة حجز جديد
  const addBooking = (booking) => {
    if (!user) {
      Swal.fire('خطأ', 'الرجاء تسجيل الدخول أولاً', 'error');
      return false;
    }

    const updatedUser = { 
      ...user, 
      bookings: [...(user.bookings || []), { ...booking, id: Date.now(), date: new Date().toISOString() }]
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return true;
  };

  // جلب الحجوزات
  const getBookings = () => {
    return user?.bookings || [];
  };

  // تسجيل الخروج
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    Swal.fire('تم تسجيل الخروج', 'نرحب بعودتك دائماً', 'info');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      register,
      verifyEmail,
      login,
      changePassword,
      changeName,
      addBooking,
      getBookings,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};