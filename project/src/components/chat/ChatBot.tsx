// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MessageCircle, X } from "lucide-react";
// import { ChatMessage } from "./ChatMessage";
// import { ChatInput } from "./ChatInput";
// import type { Message } from "../../types";

// // List of predefined questions
// const predefinedQuestions = [
//   "What does this website do?",
//   "How do I analyze a product?",
//   "Can I download the results?",
//   "What is sentiment analysis?",
//   "Can I analyze any Amazon product?",
//   "What formats are the results available in?",
// ];

// export function ChatBot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     { id: "1", text: "Hello! How can I help you today?", isBot: true },
//   ]);

//   const [visibleAnswers, setVisibleAnswers] = useState<
//     Record<string, string | null>
//   >({});

//   const handleQuestionToggle = async (question: string) => {
//     // If the answer is already visible, toggle it off
//     if (visibleAnswers[question]) {
//       setVisibleAnswers((prev) => ({ ...prev, [question]: null }));
//       return;
//     }

//     // Fetch the answer from the backend
//     try {
//       const response = await fetch("http://127.0.0.1:5000/faq", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query: question }),
//       });

//       const data = await response.json();
//       const answer = data.response || "Sorry, I couldn’t retrieve the answer.";

//       // Show the fetched answer
//       setVisibleAnswers((prev) => ({ ...prev, [question]: answer }));
//     } catch (error) {
//       console.error("Error fetching answer:", error);
//       setVisibleAnswers((prev) => ({
//         ...prev,
//         [question]:
//           "Error: Unable to fetch the answer. Please try again later.",
//       }));
//     }
//   };

//   return (
//     <>
//       {/* Toggle Button */}
//       <motion.button
//         className="fixed bottom-4 right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-500 text-white shadow-lg hover:bg-teal-600 flex items-center justify-center transition-colors duration-300"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setIsOpen(!isOpen)}
//         aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
//       >
//         {isOpen ? (
//           <X className="w-6 h-6 transition-transform duration-300" />
//         ) : (
//           <MessageCircle className="w-6 h-6 transition-transform duration-300" />
//         )}
//       </motion.button>

//       {/* Chatbot Window */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ duration: 0.3 }}
//             className="fixed bottom-20 right-4 w-[95%] max-w-[400px] h-[70%] max-h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
//           >
//             {/* Chat Header */}
//             <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-teal-500 text-white flex items-center justify-center">
//               <h3 className="font-semibold">Sentilytics Chat</h3>
//             </div>

//             {/* Chat Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
//               {messages.map((message) => (
//                 <ChatMessage key={message.id} message={message} />
//               ))}

//               {/* Predefined Questions with Toggleable Answers */}
//               <div className="predefined-questions mt-4">
//                 <h4 className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
//                   FAQ:
//                 </h4>
//                 <ul className="space-y-2">
//                   {predefinedQuestions.map((question, index) => (
//                     <li key={index}>
//                       <button
//                         className="text-teal-500 cursor-pointer hover:underline"
//                         onClick={() => handleQuestionToggle(question)}
//                       >
//                         {question}
//                       </button>
//                       {visibleAnswers[question] && (
//                         <p className="text-gray-700 dark:text-gray-300 mt-1">
//                           {visibleAnswers[question]}
//                         </p>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Chat Input */}
//             <ChatInput
//               onSend={(message) =>
//                 setMessages((prev) => [
//                   ...prev,
//                   { id: Date.now().toString(), text: message, isBot: false },
//                 ])
//               }
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }



// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MessageCircle, X } from "lucide-react";
// import { ChatMessage } from "./ChatMessage";
// import { ChatInput } from "./ChatInput";
// import type { Message } from "../../types";

// export function ChatBot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     { id: "1", text: "Hello! How can I help you today?", isBot: true },
//   ]);

//   const handleSendMessage = async (userMessage: string) => {
//     const userMsg: Message = {
//       id: Date.now().toString(),
//       text: userMessage,
//       isBot: false,
//     };
//     setMessages((prev) => [...prev, userMsg]);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/faq", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query: userMessage }),
//       });

//       const data = await response.json();
//       const botMsg: Message = {
//         id: Date.now().toString() + "-bot",
//         text: data.response || "Sorry, I couldn’t retrieve the answer.",
//         isBot: true,
//       };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch (error) {
//       console.error("Error fetching bot response:", error);
//       const errorMsg: Message = {
//         id: Date.now().toString() + "-bot-error",
//         text: "Error: Unable to fetch the answer. Please try again later.",
//         isBot: true,
//       };
//       setMessages((prev) => [...prev, errorMsg]);
//     }
//   };

//   return (
//     <>
//       <motion.button
//         className="fixed bottom-4 right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-500 text-white shadow-lg hover:bg-teal-600 flex items-center justify-center transition-colors duration-300"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setIsOpen(!isOpen)}
//         aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
//       </motion.button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ duration: 0.3 }}
//             className="fixed bottom-20 right-4 w-[95%] max-w-[400px] h-[70%] max-h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden"
//           >
//             <div className="p-3 border-b bg-teal-500 text-white">
//               <h3 className="font-semibold">Sentilytics Chat</h3>
//             </div>

//             <div className="flex-1 p-4 space-y-4 overflow-y-auto">
//               {messages.map((message) => (
//                 <ChatMessage key={message.id} message={message} />
//               ))}
//             </div>

//             <ChatInput onSend={handleSendMessage} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }




// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MessageCircle, X } from "lucide-react";
// import { ChatMessage } from "./ChatMessage";
// import { ChatInput } from "./ChatInput";
// import type { Message } from "../../types";

// const predefinedQuestions = [
//   "What does this website do?",
//   "How do I analyze a product?",
//   "Can I download the results?",
//   "What is sentiment analysis?",
//   "Can I analyze any Amazon product?",
//   "Summarize reviews for product <ProductName>",
// ];

// export function ChatBot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     { id: "1", text: "Hello! How can I help you today?", isBot: true },
//   ]);

//   const handleSendMessage = async (userMessage: string) => {
//     const userMsg: Message = {
//       id: Date.now().toString(),
//       text: userMessage,
//       isBot: false,
//     };
//     setMessages((prev) => [...prev, userMsg]);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/faq", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query: userMessage }),
//       });

//       const data = await response.json();
//       const botMsg: Message = {
//         id: Date.now().toString() + "-bot",
//         text: data.response || "Sorry, I couldn’t retrieve the answer.",
//         isBot: true,
//       };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch (error) {
//       console.error("Error fetching bot response:", error);
//       const errorMsg: Message = {
//         id: Date.now().toString() + "-bot-error",
//         text: "Error: Unable to fetch the answer. Please try again later.",
//         isBot: true,
//       };
//       setMessages((prev) => [...prev, errorMsg]);
//     }
//   };

//   return (
//     <>
//       <motion.button
//         className="fixed bottom-4 right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-500 text-white shadow-lg hover:bg-teal-600 flex items-center justify-center transition-colors duration-300"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setIsOpen(!isOpen)}
//         aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
//       </motion.button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ duration: 0.3 }}
//             className="fixed bottom-20 right-4 w-[95%] max-w-[400px] h-[70%] max-h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden"
//           >
//             <div className="p-3 border-b bg-teal-500 text-white">
//               <h3 className="font-semibold">Sentilytics Chat</h3>
//             </div>

//             <div className="flex-1 p-4 space-y-4 overflow-y-auto">
//               {messages.map((message) => (
//                 <ChatMessage key={message.id} message={message} />
//               ))}

//               <div className="predefined-questions mt-4">
//                 <h4>FAQ:</h4>
//                 <ul>
//                   {predefinedQuestions.map((question, index) => (
//                     <li key={index}>
//                       <button onClick={() => handleSendMessage(question)}>{question}</button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <ChatInput onSend={handleSendMessage} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }




// WORKED
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MessageCircle, X } from "lucide-react";
// import { ChatMessage } from "./ChatMessage";
// import { ChatInput } from "./ChatInput";
// import type { Message } from "../../types";

// export function ChatBot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     { id: "1", text: "Hello! How can I help you today?", isBot: true },
//   ]);

//   const handleSendMessage = async (userMessage: string) => {
//     const userMsg: Message = { id: Date.now().toString(), text: userMessage, isBot: false };
//     setMessages((prev) => [...prev, userMsg]);
  
//     try {
//       const response = await fetch("http://127.0.0.1:5000/chatbot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: userMessage }),
//       });
  
//       const data = await response.json();
//       const botMsg: Message = {
//         id: Date.now().toString() + "-bot",
//         text: data.response || "Sorry, I couldn’t retrieve the answer.",
//         isBot: true,
//       };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { id: Date.now().toString() + "-error", text: "Error fetching response.", isBot: true },
//       ]);
//     }
//   };
  

//   return (
//     <>
//       <motion.button
//         className="fixed bottom-4 right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-500 text-white shadow-lg hover:bg-teal-600 flex items-center justify-center transition-colors duration-300"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setIsOpen(!isOpen)}
//         aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
//       </motion.button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ duration: 0.3 }}
//             className="fixed bottom-20 right-4 w-[95%] max-w-[400px] h-[70%] max-h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden"
//           >
//             <div className="p-3 border-b bg-teal-500 text-white">
//               <h3 className="font-semibold">Sentilytics Chat</h3>
//             </div>

//             <div className="flex-1 p-4 space-y-4 overflow-y-auto">
//               {messages.map((message) => (
//                 <ChatMessage key={message.id} message={message} />
//               ))}
//             </div>

//             <ChatInput onSend={handleSendMessage} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }



import React, { useState } from "react";
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

  const handleSendMessage = async (userMessage: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userMessage,
      isBot: false,
    };
    setMessages((prev) => [...prev, userMsg]);

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
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
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
            </div>

            <ChatInput onSend={handleSendMessage} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
