import { useState } from 'react';
import { Button } from "@/components/ui/button";
import AddMemoryModal from "../modals/Memory/AddMemoryModal";
import MemoryList from '@/components/Memory/MemoryList';

const Memories = () => {
  const [isAddMemoryModalOpen, setIsAddMemoryModalOpen] = useState(false);

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
        <MemoryList />
      </div>
      <AddMemoryModal
        isOpen={isAddMemoryModalOpen}
        onClose={() => setIsAddMemoryModalOpen(false)}
        date={new Date()}
        showDatePicker={true}
      />
    </div>
  );
};

export default Memories;