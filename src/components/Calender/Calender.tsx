import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, type View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

interface Event {
  id: number
  title: string
  start: Date
  end: Date
  color: string
}

const events: Event[] = [
  {
    id: 1,
    title: 'Event 1',
    start: new Date(2023, 6, 1, 10, 0), // example start date and time
    end: new Date(2023, 6, 1, 12, 0), // example end date and time
    color: '#FF0000' // example color for the event
  },
  {
    id: 1,
    title: 'Event 1',
    start: new Date(2023, 6, 1, 10, 0), // example start date and time
    end: new Date(2023, 6, 5, 12, 0), // example end date and time
    color: '#010101' // example color for the event
  }
  // Add more events with different colors
];

const MyCalendar: React.FC = () => {
  const [defaultView, setDefaultView] = useState<View | undefined>('month');

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth < 768) {
        setDefaultView('day');
      } else {
        setDefaultView('month');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const eventStyleGetter = (event: Event): object => {
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
    <div className="calendar-container">
      <Calendar<Event>
        localizer={localizer}
        events={events}
        startAccessor={(event) => event.start}
        endAccessor={(event) => event.end}
        views={['month', 'week', 'day']}
        defaultView={defaultView}
        eventPropGetter={eventStyleGetter}
        className="responsive-calendar"
        style={{ height: '500px' }}
      />
    </div>
  );
};

export default MyCalendar;
