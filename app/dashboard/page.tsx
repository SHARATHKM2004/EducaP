"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  LogOut,
  BookOpen,
  MessageCircle,
  Video,
  Bot,
  Award,
  Shield,
  Calendar,
  Phone,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardUser {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timeInterval)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const learningStats = {
    completedModules: 3,
    totalModules: 12,
    streakDays: 7,
    totalPoints: 450,
  }

  const quickActions = [
    {
      title: "Continue Learning",
      description: "Resume your current module",
      icon: BookOpen,
      color: "bg-blue-500",
      href: "/learn",
    },
    {
      title: "Ask Questions",
      description: "Anonymous Q&A with experts",
      icon: MessageCircle,
      color: "bg-green-500",
      href: "/chat",
    },
    {
      title: "Watch Videos",
      description: "Educational video content",
      icon: Video,
      color: "bg-purple-500",
      href: "/videos",
    },
    {
      title: "AI Assistant",
      description: "Get instant help from AI",
      icon: Bot,
      color: "bg-orange-500",
      href: "/ai-chat",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EduSathi</h1>
                <p className="text-xs text-gray-600">Welcome back, {user.first_name}!</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-sm text-gray-600">{currentTime.toLocaleString()}</div>
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Emergency
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, {user.first_name} {user.last_name}!
                </h2>
                <p className="text-purple-100 text-lg">
                  Ready to continue your learning journey? Let's make today count!
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/20 rounded-full p-4">
                  <Heart className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Modules Completed</span>
                  <span>
                    {learningStats.completedModules}/{learningStats.totalModules}
                  </span>
                </div>
                <Progress value={(learningStats.completedModules / learningStats.totalModules) * 100} className="h-2" />
                <p className="text-xs text-gray-600">
                  {Math.round((learningStats.completedModules / learningStats.totalModules) * 100)}% Complete
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-500" />
                Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{learningStats.streakDays}</div>
                <p className="text-sm text-gray-600">Days in a row</p>
                <Badge variant="secondary" className="mt-2">
                  Keep it up! 🔥
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-1">{learningStats.totalPoints}</div>
                <p className="text-sm text-gray-600">Total earned</p>
                <Badge variant="secondary" className="mt-2">
                  Level 3 🏆
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Shield className="h-5 w-5 mr-2 text-purple-500" />
                Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
                <p className="text-sm text-gray-600">Protected</p>
                <Badge variant="secondary" className="mt-2">
                  Anonymous 🔒
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                       <action.icon className="h-6 w-6 text-white" />

                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-blue-900">Understanding Puberty</h4>
                    <p className="text-sm text-blue-700">Module 4 • 15 min remaining</p>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Continue
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Emotional Health</h4>
                    <p className="text-sm text-gray-600">Module 5 • Not started</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Start
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety & Support</CardTitle>
              <CardDescription>Always here when you need help</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Anonymous Q&A</h4>
                  <p className="text-sm text-green-700 mb-3">Ask questions safely without revealing your identity</p>
                  <Link href="/chat">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Ask Question
                    </Button>
                  </Link>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Emergency Help</h4>
                  <p className="text-sm text-red-700 mb-3">24/7 support and emergency contacts</p>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-700 bg-transparent">
                    Get Help
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
