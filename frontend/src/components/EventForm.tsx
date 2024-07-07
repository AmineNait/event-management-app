import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl, styled } from '@mui/material';
import { Event } from '../types';

interface EventFormProps {
  addEvent: (event: Event) => void;
}

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ColorBox = styled(Box)({
  width: 24,
  height: 24,
  marginRight: 8,
  borderRadius: '50%',
});

const EventForm: React.FC<EventFormProps> = ({ addEvent }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timezone, setTimezone] = useState('');
  const [color, setColor] = useState('#7cd992'); // Default color green

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
      setColor('#7cd992'); // Reset to default color green
    } catch (error) {
      console.error("There was an error creating the event!", error);
    }
  };

  const colors = [
    { label: 'Green', value: '#7cd992' },
    { label: 'Red', value: '#eb6060' },
    { label: 'Yellow', value: '#f7e463' }
  ];

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Event
      </Typography>
      <FormContainer component="form" onSubmit={handleSubmit}>
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
                <ColorBox sx={{ backgroundColor: selected }} />
                {colors.find(c => c.value === selected)?.label}
              </Box>
            )}
          >
            {colors.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <ColorBox sx={{ backgroundColor: option.value }} />
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Create Event
        </Button>
      </FormContainer>
    </Container>
  );
};

export default EventForm;
