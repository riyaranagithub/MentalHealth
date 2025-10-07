import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Card, CardContent } from "../ui/card";
import { ArrowLeft, Calendar, Heart, Brain, Zap, Moon, Lightbulb, Sparkles, Activity } from "lucide-react";
import { JournalEntry } from "@/stores/journal-store";

interface NewJournalEntryFormProps {
  onBack: () => void;
  onSave: (entry: Omit<JournalEntry, '_id'|'user'|'date'>) => void;
  existingEntry?: Omit<JournalEntry, '_id'|'user'|'date'> | null;
}


const sleepQualityOptions = ["poor", "average", "good", "excellent"] as const;

const moodOptions = [
  { value: "happy", emoji: "😊", text: "Happy" },
  { value: "sad", emoji: "😢", text: "Sad" },
  { value: "anxious", emoji: "😟", text: "Anxious" },
  { value: "angry", emoji: "😠", text: "Angry" },
  { value: "calm", emoji: "😌", text: "Calm" },
  { value: "neutral", emoji: "😐", text: "Neutral" },
  { value: "excited", emoji: "🤩", text: "Excited" },
];

const copingActivitiesOptions = [
  "Meditation", "Exercise", "Reading", "Talking to a friend", 
  "Music", "Walking", "Breathing exercises", "Journaling", 
  "Art/Creative work", "Nature time", "Yoga", "Sleep"
];

export function NewJournalEntryForm({ onBack,onSave,existingEntry}: NewJournalEntryFormProps) {

  
console.log("existing entry ",existingEntry);
 const [formData, setFormData] = useState({
    mood: existingEntry?.mood || "",
    moodEmoji:existingEntry?.moodEmoji||"",
    stressLevel: [existingEntry?.stressLevel || 5],
    energyLevel: [existingEntry?.energyLevel || 5],
    sleepQuality: existingEntry?.sleepQuality || "",
    triggers: existingEntry?.triggers || "",
    gratitude: existingEntry?.gratitude || "",
    copingActivities: existingEntry?.copingActivities || [],
    reflection: existingEntry?.reflection || ""
  });

  // Get today's date
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  const handleCopingActivityToggle = (activity: string) => {
    setFormData(prev => ({
      ...prev,
      copingActivities: prev.copingActivities.includes(activity)
        ? prev.copingActivities.filter(a => a !== activity)
        : [...prev.copingActivities, activity]
    }));
  };

   const [errors, setErrors] = useState({
    mood: "",
    sleepQuality: "",
    gratitude: "",
    reflection: "",
  });

  const validate = () => {
    const newErrors = {
      mood: formData.mood ? "" : "Please select your mood.",
      sleepQuality: formData.sleepQuality ? "" : "Please select your sleep quality.",
      gratitude: formData.gratitude.trim() ? "" : "Please write something you’re grateful for.",
      reflection: formData.reflection.trim() ? "" : "Please write your reflection.",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const selectedMood =formData.mood;
    if (!selectedMood) return;

    // Extract the mood key from the selected mood value
    const moodKey = selectedMood?.toLowerCase() as
      | "happy"
      | "sad"
      | "anxious"
      | "angry"
      | "calm"
      | "neutral"
      | "excited";

    const newEntry: Omit<JournalEntry, '_id' | 'user' |'date'> = {
  
      mood: moodKey,
      moodEmoji:formData.moodEmoji,
      stressLevel: formData.stressLevel[0],
      energyLevel: formData.energyLevel[0],
      sleepQuality: formData.sleepQuality as any,
      gratitude: formData.gratitude,
      copingActivities: formData.copingActivities,
      reflection: formData.reflection,
      triggers: formData.triggers,

    };


   console.log("updating or saving....")
    onSave(newEntry);
   
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 hover:bg-blue-100 hover:text-blue-600 rounded-full px-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Button>
          
          <div className="text-center">
            <h1 className="mb-2 text-slate-800">New Journal Entry</h1>
            <p className="text-slate-600 mb-6">
              Record your mood, stress, energy, and reflections
            </p>
          </div>
        </div>

        <form  className="space-y-6" onSubmit={handleSubmit}>
          {/* Date Section */}
          <Card className="bg-white border-0 shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 text-slate-600" />
                <div>
                  <Label className="text-slate-600 text-sm">Date</Label>
                  <p className="text-slate-800">{today}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mood Section */}
          <Card className="bg-white border-0 shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <Label className="text-purple-800">How are you feeling today?</Label>
                </div>
                <Select value={formData.mood} onValueChange={(value) => setFormData(prev => ({ ...prev, mood: value }))}>
                  <SelectTrigger className="bg-white border-purple-200 rounded-xl">
                    <SelectValue placeholder="Select your mood..." />
                  </SelectTrigger>
                  <SelectContent>
                    {moodOptions.map((mood) => (
                      <SelectItem key={mood.value} value={mood.value}>
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{mood.emoji}</span>
                          <span>{mood.text}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 {errors.mood && <p className="text-red-500 text-sm mt-1">{errors.mood}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Stress & Energy Levels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stress Level */}
            <Card className="bg-white border-0 shadow-md rounded-2xl">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5 text-red-600" />
                    <Label className="text-red-800">Stress Level</Label>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-red-700 text-sm">Low</span>
                      <span className="text-red-800 text-xl">{formData.stressLevel[0]}/10</span>
                      <span className="text-red-700 text-sm">High</span>
                    </div>
                    <Slider
                      value={formData.stressLevel}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, stressLevel: value }))}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                   </div>
              </CardContent>
            </Card>

            {/* Energy Level */}
            <Card className="bg-white border-0 shadow-md rounded-2xl">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-green-600" />
                    <Label className="text-green-800">Energy Level</Label>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-green-700 text-sm">Low</span>
                      <span className="text-green-800 text-xl">{formData.energyLevel[0]}/10</span>
                      <span className="text-green-700 text-sm">High</span>
                    </div>
                    <Slider
                      value={formData.energyLevel}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, energyLevel: value }))}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                     </div>
              </CardContent>
            </Card>
          </div>

          {/* Sleep Quality */}
          <Card className="bg-white border-0 shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Moon className="w-5 h-5 text-blue-600" />
                  <Label className="text-blue-800">How was your sleep last night?</Label>
                </div>
                <Select value={formData.sleepQuality} onValueChange={(value) => setFormData(prev => ({ ...prev, sleepQuality: value }))}>
                  <SelectTrigger className="bg-white border-blue-200 rounded-xl">
                    <SelectValue placeholder="Select sleep quality..." />
                  </SelectTrigger>
                  <SelectContent>
                    {sleepQualityOptions.map((quality) => (
                      <SelectItem key={quality} value={quality}>
                        {quality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 {errors.sleepQuality && <p className="text-red-500 text-sm mt-1">{errors.sleepQuality}</p>}
               
              </div>
            </CardContent>
          </Card>

          {/* Triggers */}
          <Card className="bg-white border-0 shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                  <Label className="text-orange-800">Triggers</Label>
                </div>
                <Input
                  value={formData.triggers}
                  onChange={(e) => setFormData(prev => ({ ...prev, triggers: e.target.value }))}
                  placeholder="What triggered your mood today?"
                  className="bg-white border-orange-200 rounded-xl"
                />
              </div>
               
            </CardContent>
          </Card>

          {/* Gratitude */}
          <Card className="bg-white border-0 shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                  <Label className="text-yellow-800">Gratitude</Label>
                </div>
                <Input
                  value={formData.gratitude}
                  onChange={(e) => setFormData(prev => ({ ...prev, gratitude: e.target.value }))}
                  placeholder="Something you're grateful for today..."
                  className="bg-white border-yellow-200 rounded-xl"
                />
              </div>
               {errors.gratitude && <p className="text-red-500 text-sm mt-1">{errors.gratitude}</p>}
               
            </CardContent>
          </Card>

          {/* Coping Activities */}
          <Card className="bg-white border-0 shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-cyan-600" />
                  <Label className="text-cyan-800">Coping Activities</Label>
                  <span className="text-cyan-600 text-sm">(Select all that apply)</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {copingActivitiesOptions.map((activity) => (
                    <Button
                      key={activity}
                      type="button"
                      variant={formData.copingActivities.includes(activity) ? "default" : "outline"}
                      onClick={() => handleCopingActivityToggle(activity)}
                      className={`rounded-full text-sm h-10 ${
                        formData.copingActivities.includes(activity)
                          ? "bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500"
                          : "border-cyan-200 text-cyan-700 hover:bg-cyan-50"
                      }`}
                    >
                      {activity}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reflection */}
          <Card className="bg-white border-0 shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4">
                <Label className="text-slate-800 block mb-4">Reflection</Label>
                <Textarea
                  value={formData.reflection}
                  onChange={(e) => setFormData(prev => ({ ...prev, reflection: e.target.value }))}
                  placeholder="Write your thoughts and reflections about today... How are you feeling? What went well? What was challenging? What did you learn about yourself?"
                  className="bg-white border-slate-200 rounded-xl min-h-32 resize-none"
                  rows={6}
                />
              </div>
               {errors.reflection && <p className="text-red-500 text-sm mt-1">{errors.reflection}</p>}
               
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg rounded-xl"
            >
             {existingEntry ? "Update Entry" : "Save Entry"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}