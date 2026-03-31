const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// رابط MongoDB مع كلمة المرور الصحيحة
const MONGODB_URI = 'mongodb+srv://salviaroluxury:SW2k1$$@salviaroluxury.miehabu.mongodb.net/salviaro?retryWrites=true&w=majority';

// الاتصال بقاعدة البيانات
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ متصل بقاعدة البيانات'))
  .catch(err => console.log('❌ خطأ في الاتصال:', err));

// نموذج الحجز
const BookingSchema = new mongoose.Schema({
  vehicleName: String,
  vehicleType: String,
  fromAirport: String,
  toAirport: String,
  startDate: String,
  startTime: String,
  endDate: String,
  endTime: String,
  totalPrice: Number,
  userName: String,
  userEmail: String,
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', BookingSchema);

// API لحفظ الحجز
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'تم الحجز بنجاح', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API لجلب الحجوزات (للمدير)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`);
});