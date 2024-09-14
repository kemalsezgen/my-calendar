import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Memory } from "@/types/Memory";
import { updateMemory } from "@/store/memory";
import { showToast } from "@/utils/toast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface EditMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: Memory | null;
}

const EditMemoryModal: React.FC<EditMemoryModalProps> = ({
  isOpen,
  onClose,
  memory,
}) => {
  const dispatch = useDispatch();
  const [editedMemory, setEditedMemory] = useState<Memory | null>(null);

  useEffect(() => {
    setEditedMemory(memory);
  }, [memory]);

  const handleUpdateMemory = () => {
    if (
      editedMemory &&
      (!editedMemory.title.trim() || !editedMemory.content.trim())
    ) {
      showToast("Title or content cannot be empty.", "error");
      return;
    }

    if (editedMemory && editedMemory.title.length > 150) {
      showToast("Title must be less than 150 characters.", "error");
      return;
    }

    if (editedMemory) {
      dispatch(updateMemory(editedMemory));
      onClose();
      showToast("Memory updated successfully.", "success");
    }
  };

  if (!editedMemory) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] sm:w-[90vw]">
        <DialogHeader>
          <DialogTitle>Edit Memory</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <Input
              placeholder="Title"
              value={editedMemory.title}
              onChange={(e) =>
                setEditedMemory({ ...editedMemory, title: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <Textarea
              placeholder="Content"
              value={editedMemory.content}
              onChange={(e) =>
                setEditedMemory({ ...editedMemory, content: e.target.value })
              }
              className="min-h-[300px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !editedMemory.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {editedMemory.date ? (
                    format(editedMemory.date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={editedMemory.date ? new Date(editedMemory.date) : undefined}
                  onSelect={(date) => setEditedMemory({ ...editedMemory, date: date ? format(date, "yyyy-MM-dd") : '' })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emotion
            </label>
            <Select
              value={editedMemory.emoji}
              onValueChange={(emoji) =>
                setEditedMemory({ ...editedMemory, emoji })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an emotion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="😊">😊</SelectItem>
                <SelectItem value="😢">😢</SelectItem>
                <SelectItem value="😡">😡</SelectItem>
                <SelectItem value="😃">😃</SelectItem>
                <SelectItem value="😟">😟</SelectItem>
                <SelectItem value="😌">😌</SelectItem>
                <SelectItem value="😩">😩</SelectItem>
                <SelectItem value="😍">😍</SelectItem>
                <SelectItem value="😔">😔</SelectItem>
                <SelectItem value="😭">😭</SelectItem>
                <SelectItem value="🌞">🌞</SelectItem>
                <SelectItem value="🌧️">🌧️</SelectItem>
                <SelectItem value="🌈">🌈</SelectItem>
                <SelectItem value="🌻">🌻</SelectItem>
                <SelectItem value="❄️">❄️</SelectItem>
                <SelectItem value="🏃">🏃</SelectItem>
                <SelectItem value="🎨">🎨</SelectItem>
                <SelectItem value="📚">📚</SelectItem>
                <SelectItem value="🍽️">🍽️</SelectItem>
                <SelectItem value="🎮">🎮</SelectItem>
                <SelectItem value="✈️">✈️</SelectItem>
                <SelectItem value="🎉">🎉</SelectItem>
                <SelectItem value="🎂">🎂</SelectItem>
                <SelectItem value="💍">💍</SelectItem>
                <SelectItem value="👶">👶</SelectItem>
                <SelectItem value="💌">💌</SelectItem>
                <SelectItem value="💻">💻</SelectItem>
                <SelectItem value="📝">📝</SelectItem>
                <SelectItem value="📊">📊</SelectItem>
                <SelectItem value="🎓">🎓</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateMemory}>Update Memory</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemoryModal;
