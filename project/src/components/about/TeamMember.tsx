import React from "react";
import { motion } from "framer-motion";
import { Github, Mail, Instagram } from "lucide-react"; // Import Instagram icon

interface TeamMemberProps {
  name: string;
  image: string;
  bio: string;
  github: string;
  email: string;
  instagram: string; // Add Instagram prop
}

export function TeamMember({
  name,
  image,
  bio,
  github,
  email,
  instagram, // Destructure Instagram
}: TeamMemberProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 70, damping: 10, duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-100"
    >
      {/* Profile Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover object-center"
      />

      {/* Content */}
      <div className="p-6">
        {/* Name */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {name}
        </h3>

        {/* Bio */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{bio}</p>

        {/* Social Links */}
        <div className="flex space-x-4">
          {/* GitHub */}
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-300"
          >
            <Github className="w-6 h-6" />
          </a>

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-300"
          >
            <Mail className="w-6 h-6" />
          </a>

          {/* Instagram */}
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-300"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
