import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Edit, Trash2, Calendar } from "lucide-react";
import {type JournalEntry } from "@/stores/journal-store";
import { format } from "date-fns"

interface JournalEntryProps {
  entry: JournalEntry;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}


export function JournalEntry({ entry, onClick, onEdit, onDelete }: JournalEntryProps) {
  const getSleepQualityColor = (quality: string) => {
    switch (quality) {
      case "Poor": return "bg-red-100 text-red-700 border-red-200";
      case "Average": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Good": return "bg-green-100 text-green-700 border-green-200";
      case "Excellent": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group cursor-pointer">
      <CardContent className="p-6" onClick={onClick}>
        {/* Date Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{format(entry.date,"MMMM d, yyyy h:mm a")}</span>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600 rounded-full"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mood */}
        <div className="mb-4">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
            <span className="text-2xl">{entry.moodEmoji}</span>
            <span className="text-purple-700">{entry.mood}</span>
          </div>
        </div>

        {/* Stress & Energy Levels */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Stress</span>
              <span className="text-sm text-slate-800">{entry.stressLevel}/10</span>
            </div>
            <Progress 
              value={entry.stressLevel * 10} 
              className="h-2 bg-red-100"
              style={{
                background: 'rgb(254 226 226)'
              }}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Energy</span>
              <span className="text-sm text-slate-800">{entry.energyLevel}/10</span>
            </div>
            <Progress 
              value={entry.energyLevel * 10} 
              className="h-2 bg-green-100"
              style={{
                background: 'rgb(220 252 231)'
              }}
            />
          </div>
        </div>

        {/* Sleep Quality */}
        <div className="mb-4">
          <span className="text-sm text-slate-600 mr-2">Sleep:</span>
          <Badge className={`${getSleepQualityColor(entry.sleepQuality)} border rounded-full px-3 py-1`}>
            {entry.sleepQuality}
          </Badge>
        </div>

        {/* Gratitude */}
        <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
          <span className="text-sm text-slate-600 block mb-1">Gratitude</span>
          <p className="text-sm text-orange-700 italic">"{entry.gratitude}"</p>
        </div>

        {/* Coping Activities */}
        <div className="mb-4">
          <span className="text-sm text-slate-600 block mb-2">Coping Activities</span>
          <div className="flex flex-wrap gap-2">
            {entry.copingActivities?.map((activity, index) => (
              <Badge 
                key={index} 
                className="bg-gradient-to-r from-mint-100 to-green-100 text-green-700 border-green-200 rounded-full px-3 py-1"
                style={{
                  background: 'linear-gradient(to right, rgb(220 252 231), rgb(187 247 208))',
                  color: 'rgb(21 128 61)',
                  border: '1px solid rgb(187 247 208)'
                }}
              >
                {activity}
              </Badge>
            ))}
          </div>
        </div>

        {/* Reflection */}
        <div>
          <span className="text-sm text-slate-600 block mb-2">Reflection</span>
          <p className="text-sm text-slate-700 leading-relaxed">
            {truncateText(entry.reflection ?? "")}
            {entry.reflection && entry.reflection.length > 120 && (
              <span className="text-blue-600 ml-2 hover:underline cursor-pointer">
                Read More
              </span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}