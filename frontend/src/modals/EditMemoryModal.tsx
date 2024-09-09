import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Memory, updateMemory } from '../store/memory';
import { showToast } from '../utils/toast';

interface EditMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: Memory | null;
}

const EditMemoryModal: React.FC<EditMemoryModalProps> = ({ isOpen, onClose, memory }) => {
  const dispatch = useDispatch();
  const [editedMemory, setEditedMemory] = useState<Memory | null>(null);

  useEffect(() => {
    setEditedMemory(memory);
  }, [memory]);

  const handleUpdateMemory = () => {
    if (editedMemory && (!editedMemory.title.trim() || !editedMemory.content.trim())) {
      showToast('Title or content cannot be empty.', 'error');
      return;
    }

    if (editedMemory && editedMemory.title.length > 150) {
      showToast('Title must be less than 50 characters.', 'error');
      return;
    }

    if (editedMemory) {
      dispatch(updateMemory(editedMemory));
      onClose();
      showToast('Memory updated successfully.', 'success');
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
          <Input
            placeholder="Title"
            value={editedMemory.title}
            onChange={(e) => setEditedMemory({ ...editedMemory, title: e.target.value })}
          />
          <Textarea
            placeholder="Content"
            value={editedMemory.content}
            onChange={(e) => setEditedMemory({ ...editedMemory, content: e.target.value })}
            className="min-h-[300px]"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdateMemory}>Update Memory</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemoryModal;