import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CompleteTaskModalProps {
  showCompleteTaskModal: boolean;
  setShowCompleteTaskModal: (show: boolean) => void;
  updateTaskAndClose: (status?: "Completed" | "Not Started") => void;
}

const CompleteTaskModal: React.FC<CompleteTaskModalProps> = ({
  showCompleteTaskModal,
  setShowCompleteTaskModal,
  updateTaskAndClose,
}) => {
  return (
    <>
      <AlertDialog
        open={showCompleteTaskModal}
        onOpenChange={setShowCompleteTaskModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Task?</AlertDialogTitle>
            <AlertDialogDescription>
              All subtasks are completed. Do you want to mark the main task as
              completed as well?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setShowCompleteTaskModal(false);
                updateTaskAndClose();
              }}
            >
              No, keep current status
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowCompleteTaskModal(false);
                updateTaskAndClose("Completed");
              }}
            >
              Yes, complete task
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CompleteTaskModal;
