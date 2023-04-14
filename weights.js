const express = require('express');
const db = require('./db');

const router = express.Router();

// GET all weights
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM weights');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// GET a single weight by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM weights WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).send('Weight not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// CREATE a new weight
router.post('/', async (req, res) => {
  const { weight, sets, reps } = req.body;
  try {
    const { rows } = await db.query('INSERT INTO weights (weight, sets, reps) VALUES ($1, $2, $3) RETURNING *', [weight, sets, reps]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// UPDATE an existing weight
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { weight, sets, reps } = req.body;
  try {
    const { rows } = await db.query('UPDATE weights SET weight = $1, sets = $2, reps = $3 WHERE id = $4 RETURNING *', [weight, sets, reps, id]);
    if (rows.length === 0) {
      res.status(404).send('Weight not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// DELETE an existing weight
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await db.query('DELETE FROM weights WHERE id = $1 RETURNING *', [id]);
      if (rows.length === 0) {
        res.status(404).send('Weight not found');
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

module.exports = router;

// TRY

router.get('/:id/edit', async (req, res) => {
  const id = req.params.id;
  const weight = await Weight.findByPk(id);
  res.render('edit', { weight });
});

router.post('/:id/edit', async (req, res) => {
  const id = req.params.id;
  const { date, value } = req.body;
  const weight = await Weight.findByPk(id);
  weight.date = date;
  weight.value = value;
  await weight.save();
  res.redirect('/weights');
});

router.post('/:id/delete', async (req, res) => {
  const id = req.params.id;
  const weight = await Weight.findByPk(id);
  await weight.destroy();
  res.redirect('/weights');
});

app.get('/weights/new', (req, res) => {
  res.render('new');
});

app.post('/weights', async (req, res) => {
  const { date, value } = req.body;
  const weight = await Weight.create({ date, value });
  res.redirect('/weights');
});

app.use('/weights', weightsRouter)
