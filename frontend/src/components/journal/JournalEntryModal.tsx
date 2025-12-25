import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Edit, Trash2, Calendar, Heart, Brain, Zap, Moon } from "lucide-react";
import { type JournalEntry } from "@/stores/journal-store";
import { format } from "date-fns"
import JournalDelete from "./JournalDelete";

interface JournalEntryModalProps {
  entry: JournalEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export function JournalEntryModal({ entry, isOpen, onClose, onEdit }: JournalEntryModalProps) {
  if (!entry) return null;

  const getSleepQualityColor = (quality: string) => {
    switch (quality) {
      case "Poor": return "bg-red-100 text-red-700 border-red-200";
      case "Average": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Good": return "bg-green-100 text-green-700 border-green-200";
      case "Excellent": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-slate-600" />
              <DialogTitle className="text-slate-800">{format(entry.date,"MMMM d, yyyy h:mm a")}</DialogTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Entry
              </Button>
              <JournalDelete idToDelete={entry._id} onClose={onClose}/>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-6">
          {/* Mood Section */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-purple-600" />
              <h3 className="text-purple-800">Mood</h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl">{entry.moodEmoji}</span>
              <span className="text-xl text-purple-700">{entry.mood}</span>
            </div>
          </div>

          {/* Stress & Energy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stress Level */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-red-600" />
                <h3 className="text-red-800">Stress Level</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-red-700">Current Level</span>
                  <span className="text-2xl text-red-800">{entry.stressLevel}/10</span>
                </div>
                <Progress 
                  value={entry.stressLevel * 10} 
                  className="h-3 bg-red-100"
                />
              </div>
            </div>

            {/* Energy Level */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-green-600" />
                <h3 className="text-green-800">Energy Level</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Current Level</span>
                  <span className="text-2xl text-green-800">{entry.energyLevel}/10</span>
                </div>
                <Progress 
                  value={entry.energyLevel * 10} 
                  className="h-3 bg-green-100"
                />
              </div>
            </div>
          </div>

          {/* Sleep Quality */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Moon className="w-5 h-5 text-blue-600" />
              <h3 className="text-blue-800">Sleep Quality</h3>
            </div>
            <Badge className={`${getSleepQualityColor(entry.sleepQuality)} border rounded-full px-4 py-2 text-base`}>
              {entry.sleepQuality}
            </Badge>
          </div>

          {/* Gratitude */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
            <h3 className="text-orange-800 mb-3">Gratitude</h3>
            <p className="text-orange-700 italic text-lg leading-relaxed">
              "{entry.gratitude}"
            </p>
          </div>

          {/* Coping Activities */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4">
            <h3 className="text-cyan-800 mb-3">Coping Activities</h3>
            <div className="flex flex-wrap gap-3">
              {entry.copingActivities?.map((activity, index) => (
                <Badge 
                  key={index} 
                  className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 border-cyan-200 rounded-full px-4 py-2 text-base"
                >
                  {activity}
                </Badge>
              ))}
            </div>
          </div>

          {/* Reflection */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4">
            <h3 className="text-slate-800 mb-3">Reflection</h3>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {entry.reflection}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}