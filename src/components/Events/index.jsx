import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import { useEvents } from '../../contexts/EventContext/eventContext';
import styles from './Events.module.css';

const Overlay = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
);

const Events = () => {
  const { events, deleteEvent } = useEvents();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={styles.container}>
      {events.length == 0 && (
        <Text fontSize={20} fontWeight="bold">
          No Events Registered. );
        </Text>
      )}
      {events.length > 0 && (
        <>
          <Button onClick={onOpen}>Show All Events</Button>
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <Overlay />
            <ModalContent>
              <ModalHeader>Registered Events</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {events.length === 0 && <Text>No Events Found.</Text>}
                {events.map((event, i) => (
                  <Box
                    mt={i !== 0 ? '15px' : '0px'}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    key={event.id}
                  >
                    <Text>{event.name}</Text>
                    <Text>{event.creator}</Text>
                    <Text>
                      {moment(event.startDate).toDate().toDateString()}
                    </Text>
                    <img
                      src="/trash.svg"
                      alt="Trash icon"
                      className={styles.trash}
                      onClick={() => deleteEvent(event.id)}
                      style={{ width: '15px', cursor: 'pointer' }}
                    />
                  </Box>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Events;
