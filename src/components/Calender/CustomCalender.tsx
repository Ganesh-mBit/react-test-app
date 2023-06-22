import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import moment from 'moment';
import { Calendar, momentLocalizer, type View, type SlotInfo } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from './Modal';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CustomToolbar from './Toolbar';

const localizer = momentLocalizer(moment);

interface EventDetails {
  title: string
  desc: string
  start: any
  end: any
  color: string
}

const CustomCalender = (): JSX.Element => {
  const defaultEventValues = {
    title: '',
    desc: '',
    start: '',
    end: '',
    color: ''
  };

  const [openSlot, setOpenSlot] = useState(false);
  const [calendarView, setCalendarView] = useState<View | undefined>('month');
  const [errors, setErrors] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [eventDetails, setEventDetails] = useState<EventDetails>(defaultEventValues);
  const [clickedEvent, setClickedEvent] = useState<EventDetails>(defaultEventValues);
  const [events, setEvents] = useState<EventDetails[] | any[]>([]);
  const [date, setDate] = useState(new Date());

  const hanleClose = (): void => {
    if (openSlot) {
      setOpenSlot(false);
    } else {
      setOpenEvent(false);
    }
    setEventDetails(defaultEventValues);
  };

  const handleSlotSelected = (slotIfo: SlotInfo): void => {
    setEventDetails((prev) => {
      return {
        ...prev,
        start: slotIfo.start,
        end: slotIfo.start
      };
    });
    setOpenSlot(true);
  };

  const handleEvents = (event: any): void => {
    const eventDetails = {
      color: event?.color,
      title: event?.title,
      desc: event?.desc,
      start: event?.start,
      end: event?.end
    };
    setEventDetails(eventDetails);
    setClickedEvent(eventDetails);
    setOpenEvent(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string): void => {
    setEventDetails((prev) => {
      return {
        ...prev,
        [key]: e.target.value
      };
    });
  };

  const handleTimeChange = (value: any, key: string): void => {
    setEventDetails((prev) => {
      return {
        ...prev,
        [key]: value
      };
    });
  };

  const handleNavigate = (action: string): void => {
    const month = date.getMonth();
    if (action === 'PREV') {
      const newDate = date.setMonth(month - 1);
      setDate(new Date(newDate));
    } else {
      const newDate = date.setMonth(month + 1);
      setDate(new Date(newDate));
    }
  };

  const createEvent = (): void => {
    const { title, desc } = eventDetails;
    const updateEvents = [...events];
    if (title && desc) {
      updateEvents.push({
        title,
        desc,
        start: eventDetails?.start?.$d ?? eventDetails?.start,
        end: eventDetails?.end?.$d ?? eventDetails?.end,
        color: '#001762'
      });
      setEvents(updateEvents);
      hanleClose();
      setEventDetails(defaultEventValues);
      setErrors(false);
    } else {
      setErrors(true);
    }
  };

  const updateEvent = (): void => {
    const index = events.findIndex((event) => clickedEvent.title.match(event.title));
    const newEvents = events.slice();
    newEvents[index].title = eventDetails.title;
    newEvents[index].desc = eventDetails.desc;
    newEvents[index].start = eventDetails?.start?.$d ?? eventDetails?.start;
    newEvents[index].end = eventDetails?.end?.$d ?? eventDetails?.end;
    setEvents(newEvents);
    hanleClose();
  };

  const deleteEvent = (): void => {
    const index = events.findIndex((event) => clickedEvent.title.match(event.title));
    const newEvents = events.slice();
    newEvents.splice(index, 1);
    setEvents(newEvents);
    hanleClose();
  };

  const slotActions = [
    <Button key='cancel' onClick={hanleClose} color='error'>Cancel</Button>,
    <Button key='add' onClick={createEvent} color='secondary'>Add</Button>
  ];

  const eventActions = [
    <Button key='cancel' onClick={hanleClose} color='error'>Cancel</Button>,
    <Button key='delete' onClick={deleteEvent} color='error'>Delete</Button>,
    <Button key='add' onClick={updateEvent} color='secondary'>Save</Button>
  ];

  const eventStyleGetter = (event: EventDetails): object => {
    const style: React.CSSProperties = {
      backgroundColor: event.color,
      color: '#FFFFFF',
      borderRadius: '4px',
      border: 'none'
    };
    return {
      style
    };
  };

  return (
    <Box sx={{ px: { xs: 1, md: 8 }, py: 4 }}>
      <Box sx={{ height: '85vh', overflow: 'auto' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'agenda']}
          view={calendarView}
          onView={(view) => { setCalendarView(view); }}
          selectable
          date={date}
          onNavigate={(date) => { console.log(date); }}
          onSelectSlot={handleSlotSelected}
          onSelectEvent={handleEvents}
          eventPropGetter={eventStyleGetter}
          style={{ height: '100%' }}
          components={{
            toolbar: (props) => (
              <CustomToolbar
                {...props}
                date={date}
                view={calendarView ?? ''}
                onView={setCalendarView}
                onNavigate={handleNavigate}
              />
            )
          }}
        />
      </Box>
      <Modal
        title={openSlot ? 'Create new event' : 'Edit Event'}
        open={openSlot || openEvent}
        onClose={hanleClose}
        actions={openSlot ? slotActions : eventActions}
      >
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            placeholder='Title'
            value={eventDetails.title}
            onChange={(e) => { handleTextChange(e, 'title'); }}
            error={errors && !eventDetails.title}
            helperText={errors && !eventDetails.title ? 'Field is required.' : ''}
          />
          <TextField
            fullWidth
            placeholder='Description'
            value={eventDetails.desc}
            onChange={(e) => { handleTextChange(e, 'desc'); }}
            error={errors && !eventDetails.desc}
            helperText={errors && !eventDetails.desc ? 'Field is required.' : ''}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker label="Start Time" value={dayjs(eventDetails?.start)} onChange={(value) => { handleTimeChange(value, 'start'); }} />
            <MobileTimePicker label="End Time" value={dayjs(eventDetails?.end)} onChange={(value) => { handleTimeChange(value, 'end'); }} />
          </LocalizationProvider>
        </Box>
      </Modal>
    </Box>
  );
};

export default CustomCalender;
