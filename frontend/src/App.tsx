import React from "react";
import { CssBaseline, Container, Box, Typography } from "@mui/material";
import EventForm from "./components/EventForm";
import EventCalendar from "./components/EventCalendar";
import Header from "./components/Header";
import useFetchEvents from "./hooks/useFetchEvents";
import { Event } from "./types";

const App: React.FC = () => {
  const { events, loading, error, setEvents } = useFetchEvents();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Fonction pour ajouter un nouvel événement à la liste des événements
  const addEvent = (event: Event) => {
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        ...event,
        title: event.name,
        start: event.startDate,
        end: event.endDate,
        backgroundColor: event.color,
      },
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
            Event Calendar
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
