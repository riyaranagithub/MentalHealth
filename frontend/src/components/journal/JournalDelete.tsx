'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useJournalStoreContext } from "@/providers/journal-store-provider"
import { toast } from "sonner"

// ✅ Define proper prop types
interface JournalDeleteProps {
  idToDelete: string;
  onClose: () => void;
}

export default function JournalDelete({ idToDelete, onClose }: JournalDeleteProps) {
  const [open, setOpen] = useState(false)
  const deleteJournal = useJournalStoreContext((state) => state.deleteJournal)

  const handleDelete = async () => {
    try {
      const response = await deleteJournal(idToDelete)
      if (response) {
        toast.success("Journal deleted successfully 🗑️")
        onClose()
      } else {
        toast.error("Failed to delete journal entry.")
      }
    } catch {
      toast.error("Something went wrong while deleting.")
    } finally {
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this journal entry?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

