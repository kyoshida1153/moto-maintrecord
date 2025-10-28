"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import "./index.css";

import Loading from "@/components/Loading";
import useMaintenanceRecordsStore from "@/stores/useMaintenanceRecordsStore";
import { useEffect, useState } from "react";
import { format, add, sub } from "date-fns";

import { useSearchParams } from "next/navigation";
import isDateYyyyMm from "@/utils/isDateYyyyMm";
import Link from "next/link";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import type { MaintenanceRecordSelect } from "@/app/api/maintenance-records/route";

export default function MaintenanceRecordsCalendar() {
  const searchParams = useSearchParams();
  const { maintenanceRecords, maintenanceRecordsLoading } =
    useMaintenanceRecordsStore();
  const [initialDate, setInitialDate] = useState<string | undefined>(undefined);
  const [events, setEvents] = useState<object | undefined>(undefined);
  const [todayMonthUrlParam, setTodayMonthUrlParam] = useState<
    string | undefined
  >(undefined);
  const [prevMonthUrlParam, setPrevMonthUrlParam] = useState<
    string | undefined
  >(undefined);
  const [nextMonthUrlParam, setNextMonthUrlParam] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    // カレンダーの月
    const paramDate = searchParams.get("date") || "";
    if (isDateYyyyMm(paramDate)) setInitialDate(paramDate);

    // 前の月，今月、次の月リンク
    const targetDay = paramDate ? new Date(paramDate) : new Date();
    const todayMonth = format(new Date(), "yyyy-MM");
    setTodayMonthUrlParam(todayMonth);
    const nextMonth = format(add(targetDay, { months: 1 }), "yyyy-MM");
    setNextMonthUrlParam(nextMonth);
    const prevMonth = format(sub(targetDay, { months: 1 }), "yyyy-MM");
    setPrevMonthUrlParam(prevMonth);

    // 日付セルに出費金額を表示
    const resultGroup = Object.groupBy(
      maintenanceRecords,
      (x) => String(x.calenderDate).split("T")[0],
    );
    const newEvents = Object.entries(resultGroup).map(([date, records]) => {
      const sumCost = (records as MaintenanceRecordSelect[]).reduce(
        (sum, record) => sum + record.cost,
        0,
      );
      const title = String(sumCost.toLocaleString());
      const start = date;
      return { title, start };
    });
    setEvents(newEvents);
  }, [maintenanceRecords, searchParams]);

  // 日付セルをクリックした時の挙動テスト
  // const handleDateClick = (arg: DateClickArg) => {
  //   console.log(arg?.dateStr, arg?.dayEl?.innerText);
  // };
  return (
    <>
      {maintenanceRecordsLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : (
        <>
          <div className="mb-1 flex justify-between">
            <Link
              href={`?date=${prevMonthUrlParam}`}
              className="flex items-center rounded-[4px] py-1 pr-2 duration-200 hover:bg-[#ddd]"
            >
              <ChevronLeftIcon />
              <span className="mb-[2px] leading-none">前の月</span>
            </Link>
            <Link
              href={`?date=${todayMonthUrlParam}`}
              className="flex items-center gap-0.5 rounded-[4px] px-2 py-1 duration-200 hover:bg-[#ddd]"
            >
              <CalendarTodayIcon sx={{ fontSize: "20px" }} />
              <span className="mb-[2px] leading-none">今月</span>
            </Link>
            <Link
              href={`?date=${nextMonthUrlParam}`}
              className="flex items-center rounded-[4px] py-1 pl-2 duration-200 hover:bg-[#ddd]"
            >
              <span className="mb-[2px] leading-none">次の月</span>
              <ChevronRightIcon />
            </Link>
          </div>
          <div className="rounded border border-solid border-[var(--border-color-gray)] bg-white p-2 md:p-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              timeZone="Asia/Tokyo"
              locale="ja"
              initialDate={initialDate}
              events={events}
              // dateClick={handleDateClick}
              height="auto"
              dayCellContent={(e) => e.date.getDate()}
              headerToolbar={{
                // start: "",
                center: "",
                end: "",
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
