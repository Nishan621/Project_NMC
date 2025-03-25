import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import db from './db/connection.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Access denied.');
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, phone, address, dob, gender, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword, phone, address, dob, gender, role };
    const collection = db.collection('users');
    await collection.insertOne(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const collection = db.collection('users');
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch profile
app.get('/api/profile', verifyToken, async (req, res) => {
  try {
    console.log('User ID:', req.user.userId); // Debugging log
    const collection = db.collection('users');
    const user = await collection.findOne({ _id: new ObjectId(req.user.userId) });
    console.log('Fetched user:', user); // Debugging log
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err); // Debugging log
    res.status(500).json({ error: err.message });
  }
});

// Fetch medical records
app.get('/api/medical-records', verifyToken, async (req, res) => {
  try {
    const collection = db.collection('medicalRecords');
    const records = await collection.find({ patientId: req.user.userId }).toArray();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book appointment
app.post('/api/appointments', verifyToken, async (req, res) => {
  try {
    const { doctorId, appointmentDate } = req.body;
    const appointment = { patientId: req.user.userId, doctorId, appointmentDate, status: 'scheduled' };
    const collection = db.collection('appointments');
    await collection.insertOne(appointment);
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});