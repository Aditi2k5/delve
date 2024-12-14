'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Globe, Code, Laptop } from 'lucide-react'

const projectRecommendations = [
  {
    title: "Personal Portfolio Website",
    description: "Build a responsive portfolio website to showcase your projects and skills.",
    difficulty: "Beginner",
    techStack: ["HTML", "CSS", "JavaScript"],
    resources: ["MDN Web Docs", "FreeCodeCamp", "CSS-Tricks"],
    icon: Globe,
    color: 'text-blue-500',
  },
  {
    title: "Task Management App",
    description: "Create a full-stack task management application with user authentication.",
    difficulty: "Intermediate",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    resources: ["React Documentation", "Node.js Documentation", "MongoDB University"],
    icon: Code,
    color: 'text-green-500',
  },
  {
    title: "Machine Learning Image Classifier",
    description: "Develop an image classification model using machine learning techniques.",
    difficulty: "Advanced",
    techStack: ["Python", "TensorFlow", "Keras"],
    resources: ["TensorFlow Documentation", "Coursera Machine Learning Course", "Kaggle Datasets"],
    icon: Laptop,
    color: 'text-purple-500',
  }
]

export default function ProjectRecommendations() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Project Recommendations</h1>
          <p className="text-lg text-gray-400">
            Explore these tailored project ideas to enhance your skills and build your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectRecommendations.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-[#0F1218] border-[#1D2026] overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-2 rounded-lg bg-[#1D2026] ${project.color}`}>
                      <project.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Badge variant="outline" className="bg-[#1D2026] text-blue-400 border-blue-400/20">
                      {project.difficulty}
                    </Badge>

                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-[#1D2026] text-gray-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#1D2026] p-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-center hover:bg-[#1D2026] text-blue-400"
                    onClick={() => setSelectedProject(selectedProject === index ? null : index)}
                  >
                    {selectedProject === index ? (
                      <>
                        Hide Resources
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show Resources
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {selectedProject === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <h4 className="font-medium text-blue-400 mb-2">Resources:</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      {project.resources.map((resource, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-400" />
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

