'use client'
import { useEffect, useState } from "react";
import { JournalHeader } from "@/components/journal/JournalHeader";
import { JournalEntry } from "@/components/journal/JournalEntry";
import { JournalEntryModal } from "@/components/journal/JournalEntryModal";
import { NewJournalEntryForm } from "@/components/journal/NewJournalEntryForm";
import { useJournalStoreContext } from "@/providers/journal-store-provider";
import { type JournalEntry as JournalEntryType } from "@/stores/journal-store";
import { toast } from "sonner";

export default function App() {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntryType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Omit<JournalEntryType, 'user' | 'date'> | null>(null)


  const fetchJournals = useJournalStoreContext((state) => state.fetchJournals);
  const createJournal = useJournalStoreContext((state) => state.createJournal);
  const updateJournal = useJournalStoreContext((state) => state.updateJournal);
  const deleteJournal = useJournalStoreContext((state)=> state.deleteJournal);

  const journals = useJournalStoreContext((state) => state.journals);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const handleNewEntry = () => {
    setShowNewEntryForm(true);
  };


const handleSaveNewEntry = async (newEntry: Omit<JournalEntryType, '_id' | 'user' | 'date'>) => {
  try {
    let response;

    if (editingEntry) {
      response = await updateJournal(editingEntry._id, newEntry);
      if (response) {
        console.log("Reached toast trigger:", response);
        toast.success("Journal updated successfully ✨");
      } else {
        toast.error("Error occurred while updating. Try again!");
      }
    } else {
      response = await createJournal(newEntry);
      if (response) {
        toast.success("Journal created successfully 🎉");
      } else {
        toast.error("Error occurred while creating. Try again!");
      }
    }

    // Reset form only if operation succeeded
    if (response) {
      setEditingEntry(null);
      setShowNewEntryForm(false);
    }
  } catch (error) {
    console.error("Error in handleSaveNewEntry:", error);
    toast.error("Something went wrong. Please try again!");
  }
};

  const handleBackToJournal = () => {
    setEditingEntry(null);
    setShowNewEntryForm(false);
  };

  const handleEntryClick = (entry: JournalEntryType) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleEdit = (_id: string, entry: JournalEntryType) => {
    console.log("handle edit clicked...");
    setEditingEntry(entry);
    setShowNewEntryForm(true);
    setIsModalOpen(false);
  };

 const handleDelete = async (entry?: JournalEntryType) => {
  const idToDelete = entry?._id || selectedEntry?._id;

  if (!idToDelete) {
    toast.error("No journal entry selected for deletion.");
    return;
  }

  const confirmDelete = window.confirm("Are you sure you want to delete this journal entry?");
  if (!confirmDelete) {
    return; // user cancelled
  }

  console.log("Deleting entry:", idToDelete);

  const response = await deleteJournal(idToDelete);
  if (response) {
    toast.success("Journal deleted successfully.");
    setIsModalOpen(false);
  } else {
    toast.error("Failed to delete journal entry.");
  }
};


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  if (showNewEntryForm) {
    return (
      <NewJournalEntryForm
        onBack={handleBackToJournal}
        onSave={handleSaveNewEntry}
        existingEntry={editingEntry }
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <JournalHeader onNewEntry={handleNewEntry} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {journals.map((entry) => (
            <JournalEntry
              key={entry._id}
              entry={entry}
              onClick={() => handleEntryClick(entry)}
              onEdit={() => handleEdit(entry._id, entry)}
              onDelete={() => handleDelete(entry)}
            />
          ))}
        </div>

        <JournalEntryModal
          entry={selectedEntry}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onEdit={() => selectedEntry && handleEdit(selectedEntry._id, selectedEntry)}
          onDelete={() => handleDelete()}
        />
      </div>
    </div>
  );
}