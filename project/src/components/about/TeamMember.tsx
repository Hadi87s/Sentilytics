import React from "react";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";

interface TeamMemberProps {
  name: string;
  major: string;
  github: string;
  email: string;
  image: string;
  bio: string;
}

export function TeamMember({
  name,
  major,
  github,
  email,
  image,
  bio,
}: TeamMemberProps) {
  return (
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between min-h-[400px]"
>
  <img
    src={image}
    alt={name}
    className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
  />
  <div className="flex flex-col items-center justify-center">
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      {name}
    </h3>
    <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-teal-500 text-white text-sm font-bold border border-teal-600">
      {major}
    </span>
  </div>
  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
    {bio}
  </p>
  <div className="flex flex-col space-y-2 mt-auto">
    <a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      <Github className="w-5 h-5" />
      <span>View on GitHub</span>
    </a>
    <a
      href={`mailto:${email}`}
      className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors duration-200"
    >
      <Mail className="w-5 h-5" />
      <span>Contact</span>
    </a>
  </div>
</motion.div>

  );
}
