import React, { useState, useEffect } from 'react';
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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [memoryDate, setMemoryDate] = useState('');

  useEffect(() => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      setMemoryDate(formattedDate);
    }
  }, [date]);

  const handleAddMemory = () => {
    if (!title.trim() || !content.trim()) {
      showToast('Title and content are required.', 'error');
      return;
    }

    if (title.length > 150) {
      showToast('Title must be less than 150 characters.', 'error');
      return;
    }

    const newMemory = {
      id: Date.now(),
      title,
      content,
      date: memoryDate,
    };

    dispatch(addMemory(newMemory));
    onClose();
    setTitle('');
    setContent('');
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px]"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAddMemory}>Add Memory</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddMemoryModal;