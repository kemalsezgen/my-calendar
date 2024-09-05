import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDate } from "../store/dayDetail";

interface CalendarDayProps {
  day: number;
  statu: string;
  date: Date;
  onClick?: () => void;
}

function CalendarDay({ day, statu, date, onClick }: CalendarDayProps) {

  const [isToday, setIsToday] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    setIsToday(
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  }, [date]);

  const handleClick = () => {
    dispatch(setDate(date.toISOString()));
    if (onClick) onClick();
  };

  return (
    <div
      key={statu}
      className={`calendar-day flex p-2 justify-end h-[100px] border border-gray-300 cursor-pointer
         hover:bg-gray-100
        ${statu.includes("other") ? `text-gray-400` : ""}
        ${isToday && statu.includes("this") ? `bg-cream` : ""}
        `}
      onClick={handleClick}
    >
      {day}
    </div>
  );
}

export default CalendarDay;