import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeMemory } from "@/store/memory";
import MemoryItem from "./MemoryItem";
import EditMemoryModal from "@/modals/Memory/EditMemoryModal";
import { showToast } from "@/utils/toast";
import { Memory } from "@/types/Memory";

interface MemoryListProps {
  memoryList?: Memory[];
}

const MemoryList: React.FC<MemoryListProps> = ({ memoryList }) => {
  const dispatch = useDispatch();
  const memories = memoryList
    ? memoryList
    : useSelector((state: RootState) => state.memory.memories);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const handleEditMemory = (memory: Memory) => {
    setSelectedMemory({ ...memory });
    setIsEditModalOpen(true);
  };

  const handleDeleteMemory = (id: number) => {
    dispatch(removeMemory(id));
    showToast("Memory deleted successfully", "success");
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {memories.map((memory) => (
        <MemoryItem
          key={memory.id}
          memory={memory}
          onEdit={handleEditMemory}
          onDelete={handleDeleteMemory}
        />
      ))}
      {selectedMemory && (
        <EditMemoryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          memory={selectedMemory}
        />
      )}
    </div>
  );
};

export default MemoryList;