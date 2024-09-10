import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Memory, removeMemory } from '../store/memory';
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import AddMemoryModal from "../modals/AddMemoryModal";
import EditMemoryModal from "../modals/EditMemoryModal";
import MemoryDetailModal from "../modals/MemoryDetailModal";
import { showToast } from '../utils/toast';

const Memories = () => {
  const dispatch = useDispatch();
  const memories = useSelector((state: RootState) => state.memory.memories);
  const [isAddMemoryModalOpen, setIsAddMemoryModalOpen] = useState(false);
  const [isEditMemoryModalOpen, setIsEditMemoryModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

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

  return (
    <div className="container mx-auto p-4 mt-2">
      <div className="flex justify-between items-center mb-6 center">
        <h1 className="text-3xl font-bold text-center">All Memories</h1>
        <Button
          className="max-w-sm text-center bg-black text-white hover:bg-gray-800"
          onClick={() => setIsAddMemoryModalOpen(true)}
        >
          Add Memory
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {memories.map((memory: Memory) => (
          <div
            key={memory.id}
            className="flex justify-between bg-gray-100 rounded-lg p-4 shadow-md flex-col h-[250px]"
          >
            <div className="flex flex-col h-full cursor-pointer"
              onClick={() => handleOpenDetailModal(memory)}
            >
              <h3
                className="text-lg font-bold break-words overflow-hidden line-clamp-2 cursor-pointer hover:underline"
              >
                {memory.title}
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
          </div>
        ))}
      </div>
      <AddMemoryModal
        isOpen={isAddMemoryModalOpen}
        onClose={() => setIsAddMemoryModalOpen(false)}
        date={new Date()}
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
    </div>
  );
};

export default Memories;