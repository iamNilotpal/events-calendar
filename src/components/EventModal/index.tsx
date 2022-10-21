import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';
import { EventType, useEvents } from '../../contexts/EventContext/eventContext';

type EventModalProps = {
  isOpen: boolean;
  date: Date | null;
  registeredEvent: EventType | undefined;
  onClose: () => void;
};

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  date,
  registeredEvent,
}) => {
  const initialRef = React.useRef(null);
  const { createEvent } = useEvents();

  const [title, setTitle] = React.useState(registeredEvent?.name || '');
  const [creator, setCreator] = React.useState(registeredEvent?.creator || '');

  useEffect(() => {
    setTitle(registeredEvent?.name || '');
    setCreator(registeredEvent?.creator || '');
  }, []);

  const handleEventClick = () => {
    createEvent({
      name: title.trim(),
      creator: creator.trim(),
      startDate: date,
      endDate: date,
      id: registeredEvent?.id || nanoid(),
    });
    setTitle('');
    setCreator('');
    onClose();
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your event</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Event Name</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Event name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Event Creator</FormLabel>
            <Input
              placeholder="Event creator"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleEventClick}>
            {registeredEvent ? 'Save Event' : 'Create Event'}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
