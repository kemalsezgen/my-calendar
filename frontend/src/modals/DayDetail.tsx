import { useEffect, useState } from "react";
import { createModal } from "../utils/modal";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { getDayDetail } from "../api/fakeApis";
import { IDayDetail } from "../api/fakeApis";
import { Todo } from "../store/todo";
import { SpecialDay } from "../store/specialDay";

const DayDetail = () => {

  const [dayDetailData, setDayDetailData] = useState<IDayDetail | null>(null);

  const dayDetail = useSelector((state: any) => ({
    ...state.dayDetail,
    date: new Date(state.dayDetail.date),
  }));

  const fetchDayDetails = async () => {
    const localDate = dayDetail.date.toDateString();
    const dayDetailData = await getDayDetail(localDate);
    return dayDetailData;
  }

  useEffect(() => {
    const updateDayDetails = async () => {
      try {
        const data = await fetchDayDetails();
        setDayDetailData(data);
      } catch (error) {
        console.error("Error fetching day details:", error);
      }
    };

    updateDayDetails();
  }, []);

  return (
    <div className="flex flex-col h-[80dvh]">
      <Header title={"Day Detail"} date={dayDetail.date.toLocaleDateString()} />
      <div className="flex justify-center gap-4 h-full">
        <div className="flex-1 flex flex-col p-4 gap-4">
          <h1 className="text-2xl text-center">Tasks</h1>
          <ul>
            {dayDetailData?.tasks.map((todo: Todo) => (
              <li className="flex justify-between text-center items-center border-t-2 border-normalGreen p-4 last:border-b-2
              cursor-pointer"
                key={todo.id}
                onClick={() => createModal("taskDetail")}
              >
                <div className="cursor-pointer">
                  <h2 className="text-md">{todo.title}</h2>
                  <p className="text-xs">{todo.description}</p>
                </div>
                <div>
                  <span className={`text-xs ${todo.completed === "Completed" ? "text-green-500" : todo.completed === "In Progress" ? "text-yellow-500" : "text-red-500"}`}>
                    {todo.completed === "Completed" ? "✓" : todo.completed === "In Progress" ? "⚠" : "✗"} {todo.completed}
                  </span>
                  <p className="text-xs">{todo.startDate} - {todo.endDate}</p>
                </div>
              </li>
            ))}
          </ul>

          <button className="border-2 border-darkGray rounded-lg w-full p-4 text-normalGreen hover:bg-normalGreen hover:text-cream">
            Add task
          </button>
        </div>

        <div className="flex-1 flex flex-col p-4 gap-4">
          <h3 className="text-2xl text-center">Notes</h3>
          <ul>
            {dayDetailData?.notes.map((note) => (
              <li className="border-t-2 border-normalGreen p-4 last:border-b-2" key={note.id}>
                <h2 className="text-md">{note.title}</h2>
                <p className="text-xs">{note.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex flex-col p-4 gap-4">
          <h3 className="text-2xl text-center">Special Days</h3>
          <ul>
            {dayDetailData?.specialDays.map((specialDay: SpecialDay) => (
              <li className="border-t-2 border-normalGreen p-4 last:border-b-2" key={specialDay.id}>{specialDay.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div >
  )
}

export default DayDetail;