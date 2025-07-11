"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Shield, Lock, MessageCircle, ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  text: string
  sender: "user" | "expert" | "system"
  timestamp: Date
  isAnonymous: boolean
}

export default function AnonymousChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to Anonymous Q&A! You can ask any health-related questions here safely. Your identity is completely protected.",
      sender: "system",
      timestamp: new Date(),
      isAnonymous: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isConnected, setIsConnected] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      isAnonymous: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate expert response
    setTimeout(() => {
      const expertResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your question. This is a safe space to discuss health topics. A verified health expert will respond to you shortly with accurate information.",
        sender: "expert",
        timestamp: new Date(),
        isAnonymous: true,
      }
      setMessages((prev) => [...prev, expertResponse])
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                <Shield className="h-6 w-6 text-green-500" />
                <span className="font-semibold">Anonymous Q&A</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`} />
                <span>{isConnected ? "Connected" : "Disconnected"}</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Privacy Notice */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Lock className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-900">Your Privacy is Protected</h3>
                <p className="text-sm text-green-700 mt-1">
                  This chat is completely anonymous. No personal information is stored or shared. All conversations are
                  encrypted and automatically deleted after 24 hours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Anonymous Health Q&A</span>
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-purple-600 text-white"
                      : message.sender === "expert"
                        ? "bg-blue-100 text-blue-900"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                    {message.sender === "expert" && <CheckCircle className="h-3 w-3 text-green-500" />}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your question anonymously..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send • Your identity remains completely anonymous
            </p>
          </div>
        </Card>

        {/* Emergency Notice */}
        <Card className="mt-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-900">Emergency Situations</h3>
                <p className="text-sm text-red-700 mt-1">
                  If you're in immediate danger or need urgent medical help, please contact:
                </p>
                <div className="mt-2 space-y-1 text-sm text-red-700">
                  <p>• Emergency: 112 | Police: 100 | Medical: 108</p>
                  <p>• Women Helpline: 181 | Child Helpline: 1098</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
