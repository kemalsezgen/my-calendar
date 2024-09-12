import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeTask } from '@/store/task';
import TaskItem from './TaskItem';
import EditTaskModal from '@/modals/Task/EditTaskModal';
import { showToast } from '@/utils/toast';
import { Task } from '@/types/Task';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEditTask = (task: Task) => {
    setSelectedTask({ ...task });
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (id: number) => {
    dispatch(removeTask(id));
    showToast("Task deleted successfully", "success");
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      ))}
      {selectedTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default TaskList;