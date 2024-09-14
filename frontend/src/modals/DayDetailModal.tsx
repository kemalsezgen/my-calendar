import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, startOfDay } from "date-fns";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { RootState } from "../store";
import { Memory, removeMemory } from "../store/memory";
import { Task } from "@/types/Task";
import { showToast } from "../utils/toast";
import AddMemoryModal from "./Memory/AddMemoryModal";
import EditMemoryModal from "./Memory/EditMemoryModal";
import MemoryDetailModal from "./Memory/MemoryDetailModal";
import TaskDetailModal from "./Task/TaskDetailModal";
import TaskList from "@/components/Task/ListOfTask";
import AddTaskModal from "@/modals/Task/AddTaskModal";

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
}

const DayDetailModal: React.FC<DayDetailModalProps> = ({
  isOpen,
  onClose,
  date,
}) => {
  const dispatch = useDispatch();
  const allMemories = useSelector((state: RootState) => state.memory.memories);
  const allTasks = useSelector((state: RootState) => state.task.tasks);
  const [isAddMemoryModalOpen, setIsAddMemoryModalOpen] = useState(false);
  const [isEditMemoryModalOpen, setIsEditMemoryModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isTaskDetailModalOpen, setIsTaskDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const filteredMemories = useMemo(() => {
    const selectedDateString = date.toISOString().split("T")[0];
    return allMemories.filter((memory) => memory.date === selectedDateString);
  }, [allMemories, date]);

  const filteredTasks = useMemo(() => {
    const selectedDate = startOfDay(date);
    return allTasks.filter((task) => {
      const taskStartDate = startOfDay(new Date(task.startDate));
      const taskEndDate = startOfDay(new Date(task.endDate));
      return selectedDate >= taskStartDate && selectedDate <= taskEndDate;
    });
  }, [allTasks, date]);

  const handleDeleteMemory = (id: number) => {
    dispatch(removeMemory(id));
    showToast("Memory deleted successfully", "success");
  };

  const handleEditMemory = (memory: Memory) => {
    setSelectedMemory(memory);
    setIsEditMemoryModalOpen(true);
  };

  const handleOpenDetailModal = (memory: Memory) => {
    setSelectedMemory(memory);
    setIsDetailModalOpen(true);
  };

  const formatDate = (date: Date) => {
    return format(date, "EEEE, MMMM dd, yyyy");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col p-0">
          <div className="bg-gray-100 p-4 text-xl font-semibold">
            {formatDate(date)}
          </div>
          <div className="flex flex-1 p-4 overflow-hidden break-words">
            <div className="w-1/2 pr-4 border-r flex flex-col h-full">
              {filteredMemories.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold mb-4">Memories</h2>
                  <div className="flex-1 overflow-y-auto pr-2">
                    {filteredMemories.map((memory: Memory) => (
                      <div
                        key={memory.id}
                        className="mb-4 p-4 bg-gray-100 rounded-lg"
                      >
                        <div
                          className="cursor-pointer"
                          onClick={() => handleOpenDetailModal(memory)}
                        >
                          <h3 className="text-lg font-bold break-words overflow-hidden line-clamp-2 cursor-pointer hover:underline">
                            {memory.title}
                          </h3>
                          <p className="text-gray-600 mt-2 break-words overflow-hidden text-ellipsis line-clamp-5">
                            {memory.content}
                          </p>
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditMemory(memory)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteMemory(memory.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-black text-white hover:bg-gray-800 mt-4"
                    onClick={() => setIsAddMemoryModalOpen(true)}
                  >
                    Add Memory
                  </Button>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p
                    className="text-lg cursor-pointer hover:text-gray-700"
                    onClick={() => setIsAddMemoryModalOpen(true)}
                  >
                    There are no memories, wanna{" "}
                    <span className="font-bold">add</span> some?
                  </p>
                </div>
              )}
            </div>
            <div className="w-1/2 pl-4 pr-4 flex flex-col h-full">
              {filteredTasks.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold mb-4">Tasks</h2>
                  <div className="flex-1 overflow-y-auto pr-2">
                    <TaskList taskList={filteredTasks} />
                  </div>
                  <Button
                    className="w-full bg-black text-white hover:bg-gray-800 mt-4"
                    onClick={() => setIsAddTaskModalOpen(true)}
                  >
                    Add Task
                  </Button>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p
                    className="text-lg cursor-pointer hover:text-gray-700"
                    onClick={() => setIsAddTaskModalOpen(true)}
                  >
                    You don't have task today, wanna{" "}
                    <span className="font-bold">add</span> some?
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <AddMemoryModal
        isOpen={isAddMemoryModalOpen}
        onClose={() => setIsAddMemoryModalOpen(false)}
        date={date}
        showDatePicker={false}
      />
      <EditMemoryModal
        isOpen={isEditMemoryModalOpen}
        onClose={() => setIsEditMemoryModalOpen(false)}
        memory={selectedMemory}
      />
      <MemoryDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        memory={selectedMemory}
      />
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
      <TaskDetailModal
        isOpen={isTaskDetailModalOpen}
        onClose={() => setIsTaskDetailModalOpen(false)}
        task={selectedTask}
      />
    </>
  );
};

export default DayDetailModal;
