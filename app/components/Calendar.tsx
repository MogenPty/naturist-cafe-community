"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns/format";
import { getDay } from "date-fns/getDay";
import { enZA } from "date-fns/locale/en-ZA";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";

const locales = {
  "en-ZA": enZA,
};
// Extract the union type of view values: "month" | "week" | "day" | "agenda"
type CalendarView = (typeof Views)[keyof typeof Views];

/* {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true, // this is optional, and the default is false
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  }, */
// const myEventsList = [
//   {
//     id: 1,
//     title: "Long Event",
//     start: new Date(2025, 3, 7),
//     end: new Date(2025, 3, 10),
//   },

//   {
//     id: 2,
//     title: "DTS STARTS",
//     start: new Date(2026, 2, 13, 0, 0, 0),
//     end: new Date(2026, 2, 20, 0, 0, 0),
//   },

//   {
//     id: 3,
//     title: "DTS ENDS",
//     start: new Date(2026, 10, 6, 0, 0, 0),
//     end: new Date(2026, 10, 13, 0, 0, 0),
//   },

//   {
//     id: 4,
//     title: "Some Event",
//     start: new Date(2025, 3, 9, 0, 0, 0),
//     end: new Date(2025, 3, 9, 0, 0, 0),
//     allDay: true,
//   },
// ];

const MyCalendar = () => {
  const [view, setView] = useState<CalendarView>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const localizer = useMemo(
    () =>
      dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
      }),
    [],
  ); // memoize to prevent recreation on every render

  const handleViewChange = (newView: CalendarView) => {
    setView(newView);
  };
  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div className="p-8">
      <Calendar
        localizer={localizer}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default MyCalendar;
