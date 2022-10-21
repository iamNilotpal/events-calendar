import React, { useEffect } from 'react';
import EventContext, { EventType } from './eventContext';

const getEventsFromStorage = (): EventType[] => {
  const events = localStorage.getItem('events');
  return events && events.length > 0 ? JSON.parse(events) : [];
};

const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = React.useState<EventType[]>(getEventsFromStorage);

  const createEvent = React.useCallback((event: EventType) => {
    const { creator, endDate, name, startDate, id } = event;
    if (!creator || !endDate || !name || !startDate) return;

    const existEvent = events.find((item: EventType) => item.id === id);
    if (existEvent)
      setEvents((prev) =>
        prev.map((item) => {
          if (item.id === id) return { ...item, ...event };
          return item;
        })
      );
    else setEvents((prevEvents) => [event, ...prevEvents]);
  }, []);

  const deleteEvent = React.useCallback((id: string) => {
    setEvents((data) => data.filter((event) => event.id !== id));
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  return (
    <EventContext.Provider value={{ events, createEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
