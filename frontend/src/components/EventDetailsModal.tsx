import React from 'react';
import { Modal, Box, Typography, Button, styled } from '@mui/material';
import { Event } from '../types';
import moment from 'moment-timezone';

interface EventDetailsModalProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border: 2px solid #000;
  box-shadow: 24px;
  padding: 16px 32px 24px;
`;

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
          <strong>Color:</strong> <Box component="span" sx={{ backgroundColor: event.color, padding: '0 10px', borderRadius: '5px', color: 'white' }}>{event.color}</Box>
        </Typography>
        <Button onClick={onClose} variant="contained" color="primary" sx={{ mt: 2 }}>
          Close
        </Button>
      </StyledBox>
    </Modal>
  );
};

export default EventDetailsModal;
