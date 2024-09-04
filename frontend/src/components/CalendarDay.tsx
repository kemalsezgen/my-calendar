import { useState, useEffect } from "react";

interface CalendarDayProps {
  day: number;
  statu: string;
  date: Date;
}

function CalendarDay({ day, statu, date }: CalendarDayProps) {

  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const today = new Date();
    setIsToday(
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  }, [date]);

  return (
    <div
      key={statu}
      className={`calendar-day flex p-2 justify-end h-[100px] border border-gray-300 cursor-pointer
         hover:bg-gray-100
        ${statu.includes("other") ? `text-gray-400` : ""}
        ${isToday && statu.includes("this") ? `bg-cream` : ""}
        `}
    >
      {day}
    </div>
  );
}

export default CalendarDay;