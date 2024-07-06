import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Event } from '../types'; // Importez l'interface Event depuis src/types.ts

interface EventFormProps {
  addEvent: (event: Event) => void;
}

const EventForm: React.FC<EventFormProps> = ({ addEvent }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timezone, setTimezone] = useState('');
  const [color, setColor] = useState('#0000ff'); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/events', { name, description, startDate, endDate, timezone, color });
      addEvent(response.data);
      // Clear form after submission
      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setTimezone('');
      setColor('#0000ff'); 
    } catch (error) {
      console.error("There was an error creating the event!", error);
    }
  };

  const colors = [
    { label: 'Blue', value: '#0000ff' },
    { label: 'Green', value: '#7cd992' },
    { label: 'Red', value: '#eb6060' },
    { label: 'Yellow', value: '#f7e463' }
  ];

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Event
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          inputProps={{ maxLength: 32 }}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          required
        />
        <TextField
          label="Start Date"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <TextField
          label="End Date"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <TextField
          label="Timezone"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          required
        />
        <FormControl>
          <InputLabel id="color-select-label">Color</InputLabel>
          <Select
            labelId="color-select-label"
            value={color}
            label="Color"
            onChange={(e) => setColor(e.target.value)}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: selected,
                    marginRight: 1,
                    borderRadius: '50%'
                  }}
                />
                {colors.find(c => c.value === selected)?.label}
              </Box>
            )}
          >
            {colors.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: option.value,
                    marginRight: 1,
                    borderRadius: '50%'
                  }}
                />
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Create Event
        </Button>
      </Box>
    </Container>
  );
};

export default EventForm;
