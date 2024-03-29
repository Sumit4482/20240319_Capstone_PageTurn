const express = require('express');
const connectToDatabase = require('./config/db.config');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const reviewRoutes = require('./routes/review.routes');
const app = express();
const cors = require('cors')
// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); 
app.use('/api/books', reviewRoutes);


// Offline handling
app.use((req, res, next) => {
    if (!req.headers['x-forwarded-for'] || req.connection.remoteAddress === '127.0.0.1') {
      // Request is from localhost, continue normally
      return next();
    }
  
    if (!navigator.onLine) {
      // Client is offline, handle appropriately
      return res.status(503).json({ error: 'Service Unavailable - You are currently offline.' });
    }
  
    next();
  });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
