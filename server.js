import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import methodOverride from 'method-override'; // Include method-override
import carRoutes from './routes/carRoutes.js'; // Use import instead of require

// Initialize dotenv
dotenv.config();

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Add this line for handling PUT and DELETE requests

// Test Route
app.get('/test', (req, res) => {
  res.send('Server is running!');
});

// Landing Page Route
app.get('/', (req, res) => {
  res.redirect('/cars'); // Redirect to /cars to show car list
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use carRoutes
app.use(carRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
