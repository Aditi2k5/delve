'use client'

import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { MessageSquare, Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const features = [
    {
      title: 'AI Chatbot',
      description: 'Get instant coding help and answers to your programming questions.',
      icon: MessageSquare,
      href: '/dashboard/chatbot',
      color: 'text-blue-500',
    },
    {
      title: 'Project Recommendations',
      description: 'Discover new projects tailored to your skills and interests.',
      icon: Lightbulb,
      href: '/dashboard/projects',
      color: 'text-yellow-500',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              &lt;DeLve&gt;
            </span>
          </h1>
          <p className="text-lg text-gray-400">
            Your personalized coding journey starts here. Explore the features below to enhance your development skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className="p-6 bg-[#0F1218] border-[#1D2026] hover:border-blue-500/50 transition-all duration-300 h-full">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-[#1D2026] ${feature.color}`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                    <div className="flex items-center text-sm text-blue-500 group">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

