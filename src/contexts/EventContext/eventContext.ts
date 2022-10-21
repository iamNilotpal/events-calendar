import { createContext, useContext } from 'react';

export type EventType = {
  id: string;
  name: string;
  creator: string;
  startDate: Date | null;
  endDate: Date | null;
};

const EventContext = createContext<{
  events: EventType[];
  createEvent: (event: Exclude<EventType, 'setEvents'>) => void;
  deleteEvent: (id: string) => void;
}>({ events: [], createEvent: () => {}, deleteEvent: () => {} });

export const useEvents = () => useContext(EventContext);
export default EventContext;
