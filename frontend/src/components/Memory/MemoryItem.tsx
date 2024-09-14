import React, { useState } from "react";
import { Memory } from "@/types/Memory";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import MemoryDetailModal from "@/modals/Memory/MemoryDetailModal";

interface MemoryItemProps {
  memory: Memory;
  onEdit: (memory: Memory) => void;
  onDelete: (id: number) => void;
}

const MemoryItem: React.FC<MemoryItemProps> = ({
  memory,
  onEdit,
  onDelete,
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const handleOpenDetailModal = (memory: Memory) => {
    setSelectedMemory(memory);
    setIsDetailModalOpen(true);
  };

  return (
    <div
      key={memory.id}
      className="flex justify-between bg-gray-100 rounded-lg p-4 shadow-md flex-col h-[250px]"
    >
      <div
        className="flex flex-col h-full cursor-pointer"
        onClick={() => handleOpenDetailModal(memory)}
      >
        <h3 className="text-lg font-bold break-words overflow-hidden line-clamp-2 cursor-pointer">
          {memory.emoji} {memory.title}
        </h3>
        <p className="text-gray-600 mt-2 break-words overflow-hidden text-ellipsis line-clamp-5 text-sm">
          {memory.content}
        </p>
      </div>
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          {new Date(memory.date).toLocaleDateString()}
        </p>
        <div className="flex">
          <Button variant="ghost" size="icon" onClick={() => onEdit(memory)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(memory.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <MemoryDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        memory={selectedMemory}
      />
    </div>
  );
};

export default MemoryItem;
