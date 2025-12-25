'use client'

import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useChatStore } from "@/providers/chat-store-provider";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I'm MindMate, your personal mental wellness companion. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);

  const { sendMessage, reply, loading, error } = useChatStore((state) => state);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Add user's message immediately
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        text: message,
        timestamp: new Date(),
      },
    ]);

    await sendMessage(message, messages);
    setMessage("");
  };

  // 👇 Whenever reply updates, append it as a bot message
  useEffect(() => {
    if (reply) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "bot",
          text: reply,
          timestamp: new Date(),
        },
      ]);
    }
  }, [reply]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 w-96 h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)" }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #D7F3F6 0%, #EAE4FF 100%)" }}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarFallback className="bg-white">
                    <Heart className="h-5 w-5 text-[#9B87F5] fill-[#9B87F5]" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-gray-800">MindMate</h3>
                  <p className="text-xs text-gray-600">Always here for you</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#F8FCFD] to-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-[#D7F3F6] to-[#EAE4FF]">
                        <Heart className="h-4 w-4 text-[#9B87F5] fill-[#9B87F5]" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-[#EAE4FF] to-[#D7F3F6] text-gray-800 rounded-br-sm"
                        : "bg-white text-gray-700 shadow-md rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </motion.div>
                </div>
              ))}

              {loading && (
                <p className="text-gray-400 text-sm italic">MindMate is thinking...</p>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Share what's on your mind..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="flex-1 rounded-full px-4 py-2 border-gray-200 focus:border-[#D7F3F6] focus:ring-[#D7F3F6] bg-gray-50"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  disabled={loading}
                  className="rounded-full h-10 w-10 bg-gradient-to-br from-[#D7F3F6] to-[#EAE4FF] hover:from-[#C1E9ED] hover:to-[#D5CCFF] text-gray-700 shadow-md"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full bg-gradient-to-br from-[#D7F3F6] to-[#EAE4FF] shadow-2xl flex items-center justify-center text-gray-800 hover:shadow-xl transition-shadow"
        style={{ boxShadow: "0 10px 30px rgba(155, 135, 245, 0.3)" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
