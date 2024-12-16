// import React from "react";
// import type { Message } from "../../types";

// interface ChatMessageProps {
//   message: Message;
// }

// export function ChatMessage({ message }: ChatMessageProps) {
//   return (
//     <div className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
//       <div
//         className={`max-w-[80%] p-3 rounded-lg ${
//           message.isBot
//             ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//             : "bg-teal-500 text-white"
//         }`}
//       >
//         <p className="text-sm">{message.text}</p>
//       </div>
//     </div>
//   );
// }

import React from "react";
import ReactMarkdown from "react-markdown";
import type { Message } from "../../types";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.isBot
            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            : "bg-teal-500 text-white"
        }`}
      >
        {/* Use ReactMarkdown for rendering Markdown-formatted text */}
        <ReactMarkdown className="markdown">{message.text}</ReactMarkdown>
      </div>
    </div>
  );
}
