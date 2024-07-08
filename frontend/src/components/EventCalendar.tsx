import React, { useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Event as BigCalendarEvent,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event, CalendarEvent, EventCalendarProps } from "../types";
import EventDetailsModal from "./EventDetailsModal";
import momentTimezone from "moment-timezone";
import { Typography } from "@mui/material";
import { CalendarContainer, calendarStyles, eventStyleGetter } from "./styles";

// Localisation du calendrier avec moment.js
const localizer = momentLocalizer(moment);

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Transformation des événements pour les adapter au calendrier
  const calendarEvents: CalendarEvent[] = events.map((event) => {
    const start = momentTimezone
      .tz(event.startDate, "UTC")
      .tz("America/New_York")
      .toDate();
    const end = momentTimezone
      .tz(event.endDate, "UTC")
      .tz("America/New_York")
      .toDate();

    return {
      title: event.name,
      start,
      end,
      allDay: false,
      resource: {
        id: event._id,
        color: event.color,
      },
    };
  });

  // Gestion de la sélection d'un événement
  const handleSelectEvent = (calendarEvent: BigCalendarEvent) => {
    const selected = events.find((e) => e._id === calendarEvent.resource.id);
    setSelectedEvent(selected || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <CalendarContainer>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={calendarStyles}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
      />
      <Typography
        variant="body2"
        sx={{ mt: 2, color: "gray", textAlign: "center" }}
      >
        *All times are in EST timezone.
      </Typography>
      <EventDetailsModal
        event={selectedEvent}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </CalendarContainer>
  );
};

export default EventCalendar;
