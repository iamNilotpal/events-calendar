import { ChakraProvider } from '@chakra-ui/react';
import Calendar from './components/Calendar';
import Events from './components/Events';
import MonthlyEvents from './components/MonthlyEvents';
import EventProvider from './contexts/EventContext';

const App = () => {
  return (
    <ChakraProvider>
      <EventProvider>
        <Calendar />
        <MonthlyEvents />
        <Events />
      </EventProvider>
    </ChakraProvider>
  );
};

export default App;
