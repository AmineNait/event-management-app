// src/hooks/useFetchEvents.ts

import { useState, useEffect } from "react";
import axios from "axios";
import { Event } from "../types";

const useFetchEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/events");
        const formattedEvents = response.data.map((event: Event) => ({
          ...event,
          title: event.name,
          start: event.startDate,
          end: event.endDate,
          backgroundColor: event.color,
        }));
        setEvents(formattedEvents);
        setLoading(false);
      } catch (error) {
        setError("There was an error fetching the events!");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error, setEvents };
};

export default useFetchEvents;
