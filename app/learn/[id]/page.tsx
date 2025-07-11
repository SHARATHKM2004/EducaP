"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Play, Award, Clock } from "lucide-react"
import Link from "next/link"

export default function LearnModule({ params }: { params: { id: string } }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<number[]>([])

  const moduleData = {
    id: params.id,
    title: "Understanding Your Body",
    description: "Learn about basic anatomy and body changes during growth",
    duration: "20 minutes",
    difficulty: "Beginner",
    ageGroup: "10+",
    sections: [
      {
        title: "Introduction to Body Systems",
        content:
          "Your body is made up of different systems that work together to keep you healthy and functioning. Understanding these systems helps you take better care of yourself.",
        keyPoints: [
          "The human body has multiple interconnected systems",
          "Each system has a specific function",
          "Taking care of your body supports all systems",
        ],
      },
      {
        title: "Growth and Development",
        content:
          "As you grow, your body goes through many changes. These changes are normal and happen to everyone, though at different times and rates.",
        keyPoints: [
          "Growth happens at different rates for different people",
          "Physical changes are a normal part of development",
          "Everyone develops at their own pace",
        ],
      },
      {
        title: "Taking Care of Your Body",
        content:
          "Good hygiene and healthy habits help your body function at its best. This includes regular bathing, eating nutritious foods, and getting enough sleep.",
        keyPoints: [
          "Daily hygiene practices are important",
          "Nutrition affects how your body grows and functions",
          "Sleep is essential for healthy development",
        ],
      },
    ],
  }

  const currentSectionData = moduleData.sections[currentSection]
  const progress = ((currentSection + 1) / moduleData.sections.length) * 100

  const handleNext = () => {
    if (currentSection < moduleData.sections.length - 1) {
      setCompletedSections((prev) => [...prev, currentSection])
      setCurrentSection(currentSection + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleComplete = () => {
    setCompletedSections((prev) => [...prev, currentSection])
    // Navigate to quiz or completion page
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
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <span className="font-semibold">{moduleData.title}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{moduleData.ageGroup}</Badge>
              <Badge variant="secondary">{moduleData.difficulty}</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Progress Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Learning Progress</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{moduleData.duration}</span>
              </div>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-gray-600">
              Section {currentSection + 1} of {moduleData.sections.length}
            </p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Section Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {moduleData.sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      index === currentSection
                        ? "bg-blue-100 text-blue-900 border border-blue-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{section.title}</span>
                      {completedSections.includes(index) && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{currentSectionData.title}</CardTitle>
                <CardDescription>
                  Section {currentSection + 1} of {moduleData.sections.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Content */}
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">{currentSectionData.content}</p>
                </div>

                {/* Key Points */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Points to Remember:</h3>
                  <ul className="space-y-2">
                    {currentSectionData.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Element Placeholder */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Play className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-blue-900">Interactive Content</h4>
                        <p className="text-sm text-blue-700">
                          Watch a short video or complete an interactive exercise to reinforce your learning.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentSection === 0}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  {currentSection === moduleData.sections.length - 1 ? (
                    <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                      <Award className="h-4 w-4 mr-2" />
                      Complete Module
                    </Button>
                  ) : (
                    <Button onClick={handleNext}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
