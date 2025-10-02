'use client'
import { useEffect, useState } from "react";
import { JournalHeader } from "@/components/journal/JournalHeader";
import { JournalEntry } from "@/components/journal/JournalEntry";
import { JournalEntryModal } from "@/components/journal/JournalEntryModal";
import { NewJournalEntryForm } from "@/components/journal/NewJournalEntryForm";
import { useJournalStoreContext } from "@/providers/journal-store-provider";
import { type JournalEntry as JournalEntryType } from "@/stores/journal-store";

export default function App() {
   const [selectedEntry, setSelectedEntry] = useState<JournalEntryType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);

  const fetchJournals = useJournalStoreContext((state) => state.fetchJournals);
  const journals = useJournalStoreContext((state) => state.journals);
console.log("Journals from store:", journals);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const handleNewEntry = () => {
    setShowNewEntryForm(true);
  };

  // const handleSaveNewEntry = (newEntry: Omit<JournalEntryType, 'id'>) => {
  //   const entryWithId: JournalEntryType = {
  //     ...newEntry,
  //     _id: Date.now().toString()
  //   };
  //   // setEntries(prev => [entryWithId, ...prev]);
  //   setShowNewEntryForm(false);
  // };

  const handleBackToJournal = () => {
    setShowNewEntryForm(false);
  };

  const handleEntryClick = (entry: JournalEntryType) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleEdit = (entry?: JournalEntryType) => {
    // Placeholder for edit functionality
    console.log("Editing entry:", entry?._id || selectedEntry?._id);
  };

  const handleDelete = (entry?: JournalEntryType) => {
    // Placeholder for delete functionality
    console.log("Deleting entry:", entry?._id || selectedEntry?._id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  if (showNewEntryForm) {
    return (
      <NewJournalEntryForm
        onBack={handleBackToJournal}
        // onSave={handleSaveNewEntry}
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
              onEdit={() => handleEdit(entry)}
              onDelete={() => handleDelete(entry)}
            />
          ))}
        </div>

        <JournalEntryModal
          entry={selectedEntry}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onEdit={() => handleEdit()}
          onDelete={() => handleDelete()}
        />
      </div>
    </div>
  );
}