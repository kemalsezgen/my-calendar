import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Memory } from '../store/memory';
import { format } from 'date-fns';

interface MemoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: Memory | null;
}

const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({ isOpen, onClose, memory }) => {
  if (!memory) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] w-full max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 break-all">{memory.title}</DialogTitle>
          <p className="text-sm text-gray-500">
            {format(new Date(memory.date), 'dd MMMM yyyy')}
          </p>
        </DialogHeader>
        <div className="mt-4 flex-grow overflow-y-auto">
          <p className="text-gray-700 whitespace-pre-wrap break-all text-sm">{memory.content}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemoryDetailModal;