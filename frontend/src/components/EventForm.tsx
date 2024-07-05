// EventForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const EventForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timezone, setTimezone] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/events', { name, description, startDate, endDate, timezone });
    } catch (error) {
      console.error("There was an error creating the event!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={32} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Start Date:</label>
        <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>
      <div>
        <label>End Date:</label>
        <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>
      <div>
        <label>Timezone:</label>
        <input type="text" value={timezone} onChange={(e) => setTimezone(e.target.value)} required />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
