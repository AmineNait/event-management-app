import React from 'react';
import { Modal, Typography, Button, Box } from '@mui/material';
import { EventDetailsModalProps } from '../types';
import moment from 'moment-timezone';
import { StyledBox, colorBoxStyles } from './styles';

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, open, onClose }) => {
  if (!event) return null;

  const startOriginal = moment.tz(event.startDate, event.timezone).format('YYYY-MM-DD HH:mm z');
  const endOriginal = moment.tz(event.endDate, event.timezone).format('YYYY-MM-DD HH:mm z');
  const startEST = moment.tz(event.startDate, 'UTC').tz('America/New_York').format('YYYY-MM-DD HH:mm z');
  const endEST = moment.tz(event.endDate, 'UTC').tz('America/New_York').format('YYYY-MM-DD HH:mm z');

  return (
    <Modal open={open} onClose={onClose}>
      <StyledBox>
        <Typography variant="h6" component="h2">
          Event Details
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Name:</strong> {event.name}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Description:</strong> {event.description}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Original Start:</strong> {startOriginal}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Original End:</strong> {endOriginal}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Start (EST):</strong> {startEST}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>End (EST):</strong> {endEST}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Color:</strong> <Box component="span" sx={colorBoxStyles(event.color)}>{event.color}</Box>
        </Typography>
        <Button onClick={onClose} variant="contained" color="primary" sx={{ mt: 2 }}>
          Close
        </Button>
      </StyledBox>
    </Modal>
  );
};

export default EventDetailsModal;
