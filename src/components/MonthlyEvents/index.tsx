import moment from 'moment';
import { useEvents } from '../../contexts/EventContext/eventContext';
import styles from './Events.module.css';

const MonthlyEvents = () => {
  const { events, deleteEvent } = useEvents();

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const currentMonthEvents = events.filter((event) => {
    const { startDate } = event;
    const eventYear = moment(startDate).year();
    const eventMonth = moment(startDate).month();
    return eventMonth === currentMonth && eventYear === currentYear;
  });

  return (
    <div className={styles.container}>
      {currentMonthEvents.length !== 0 && (
        <h1
          style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}
        >
          Events for this month:
        </h1>
      )}
      <div className={styles.events}>
        {currentMonthEvents.map((item) => (
          <div key={item.id} className={styles.event}>
            <img
              src="/trash.svg"
              alt="Trash icon"
              className={styles.trash}
              onClick={() => deleteEvent(item.id)}
            />
            <p className={styles.eventName}>{item.name}</p>
            <p className={styles.creator}>{item.creator}</p>
            <p className={styles.date}>
              {moment(item.startDate).toDate().toDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyEvents;
