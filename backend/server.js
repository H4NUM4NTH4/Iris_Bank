// server.js or app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Ensure the path is correct

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://iris-bank-frontend-4atk0grwp-sanjus-projects-48f9be41.vercel.app', 'https://iris-bank-frontend.vercel.app'],
  credentials: true
}));
const pythonScriptRouter = require('./routes/pythonScriptRouter');
app.use('/api', pythonScriptRouter);

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Hide password in logs
    
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Retry connection after 5 seconds
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

connectDB();

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const verifyIrisRoute = require('./routes/verifyIrisRoute');
app.use('/api', verifyIrisRoute);

const imageUploadRouter = require('./routes/imageUpload'); // Adjust the path as necessary

// Use the image upload router
app.use('/api', imageUploadRouter);

const captureIrisRoute = require('./routes/SignupageUpload'); 
app.use('/api/auth', captureIrisRoute);

const forgotPasswordRoute = require('./routes/forgotPassword');
app.use('/api/auth', forgotPasswordRoute);

const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    req.user = decoded; // Store decoded token data in request
    next(); // Proceed to the next middleware or route
  });
};

app.post('/api/create-order', verifyToken, (req, res) => {
  const { amount, currency } = req.body;
  if (!amount || !currency) {
    return res.status(400).json({ error: 'Amount and currency are required' });
  }

  const order = {
    amount: amount * 100,  // Razorpay expects the amount in paise
    currency: currency,
    receipt: 'order_receipt_1',
  };

  razorpayInstance.orders.create(order, (err, order) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
    res.json({ orderId: order.id, amount: order.amount });
  });
});




