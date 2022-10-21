import { useDisclosure } from '@chakra-ui/react';
import moment from 'moment';
import RcYearCalendar from 'rc-year-calendar';
import React, { useEffect } from 'react';

import { EventType, useEvents } from '../../contexts/EventContext/eventContext';
import EventModal from '../EventModal';
import styles from './Calendar.module.css';

const Calendar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { events } = useEvents();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [registeredEvent, setRegisteredEvent] = React.useState<
    EventType | undefined
  >(undefined);

  const newEvents = events.map((item) => ({
    ...item,
    startDate: moment(item.startDate).toDate(),
    endDate: moment(item.endDate).toDate(),
  }));

  const handleCreateEvent = (value: Date) => {
    const event = events.find((event) => {
      const eventDate = moment(event.startDate).toDate();
      return (
        eventDate.getDay() === value.getDay() &&
        eventDate.getMonth() === value.getMonth() &&
        eventDate.getFullYear() === value.getFullYear()
      );
    });
    console.log(event);
    setRegisteredEvent(event);
    setSelectedDate(value);
    onOpen();
  };

  return (
    <div className={styles.container}>
      <RcYearCalendar
        dataSource={newEvents}
        onDayClick={(value: any) => handleCreateEvent(value.date)}
        minDate={new Date()}
      />
      {isOpen && (
        <EventModal
          isOpen={isOpen}
          onClose={onClose}
          date={selectedDate}
          registeredEvent={registeredEvent}
        />
      )}
    </div>
  );
};

export default React.memo(Calendar);
