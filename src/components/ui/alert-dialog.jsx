import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AlertDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this task? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter className="justify-between">
          <div className=" flex justify-between">
            <Button variant="destructive" onClick={onConfirm}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
