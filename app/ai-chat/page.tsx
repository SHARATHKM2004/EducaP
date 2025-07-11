"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, ArrowLeft, Sparkles, MessageSquare } from "lucide-react"
import Link from "next/link"

interface ChatMessage {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
  suggestions?: string[]
}

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! I'm your AI Health Assistant. I'm here to help answer your questions about sexual health, puberty, hygiene, and general wellness. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
      suggestions: [
        "What changes happen during puberty?",
        "How to maintain good hygiene?",
        "What is consent?",
        "Period-related questions",
      ],
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const aiResponses = {
    puberty:
      "Puberty is a natural process where your body changes from a child to an adult. This typically happens between ages 8-14 for girls and 9-16 for boys. Changes include growth spurts, voice changes, body hair growth, and hormonal changes. It's completely normal and everyone goes through it at their own pace.",
    hygiene:
      "Good hygiene is essential for health and confidence. Key practices include: daily bathing, brushing teeth twice daily, washing hands frequently, wearing clean clothes, and maintaining genital hygiene. During menstruation, change pads/tampons regularly and maintain extra cleanliness.",
    consent:
      "Consent means giving permission for something to happen. In relationships, it means both people agree to any physical contact. Consent must be: freely given, ongoing (can be withdrawn), informed, enthusiastic, and specific. Remember: you always have the right to say no.",
    period:
      "Menstruation is a natural monthly process for people with uteruses, typically starting between ages 10-15. It's when the lining of the uterus sheds, causing bleeding for 3-7 days. Use pads or tampons, maintain hygiene, and track your cycle. Pain is normal but severe pain should be discussed with a doctor.",
    default:
      "That's a great question! While I can provide general health information, for specific medical concerns, it's always best to consult with a healthcare professional. Is there a particular aspect of health or wellness you'd like to learn more about?",
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const messageText = newMessage.toLowerCase()
      let response = aiResponses.default

      if (messageText.includes("puberty") || messageText.includes("changes")) {
        response = aiResponses.puberty
      } else if (messageText.includes("hygiene") || messageText.includes("clean")) {
        response = aiResponses.hygiene
      } else if (messageText.includes("consent")) {
        response = aiResponses.consent
      } else if (messageText.includes("period") || messageText.includes("menstruation")) {
        response = aiResponses.period
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "ai",
        timestamp: new Date(),
        suggestions: [
          "Tell me more about this topic",
          "What are the warning signs?",
          "How can I talk to my parents about this?",
          "Are there any resources for help?",
        ],
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-purple-600" />
                <span className="font-semibold">AI Health Assistant</span>
              </div>
            </div>
            <Badge className="bg-purple-100 text-purple-800 flex items-center space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>AI Powered</span>
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* AI Info Card */}
        <Card className="mb-6 border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Bot className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-purple-900">AI Health Assistant</h3>
                <p className="text-sm text-purple-700 mt-1">
                  I provide evidence-based health information in a safe, judgment-free environment. For serious medical
                  concerns, please consult a healthcare professional.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Chat with AI Assistant</span>
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                    {message.sender === "ai" && (
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                    {message.sender === "user" && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Suggestions */}
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 ml-10">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about health and wellness..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send • AI responses are for educational purposes only
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
