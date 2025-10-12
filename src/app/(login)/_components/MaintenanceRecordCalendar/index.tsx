"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import "./index.css";

export default function MaintenanceRecordCalendar({
  events,
}: {
  events?: { title: string; start: string }[];
}) {
  const handleDateClick = (arg: DateClickArg) => {
    console.log(arg?.dateStr, arg?.dayEl?.innerText);
  };

  return (
    <div className="rounded border border-solid border-[var(--border-color-gray)] bg-white p-2 md:p-8">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        timeZone="Asia/Tokyo"
        locale="ja"
        events={events}
        dateClick={handleDateClick}
        height="auto"
        dayCellContent={(e) => e.date.getDate()}
      />
    </div>
  );
}
