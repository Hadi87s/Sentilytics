import React from "react";
import { motion } from "framer-motion";
import { TeamMember } from "./about/TeamMember";

const teamMembers = [
  {
    name: "Ali Abu Nimah",
    major: "",
    github: "https://github.com/ali94an",
    email: "alibassab25@gmail.com",
    instagram: "https://www.instagram.com/ali94an",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEGhhCRjWMu6g/profile-displayphoto-shrink_400_400/B56ZR5yjBbHsAo-/0/1737210082044?e=1743033600&v=beta&t=EOyDGc9yGrL6KfW123ctWEplzkWC1isbKAdwgeUgSIo",
    bio: "Ali specializes in backend development and data integration. He works on scraping logic, building APIs, and optimizing systems for efficiency, ensuring seamless integration of the sentiment analysis model into the platform.",
  },
  {
    name: "Amr Qamhieh",
    major: "",
    github: "https://github.com",
    email: "amrqam12@gmail.com",
    instagram: "https://www.instagram.com/amrrqamhieh/",
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQG8cnKZ_XFupQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726342547338?e=1738195200&v=beta&t=BDddYIF21NJ5Ka6L1wsh0iz1D4XQWyBqiMZYnS8UZdY",
    bio: "Amr is the front-end developer who transforms designs into dynamic and responsive user interfaces. He ensures a seamless user experience by implementing interactive components and connecting them to the backend.",
  },
  {
    name: "Muawiya Nasser",
    major: "",
    github: "https://github.com/MuawiyaNasser",
    email: "muawiyanasser66@gmail.com",
    instagram: "https://www.instagram.com/muawiya.a.a.a/",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQETv5yiA6ySJg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719750364772?e=1738800000&v=beta&t=4T2qsFwHvG9-nGwaU67BKHHJiyvwT42LP9AqEQvJiKw",
    bio: "Muawiya leads the data science efforts, optimizing sentiment analysis models for accuracy and multilingual support. He provides key insights to enhance data visualizations and backend integration.",
  },
  {
    name: "Ali Odeh",
    major: "",
    github: "https://github.com",
    email: "ali.odeh399@gmail.com",
    instagram: "https://www.instagram.com/ali.odeh00/",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQH82cqlg3rVJQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1675361511096?e=1738195200&v=beta&t=Ui_bW7Z0nCIlNctNoRk5pAxD560ZHnIRRyJx7GKNQ_Q",
    bio: "Ali provides front-end support, assisting with implementing the website's user interface and ensuring responsiveness. He collaborates closely with Amr to refine the visual and functional aspects of the platform.",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About Sentilytics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sentilytics is an advanced sentiment analysis platform that
            leverages AI to analyze Amazon product reviews. Our system provides
            valuable insights by processing customer feedback and determining
            sentiment patterns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
