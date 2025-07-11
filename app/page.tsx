"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Globe, Users, BookOpen, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function WelcomePage() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  const inspirationalQuotes = [
    "Knowledge is power. Let's empower minds, not hide truths.",
    "Sex education is not a luxury, it's a necessity.",
    "Healthy choices start with healthy awareness.",
    "Dignity. Confidence. Respect. All begin with the right education.",
    "Breaking taboos, building awareness, creating a healthier tomorrow.",
    "Education is the most powerful weapon to change the world.",
    "Your body, your choice, your right to know.",
    "Empowering youth with knowledge for a safer future.",
  ]

  // Rotate quotes every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % inspirationalQuotes.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [inspirationalQuotes.length])

  const features = [
    {
      icon: Shield,
      title: "100% Anonymous",
      description: "Complete privacy protection",
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Available in 10+ Indian languages",
    },
    {
      icon: Users,
      title: "Age-Appropriate",
      description: "Content tailored to your age group",
    },
    {
      icon: MessageCircle,
      title: "24/7 Support",
      description: "AI assistant and expert help",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Heart className="h-10 w-10 text-purple-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EduSathi</h1>
                <p className="text-xs text-gray-600">Empowering Education</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Safe • Private • Trusted</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                EduSathi
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto">
              Empowering Sex Education & Health Awareness
            </h2>
          </div>

          {/* Rotating Inspirational Quotes */}
          <div className="mb-12">
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
              <CardContent className="p-8">
                <div className="relative h-16 flex items-center justify-center">
                  <blockquote className="text-lg md:text-xl font-medium text-gray-800 italic text-center transition-all duration-500 ease-in-out">
                    "{inspirationalQuotes[currentQuoteIndex]}"
                  </blockquote>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  {inspirationalQuotes.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentQuoteIndex ? "bg-purple-600 w-8" : "bg-purple-300"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* App Description */}
          <div className="mb-12">
            <Card className="max-w-5xl mx-auto">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">About EduSathi</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      EduSathi is a <strong>privacy-first</strong>, <strong>multi-language</strong>,
                      <strong> AI-powered platform</strong> that helps youth and students learn about sex education,
                      health, hygiene, and awareness.
                    </p>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Available 24x7, completely anonymous</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Designed especially for Indian learners of all ages</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Includes teleconsultation, video tips, gamified learning</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Emergency help and support resources</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <feature.icon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm text-gray-900">{feature.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Users className="mr-3 h-6 w-6" />
                New to EduSathi? Register
              </Button>
            </Link>

            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                <BookOpen className="mr-3 h-6 w-6" />
                Already Registered? Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Made with ❤️ for India</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Trusted by Thousands</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2024 EduSathi - Empowering India's Youth with Safe Sex Education</p>
            <p className="text-sm">
              <strong>Emergency Helplines:</strong> National: 1098 | Women: 181 | Police: 100 | Medical: 108
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
