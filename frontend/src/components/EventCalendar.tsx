import React from 'react';
import { Calendar, momentLocalizer, Event as CalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event } from '../types'; // Importez l'interface Event depuis src/types.ts

const localizer = momentLocalizer(moment);

interface EventCalendarProps {
  events: Event[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const calendarEvents: CalendarEvent[] = events.map(event => ({
    title: event.name,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    allDay: false,
    resource: { color: event.color }
  }));

  const eventStyleGetter = (event: CalendarEvent) => {
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

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default EventCalendar;
