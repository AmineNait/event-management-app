// src/types.ts
export interface Event {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  timezone: string;
  color: string;
}

export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: {
    id: string;
    color: string;
  };
}

export interface EventDetailsModalProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

export interface EventFormProps {
  addEvent: (event: Event) => void;
}

export interface EventListProps {
  events: Event[];
}

export interface EventCalendarProps {
  events: Event[];
}

export enum EventColor {
  Green = '#7cd992',
  Red = '#eb6060',
  Yellow = '#f7e463'
}
