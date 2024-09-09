import { useState, useEffect } from "react";
import { Memory } from "../store/memory";

interface CalendarDayProps {
  day: number;
  statu: string;
  date: Date;
  memories: Memory[];
  onClick?: (date: Date) => void;
}

function CalendarDay({ day, statu, date, memories, onClick }: CalendarDayProps) {
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const today = new Date();
    setIsToday(
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  }, [date]);

  const getMemoriesForDate = () => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0];
    return memories.filter((memory: Memory) => memory.date === formattedDate);
  };

  const dayMemories = getMemoriesForDate();

  return (
    <div
      className={`calendar-day flex flex-col p-2 justify-between h-[100px] border border-gray-300 cursor-pointer
        hover:bg-gray-100
        ${statu.includes("other") ? `text-gray-400` : ""}
        ${isToday && statu.includes("this") ? `bg-cream` : ""}
      `}
      onClick={() => onClick && onClick(date)}
    >
      <div className="self-end">{day}</div>
      {dayMemories.length > 0 && (
        <div className="memory-indicator text-xs">
          {dayMemories.length <= 2
            ? dayMemories.map((memory, index) => (
                <div key={index} className="truncate">{memory.title}</div>
              ))
            : `${dayMemories.length} memories`}
        </div>
      )}
    </div>
  );
}

export default CalendarDay;