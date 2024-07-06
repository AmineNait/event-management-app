import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { Event } from '../types';

interface EventDetailsModalProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, open, onClose }) => {
  if (!event) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="event-details-title">
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <Typography id="event-details-title" variant="h6" component="h2">
          {event.name}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {event.description}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Start: {new Date(event.startDate).toLocaleString()}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          End: {new Date(event.endDate).toLocaleString()}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Timezone: {event.timezone}
        </Typography>
      </Box>
    </Modal>
  );
};

export default EventDetailsModal;
