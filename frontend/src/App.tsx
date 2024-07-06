import React, { useState, useEffect } from 'react';
import EventForm from './components/EventForm';
import EventCalendar from './components/EventCalendar';
import { CssBaseline, Container } from '@mui/material';
import axios from 'axios';
import { Event } from './types'; // Importez l'interface Event depuis src/types.ts

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
        console.error("There was an error fetching the events!", error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = (event: Event) => {
    setEvents(prevEvents => [...prevEvents, {
      ...event,
      title: event.name,
      start: event.startDate,
      end: event.endDate,
      backgroundColor: event.color
    }]);
  };

  return (
    <div className="App">
      <CssBaseline />
      <Container>
        <EventForm addEvent={addEvent} />
        <EventCalendar events={events} />
      </Container>
    </div>
  );
};

export default App;
