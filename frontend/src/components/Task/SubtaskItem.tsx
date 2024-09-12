// src/components/Task/SubtaskItem.tsx
import React from "react";
import { Subtask } from "@/types/Subtask";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

interface SubtaskItemProps {
  subtask: Subtask;
  onUpdate: (subtask: Subtask) => void;
  onRemove: (id: number) => void;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({
  subtask,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="flex gap-2 items-center justify-between mb-2">
      <div className="w-[50%]">
        <Input
          value={subtask.title}
          onChange={(e) => onUpdate({ ...subtask, title: e.target.value })}
          placeholder="Subtask title"
        />
      </div>
      <div className="flex-1">
        <Select
          value={subtask.status}
          onValueChange={(value: "Not Started" | "In Progress" | "Completed") =>
            onUpdate({ ...subtask, status: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Not Started">Not Started</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onRemove(subtask.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SubtaskItem;
