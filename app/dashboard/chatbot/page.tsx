'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, AlertTriangle } from 'lucide-react'

// Define the message type
type Message = {
  role: 'user' | 'bot',
  content: string
}

// List of computer science and programming-related topics
const VALID_TOPICS = [
  'programming', 'software development', 'coding', 'computer science', 
  'web development', 'algorithms', 'data structures', 'software engineering', 
  'machine learning', 'artificial intelligence', 'database', 'networking', 
  'cybersecurity', 'cloud computing', 'devops', 'version control', 
  'system design', 'backend', 'frontend', 'full stack', 'api', 'framework', 
  'programming languages', 'software architecture', 'development tools'
]

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check if the query is related to computer science/programming
  const isValidTopic = (query: string): boolean => {
    const lowercaseQuery = query.toLowerCase()
    return VALID_TOPICS.some(topic => 
      lowercaseQuery.includes(topic) || 
      topic.split(' ').some(word => lowercaseQuery.includes(word))
    )
  }

  const sendMessage = async () => {
    // Reset previous errors
    setError(null)

    // Validate input
    if (!input.trim()) return

    // Check if the topic is valid
    if (!isValidTopic(input)) {
      setError("Sorry, I can only assist with programming, software development, and computer science topics.")
      return
    }

    // Prepare messages for API
    const newUserMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, newUserMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Make API call to Cerebras
      const response = await fetch('https://api.cerebras.net/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CEREBRAS_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "cerebras-code-model", // Replace with actual model name
          messages: [
            { 
              role: 'system', 
              content: 'You are a helpful AI assistant specialized in computer science, programming, and software development. Provide clear, concise, and accurate technical answers. If a question is outside your domain, politely explain that you can only assist with programming-related topics.' 
            },
            ...messages.map(msg => ({
              role: msg.role === 'user' ? 'user' : 'assistant',
              content: msg.content
            })),
            { role: 'user', content: input }
          ],
          max_tokens: 300, // Adjust as needed
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      const botReply: Message = { 
        role: 'bot', 
        content: data.choices[0].message.content.trim() 
      }

      setMessages(prev => [...prev, botReply])
    } catch (err) {
      console.error('Error:', err)
      setError('Sorry, there was an error processing your request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-[#0F1218] border-[#1D2026] h-[calc(100vh-10rem)]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b border-[#1D2026] p-6">
            <h1 className="text-xl font-semibold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                &lt;DelVe&gt;
              </span>{' '}
              AI Devbot
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Your specialized assistant for programming and computer science
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 p-4 flex items-center text-red-400">
              <AlertTriangle className="mr-2 h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Message Area */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{message.role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-[#1D2026] text-gray-200'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-[#1D2026] text-gray-200 rounded-lg p-4">
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-[#1D2026] p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage()
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a programming or development question..."
                className="flex-1 bg-[#1D2026] border-[#2D3036] focus:border-blue-500/50 text-gray-200"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-blue-500 hover:bg-blue-600"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  )
}