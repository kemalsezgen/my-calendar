import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addMemory } from '../store/memory';
import { showToast } from '../utils/toast';

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
}

const AddMemoryModal: React.FC<AddMemoryModalProps> = ({ isOpen, onClose, date }) => {
  const dispatch = useDispatch();
  const [newMemory, setNewMemory] = useState({ title: '', content: '' });

  const handleAddMemory = () => {
    if (!newMemory.title.trim() || !newMemory.content.trim()) {
      showToast('Title or content cannot be empty', 'error');
      return;
    }

    const memory = {
      id: Date.now(),
      ...newMemory,
      date: date.toLocaleDateString('en-CA'),
    };
    dispatch(addMemory(memory));
    onClose();
    setNewMemory({ title: '', content: '' });
    showToast('Memory added successfully.', 'success');
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
            value={newMemory.title}
            onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
          />
          <Textarea
            placeholder="Content"
            value={newMemory.content}
            onChange={(e) => setNewMemory({ ...newMemory, content: e.target.value })}
            className="min-h-[200px]"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAddMemory}>Save Memory</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemoryModal;