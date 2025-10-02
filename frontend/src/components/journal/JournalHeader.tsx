import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface JournalHeaderProps {
  onNewEntry: () => void;
}

export function JournalHeader({ onNewEntry }: JournalHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="mb-2 text-slate-800">My Journal</h1>
      <p className="text-slate-600 mb-6">
        Track your daily mood, stress, energy, and reflections
      </p>
      <Button 
        onClick={onNewEntry}
        className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg rounded-full px-6 py-3 transition-all duration-200"
      >
        <Plus className="w-4 h-4 mr-2" />
        New Entry
      </Button>
    </div>
  );
}