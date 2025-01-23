import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type { Message } from "../../types";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for typing animation

  const handleSendMessage = async (userMessage: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userMessage,
      isBot: false,
    };
    setMessages((prev) => [...prev, userMsg]);

    // Activate loading state
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMessage,
          history: messages.map((msg) => ({
            role: msg.isBot ? "assistant" : "user",
            content: msg.text,
          })),
        }),
      });

      const data = await response.json();
      const botMsg: Message = {
        id: Date.now().toString() + "-bot",
        text: data.response || "Sorry, I couldn’t retrieve the answer.",
        isBot: true,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-error",
          text: "Error fetching response. Please try again.",
          isBot: true,
        },
      ]);
    } finally {
      // Deactivate loading state
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-500 text-white shadow-lg hover:bg-teal-600 flex items-center justify-center transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 w-[95%] max-w-[400px] h-[70%] max-h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden"
          >
            <div className="p-3 border-b bg-teal-500 text-white">
              <h3 className="font-semibold">Sentilytics Chat</h3>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {/* Typing Animation */}
              {isLoading && (
                <div className="flex items-center justify-start">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <ChatInput onSend={handleSendMessage} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
