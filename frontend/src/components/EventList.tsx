// EventList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  timezone: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events');
        setEvents(response.data);
      } catch (error) {
        console.error("There was an error fetching the events!", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Event List</h1>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>{new Date(event.startDate).toLocaleString()}</p>
            <p>{new Date(event.endDate).toLocaleString()}</p>
            <p>{event.timezone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
