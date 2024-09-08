import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchMemories, Memory, removeMemory } from "../store/memory";
import { RootState } from "../store";
import { Pencil, Trash2 } from "lucide-react";
import AddMemoryModal from "./AddMemoryModal";
import EditMemoryModal from "./EditMemoryModal";
import { showToast } from '../utils/toast';

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
  const memories = useSelector((state: RootState) => state.memory.memories);
  const [isAddMemoryModalOpen, setIsAddMemoryModalOpen] = useState(false);
  const [isEditMemoryModalOpen, setIsEditMemoryModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  useEffect(() => {
    const formattedDate = date.toLocaleDateString('en-CA');
    console.log(formattedDate);
    dispatch(fetchMemories(formattedDate) as any);
  }, [dispatch, date]);


  useEffect(() => {
    console.log('Memories:', memories);
  }, [memories]);

  const handleDeleteMemory = (id: number) => {
    dispatch(removeMemory(id));
    showToast("Memory deleted successfully", "success");
  };

  const handleEditMemory = (memory: Memory) => {
    setSelectedMemory(memory);
    setIsEditMemoryModalOpen(true);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    const formattedDate = new Intl.DateTimeFormat(
      "en-US",
      options
    ).formatToParts(date);
    const dateObj = Object.fromEntries(
      formattedDate.map(({ type, value }) => [type, value])
    );
    return `${dateObj.month} ${dateObj.day}, ${dateObj.year} - ${dateObj.weekday}`;
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col p-0">
          <div className="bg-gray-100 p-4 text-xl font-semibold">
            {formatDate(date)}
          </div>
          <div className="flex flex-1 p-4 overflow-hidden">
            <div className="w-1/2 pr-4 border-r flex flex-col h-full">
              {memories.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold mb-4">Memories</h2>
                  <div className="flex-1 overflow-y-auto pr-2">
                    {memories.map((memory: Memory) => (
                      <div
                        key={memory.id}
                        className="mb-4 p-4 bg-gray-100 rounded-lg"
                      >
                        <h3 className="text-lg font-bold">{memory.title}</h3>
                        <p
                          className="text-gray-600 mt-2 break-words overflow-hidden text-ellipsis"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {memory.content}
                        </p>
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
            <div className="w-1/2 pl-4">
              {/* Right side content will be added later */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <AddMemoryModal
        isOpen={isAddMemoryModalOpen}
        onClose={() => setIsAddMemoryModalOpen(false)}
        date={date}
      />
      <EditMemoryModal
        isOpen={isEditMemoryModalOpen}
        onClose={() => setIsEditMemoryModalOpen(false)}
        memory={selectedMemory}
      />
    </>
  );
};

export default DayDetailModal;
