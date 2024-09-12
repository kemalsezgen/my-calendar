import { useState } from 'react';
import { Button } from "@/components/ui/button";
import AddTaskModal from "../modals/Task/AddTaskModal";
import TaskList from "../components/Task/TaskList";

const TasksPage = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <div className="container mx-auto p-4 mt-2">
      <div className="flex justify-between items-center mb-6 center">
        <h1 className="text-3xl font-bold text-center">Tasks</h1>
        <Button
          className="max-w-sm text-center bg-black text-white hover:bg-gray-800"
          onClick={() => setIsAddTaskModalOpen(true)}
        >
          Add Task
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <TaskList />
      </div>
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
    </div>
  );
}

export default TasksPage;