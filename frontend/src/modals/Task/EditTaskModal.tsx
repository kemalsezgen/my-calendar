import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTask } from "@/store/task";
import { Task } from "@/types/Task";
import { showToast } from "@/utils/toast";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { DateRange } from "react-day-picker";
import { Subtask } from "@/types/Subtask";
import SubtaskItem from "@/components/Task/SubtaskItem";
import CompleteTaskModal from "./CompleteTaskModal";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<
    "Not Started" | "In Progress" | "Completed"
  >(task.status as "Not Started" | "In Progress" | "Completed");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: task.startDate ? new Date(task.startDate) : undefined,
    to: task.endDate ? new Date(task.endDate) : undefined,
  });
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks);
  const [showCompleteTaskModal, setShowCompleteTaskModal] = useState(false);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status as "Not Started" | "In Progress" | "Completed");
    setDateRange({
      from: task.startDate ? new Date(task.startDate) : undefined,
      to: task.endDate ? new Date(task.endDate) : undefined,
    });
    setSubtasks(task.subtasks);
  }, [task]);

  useEffect(() => {
    console.log("statuxcxcs:", status);
  }, [status]);

  const handleEditTask = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !dateRange?.from ||
      !dateRange?.to
    ) {
      showToast("All fields are required.", "error");
      return;
    }

    if (subtasks.some((subtask) => subtask.title === "")) {
      showToast("Subtask title cannot be empty.", "error");
      return;
    }

    // Check if all subtasks are completed
    const allSubtasksCompleted = subtasks.every(
      (subtask) => subtask.status === "Completed"
    );

    console.log("allSubtasksCompleted:", allSubtasksCompleted);
    console.log("status:", status);
    if (allSubtasksCompleted && status !== "Completed") {
      setShowCompleteTaskModal(true);
    } else {
      updateTaskAndClose();
    }
  };

  const updateTaskAndClose = (
    newStatus?: "Not Started" | "In Progress" | "Completed"
  ) => {
    const updatedTask: Task = {
      ...task,
      title,
      description,
      status: newStatus || status,
      startDate: dateRange?.from?.toISOString() || task.startDate,
      endDate: dateRange?.to?.toISOString() || task.endDate,
      subtasks,
    };

    dispatch(updateTask(updatedTask));
    onClose();
    showToast("Task updated successfully", "success");
  };

  const handleAddSubtask = () => {
    if (subtasks.length >= 4) {
      showToast("You can only have 4 subtasks.", "error");
      return;
    }

    const newSubtask: Subtask = {
      id: Date.now(),
      title: "",
      description: "",
      status: "Not Started",
    };
    setSubtasks([...subtasks, newSubtask]);
  };

  const handleUpdateSubtask = (updatedSubtask: Subtask) => {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === updatedSubtask.id ? updatedSubtask : subtask
      )
    );
  };

  const handleRemoveSubtask = (id: number) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] sm:w-[90vw]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
            <div className="flex-1">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <Select
                value={status}
                onValueChange={(
                  value: "Not Started" | "In Progress" | "Completed"
                ) => setStatus(value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtasks
            </label>
            {subtasks.map((subtask) => (
              <SubtaskItem
                key={subtask.id}
                subtask={subtask}
                onUpdate={handleUpdateSubtask}
                onRemove={handleRemoveSubtask}
              />
            ))}
            <Button onClick={handleAddSubtask} className="mt-2">
              Add Subtask
            </Button>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleEditTask}>Update Task</Button>
        </div>
      </DialogContent>
      {showCompleteTaskModal && (
        <CompleteTaskModal
          showCompleteTaskModal={showCompleteTaskModal}
          setShowCompleteTaskModal={setShowCompleteTaskModal}
          updateTaskAndClose={updateTaskAndClose}
        />
      )}
    </Dialog>
  );
};

export default EditTaskModal;
