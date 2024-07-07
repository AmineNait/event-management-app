import React, { useState } from 'react';
import { Calendar, momentLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event as AppEvent, CalendarEvent } from '../types'; // Importez les interfaces Event et CalendarEvent depuis src/types.ts
import EventDetailsModal from './EventDetailsModal'; // Importez le modal

const localizer = momentLocalizer(moment);

interface EventCalendarProps {
  events: AppEvent[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const calendarEvents: CalendarEvent[] = events.map(event => ({
    title: event.name,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    allDay: false,
    resource: {
      id: event._id,
      color: event.color
    }
  }));

  const eventStyleGetter = (event: BigCalendarEvent) => {
    const backgroundColor = event.resource.color || '#00ff00'; // Default color green
    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style
    };
  };

  const handleSelectEvent = (calendarEvent: BigCalendarEvent) => {
    const selected = events.find(e => e._id === calendarEvent.resource.id);
    setSelectedEvent(selected || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
      />
      <EventDetailsModal event={selectedEvent} open={modalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default EventCalendar;
