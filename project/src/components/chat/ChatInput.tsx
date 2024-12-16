// import React, { useState } from "react";
// import { Send } from "lucide-react";

// interface ChatInputProps {
//   onSend: (message: string) => void;
// }

// export function ChatInput({ onSend }: ChatInputProps) {
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message.trim()) {
//       onSend(message);
//       setMessage("");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="p-4 border-t border-gray-200 dark:border-gray-700"
//     >
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//         />
//         <button
//           type="submit"
//           title="Send Message"
//           className="p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-300"
//         >
//           <Send className="w-5 h-5" />
//         </button>
//       </div>
//     </form>
//   );
// }



import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button type="submit" className="p-2 bg-teal-500 text-white rounded-lg">
          <Send />
        </button>
      </div>
    </form>
  );
}




// import React, { useState } from "react";
// import { Send } from "lucide-react";

// interface ChatInputProps {
//   onSend: (message: string) => void;
// }

// export function ChatInput({ onSend }: ChatInputProps) {
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message.trim()) {
//       onSend(message);
//       setMessage("");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border-t">
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 p-2 border rounded-lg"
//         />
//         <button type="submit" className="p-2 bg-teal-500 text-white rounded-lg">
//           <Send />
//         </button>
//       </div>
//     </form>
//   );
// }
