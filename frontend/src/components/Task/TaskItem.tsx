import React from "react";
import { Task } from "@/types/Task";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "completed":
      return "text-green-500";
    case "in progress":
      return "text-yellow-500";
    default:
      return "text-red-500";
  }
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.status === "Completed"
  ).length;

  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col">
      <div className="flex flex-col h-full">
        <div className="flex justify-between mb-2">
          <h3 className="text-lg font-bold break-words overflow-hidden line-clamp-2 w-[80%] pr-2">
            {task.title}
          </h3>
          <div className="w-[20%] flex flex-col items-end">
            <span className="text-sm whitespace-nowrap font-bold">
              <span className={`font-bold ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </span>
            <span className="text-sm text-gray-500 whitespace-nowrap">
              {format(new Date(task.startDate), "dd MMM yyyy")} -
              {format(new Date(task.endDate), "dd MMM yyyy")}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mt-2 break-words overflow-hidden text-ellipsis line-clamp-4 text-sm flex-grow">
          {task.description}
        </p>
      </div>
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          {task.subtasks.length > 0
            ? `${task.subtasks.length} subtasks (${completedSubtasks}/${task.subtasks.length})`
            : "No subtasks"}
        </p>
        <div className="flex">
          <Button variant="ghost" size="icon" onClick={() => onEdit(task)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
