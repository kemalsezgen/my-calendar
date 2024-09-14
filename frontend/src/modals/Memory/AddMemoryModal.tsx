import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addMemory } from "../../store/memory";
import { showToast } from "../../utils/toast";
import { Calendar } from "@/components/ui/calendar";
import { format, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  date?: Date;
  showDatePicker: boolean;
}

const AddMemoryModal: React.FC<AddMemoryModalProps> = ({
  isOpen,
  onClose,
  showDatePicker,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memoryDate, setMemoryDate] = useState<Date>();

  const handleAddMemory = () => {
    if (!title.trim() || !content.trim()) {
      showToast("Title and content are required.", "error");
      return;
    }

    if (title.length > 150) {
      showToast("Title must be less than 150 characters.", "error");
      return;
    }

    const newMemory = {
      id: Date.now(),
      title,
      content,
      date: memoryDate ? format(startOfDay(memoryDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
    };

    dispatch(addMemory(newMemory));
    onClose();
    setTitle("");
    setContent("");
    showToast("Memory added successfully.", "success");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] sm:w-[90vw]">
        <DialogHeader>
          <DialogTitle>Add New Memory</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px]"
          />
          {showDatePicker && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !memoryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {memoryDate ? (
                      format(memoryDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={memoryDate}
                    onSelect={setMemoryDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAddMemory}>Add Memory</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemoryModal;
