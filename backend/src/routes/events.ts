import express from 'express';
import { Event } from '../models/Event';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, description, startDate, endDate, timezone } = req.body;
  const event = new Event({ name, description, startDate, endDate, timezone });
  await event.save();
  res.status(201).send(event);
});

router.get('/', async (req, res) => {
  const events = await Event.find();
  res.send(events);
});

router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).send('Event not found');
  res.send(event);
});

export default router;
