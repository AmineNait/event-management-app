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
