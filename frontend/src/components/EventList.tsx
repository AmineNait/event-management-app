import React from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { Event } from '../types'; // Importez l'interface Event depuis src/types.ts

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Event List
      </Typography>
      <Grid container spacing={2}>
        {events.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Card sx={{ backgroundColor: event.color }}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {event.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(event.startDate).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(event.endDate).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.timezone}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EventList;
