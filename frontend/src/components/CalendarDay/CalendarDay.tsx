import { useState, useEffect } from "react";
import { Memory } from "@/types/Memory";
import { Task } from "@/types/Task";

interface CalendarDayProps {
  day: number;
  statu: string;
  date: Date;
  memories: Memory[];
  tasks: Task[];
  onClick?: (date: Date) => void;
}

function CalendarDay({
  day,
  statu,
  date,
  memories,
  tasks,
  onClick,
}: CalendarDayProps) {
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
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const formattedDate = localDate.toISOString().split("T")[0];
    return memories.filter((memory: Memory) => memory.date === formattedDate);
  };

  const getTasksForDate = () => {
    return tasks.filter((task: Task) => {
      const taskStartDate = new Date(task.startDate);
      const taskEndDate = new Date(task.endDate);
      return date >= taskStartDate && date <= taskEndDate;
    });
  };

  const dayMemories = getMemoriesForDate();
  const dayTasks = getTasksForDate();

  return (
    <div
      className={`calendar-day flex flex-col p-2 justify-between h-[100px] border border-gray-300 cursor-pointer
        hover:bg-gray-100 overflow-y-hidden overflow-x-hidden
        ${statu.includes("other") ? `text-gray-400` : ""}
        ${isToday && statu.includes("this") ? `bg-cream` : ""}
      `}
      onClick={() => onClick && onClick(date)}
    >
      <div className="self-end">{day}</div>

      <div className="flex gap-1">
        {dayMemories.length > 0 &&
          dayMemories.map((memory) => (
            <div
              key={memory.id}
              className="memory-indicator text-xs flex gap-1"
            >
              {memory.emoji}
            </div>
          ))}
      </div>
      {dayTasks.length > 0 && (
        <div className="task-indicator text-xs mt-1 flex flex-col gap-1">
          {dayTasks.map((task, index) => (
            <div key={index} className="truncate bg-blue-200 px-1 rounded">
              {task.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CalendarDay;
