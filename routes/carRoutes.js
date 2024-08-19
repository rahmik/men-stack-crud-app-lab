import express from 'express';
import Car from '../models/car.js'; // Use import instead of require

const router = express.Router();

// Index Route: Display all cars
router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.render('cars/index', { cars }); // Pass `cars` to the view
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// New Route: Show form to create a new car
router.get('/cars/new', (req, res) => {
  res.render('cars/new');
});

// Create Route: Add a new car to the database
router.post('/cars', async (req, res) => {
  try {
    await Car.create(req.body);
    res.redirect('/cars');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Show Route: Display a specific car by its ID
router.get('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.render('cars/show', { car });
  } catch (error) {
    res.status(404).send('Car not found');
  }
});

// Edit Route: Show form to edit an existing car
router.get('/cars/:id/edit', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.render('cars/edit', { car });
  } catch (error) {
    res.status(404).send('Car not found');
  }
});

// Update Route: Update a specific car by its ID
router.put('/cars/:id', async (req, res) => {
  try {
    await Car.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/cars/${req.params.id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete Route: Remove a specific car by its ID
router.delete('/cars/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect('/cars');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
