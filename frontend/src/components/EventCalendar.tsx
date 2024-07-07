import React, { useState } from 'react';
import { Calendar, momentLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event, CalendarEvent } from '../types';
import EventDetailsModal from './EventDetailsModal';
import momentTimezone from 'moment-timezone';

const localizer = momentLocalizer(moment);

interface EventCalendarProps {
  events: Event[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const calendarEvents: CalendarEvent[] = events.map(event => {
    // Convert start and end dates from UTC to EST
    const start = momentTimezone.tz(event.startDate, 'UTC').tz('America/New_York').toDate();
    const end = momentTimezone.tz(event.endDate, 'UTC').tz('America/New_York').toDate();
    
    console.log(`Original start: ${event.startDate}, converted start: ${start}`);
    console.log(`Original end: ${event.endDate}, converted end: ${end}`);
    
    return {
      title: event.name,
      start,
      end,
      allDay: false,
      resource: {
        id: event._id,
        color: event.color
      }
    };
  });

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
