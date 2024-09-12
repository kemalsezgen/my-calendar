import React, { useState } from "react";
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
import { addTask } from "@/store/task";
import { Task } from "@/types/Task";
import { showToast } from "@/utils/toast";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { DateRange } from "react-day-picker";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "Not Started" | "In Progress" | "Completed"
  >("Not Started");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleAddTask = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !dateRange?.from ||
      !dateRange?.to
    ) {
      showToast("All fields are required.", "error");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status,
      startDate: dateRange.from.toISOString(),
      endDate: dateRange.to.toISOString(),
      subtasks: [],
    };

    dispatch(addTask(newTask));
    onClose();
    setTitle("");
    setDescription("");
    setStatus("Not Started");
    setDateRange(undefined);
    showToast("Task added successfully", "success");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] sm:w-[90vw]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
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
              placeholder="Title"
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
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="flex justify-between">
            <div className="w-1/2">
              <label
                htmlFor="dateRange"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date Range
              </label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
            <div className="w-1/2">
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
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAddTask}>Add Task</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
