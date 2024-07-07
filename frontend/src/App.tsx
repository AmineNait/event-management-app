import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import EventForm from './components/EventForm';
import EventCalendar from './components/EventCalendar';
import Header from './components/Header';
import { Event } from './types';

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events');
        const formattedEvents = response.data.map((event: Event) => ({
          ...event,
          title: event.name,
          start: event.startDate,
          end: event.endDate,
          backgroundColor: event.color
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('There was an error fetching the events!', error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = (event: Event) => {
    setEvents(prevEvents => [
      ...prevEvents,
      {
        ...event,
        title: event.name,
        start: event.startDate,
        end: event.endDate,
        backgroundColor: event.color
      }
    ]);
  };

  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <Container>
        <Box my={4}>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Event Management
          </Typography>
        </Box>
        <Box my={4}>
          <EventForm addEvent={addEvent} />
        </Box>
        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Event Calendar (EST)
          </Typography>
          <Typography variant="body1" gutterBottom>
            Click on an event to see more details.
          </Typography>
          <EventCalendar events={events} />
        </Box>
      </Container>
    </div>
  );
};

export default App;
