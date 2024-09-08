import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CalendarDay from "../components/CalendarDay";
import DayDetailModal from "../modals/DayDetailModal";
import { setDate } from "../store/dayDetail";

function Calendar() {
  const dispatch = useDispatch();
  const [date, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const MIN_YEAR = 1900;
  const MAX_YEAR = 2100;

  useEffect(() => {
    setDate(new Date());
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const handlePrevMonth = () => {
    const prevMonth = date.getMonth() - 1;
    if (prevMonth < 0) {
      if (date.getFullYear() > MIN_YEAR) {
        setDate(new Date(date.getFullYear() - 1, 11, 1));
      }
    } else {
      setDate(new Date(date.getFullYear(), prevMonth, 1));
    }
  };

  const handleNextMonth = () => {
    const nextMonth = date.getMonth() + 1;
    if (nextMonth > 11) {
      if (date.getFullYear() < MAX_YEAR) {
        setDate(new Date(date.getFullYear() + 1, 0, 1));
      }
    } else {
      setDate(new Date(date.getFullYear(), nextMonth, 1));
    }
  };

  const renderCalendar = () => {
    const year = date.getFullYear(); // 2024
    const month = date.getMonth(); // 0-11
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month); // 0-6

    const weeks = [];
    let days = [];

    // Önceki ayın günlerini ekle
    const prevMonthDays = firstDayOfMonth;
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const dateObj = new Date(year, month - 1, day);
      days.push(
        <CalendarDay
          key={`prev-${day}`}
          statu={`other-month-${prevMonthDays - i}`}
          day={day}
          date={dateObj}
          onClick={() => console.log("clicked")}
        />
      );
    }

    // Bu ayın günlerini ekle
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);

      days.push(
        <CalendarDay
          key={`current-${day}`}
          statu="this-month"
          day={day}
          date={dateObj}
          onClick={() => {
            dispatch(setDate(dateObj.toISOString()));
            setSelectedDate(dateObj);
            setIsModalOpen(true);
          }}
        />
      );

      if ((day + firstDayOfMonth) % 7 === 0) {
        weeks.push(
          <div key={`week-${day}`} className="calendar-week grid grid-cols-7">
            {days}
          </div>
        );
        days = [];
      }
    }

    // add remaining days of the next month
    const remainingCells = 42 - (daysInMonth + prevMonthDays);
    for (let i = 1; i <= remainingCells; i++) {
      const dateObj = new Date(year, month + 1, i);
      days.push(
        <CalendarDay
          key={`next-${i}`}
          statu={`other-month-${i}`}
          day={i}
          date={dateObj}
          onClick={() => console.log("clicked")}
        />
      );

      if (days.length === 7) {
        weeks.push(
          <div
            key={`next-week-${i}`}
            className="calendar-week grid grid-cols-7"
          >
            {days}
          </div>
        );
        days = [];
      }
    }

    return weeks;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-grow flex items-center justify-center flex-col">
        <div className="mx-auto border border-gray-300 shadow-lg rounded-lg w-11/12">
          <div className="flex justify-between items-center bg-gray-100 p-2 border-b border-gray-300">
            <button
              onClick={handlePrevMonth}
              className="text-l font-bold px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              {"<"}
            </button>
            <span className="text-xl font-semibold">
              {monthNames[date.getMonth()]} {date.getFullYear()}
            </span>
            <button
              onClick={handleNextMonth}
              className="text-l font-bold px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              {">"}
            </button>
          </div>
          <div className="calendar-body">
            <div className="grid grid-cols-7">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="calendar-weekday flex items-center justify-center h-8 font-semibold text-gray-700 border-b border-b-300"
                >
                  {day}
                </div>
              ))}
            </div>
            {renderCalendar()}
          </div>
        </div>
      </div>
      {selectedDate && (
        <DayDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          date={selectedDate}
        />
      )}
    </div>
  );
}

export default Calendar;
