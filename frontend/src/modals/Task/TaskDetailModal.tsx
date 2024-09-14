import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from 'date-fns';
import { Task } from '@/types/Task';

interface TaskDetailModal {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const TaskDetailModal: React.FC<TaskDetailModal> = ({ isOpen, onClose, task }) => {
  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] w-full max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 break-all">{task.title}</DialogTitle>
          <p className="text-sm text-gray-500">
            {format(new Date(task.startDate), 'dd MMMM yyyy')} - {format(new Date(task.endDate), 'dd MMMM yyyy')}
          </p>
        </DialogHeader>
        <div className="mt-4 flex-grow overflow-y-auto">
          <p className="text-gray-700 whitespace-pre-wrap break-all text-sm">{task.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailModal;