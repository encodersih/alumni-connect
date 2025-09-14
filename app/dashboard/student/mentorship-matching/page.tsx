"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Star, Target, ArrowLeft, MessageCircle, Building, Award, Zap, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface MentorRecommendation {
  id: number
  userId: number
  firstName: string
  lastName: string
  currentCompany: string
  currentPosition: string
  industry: string
  skills: string[]
  mentorCategories: string[]
  availabilityStatus: string
  matchScore: number
}

interface MatchingAnalytics {
  totalMentors: number
  availableMentors: number
  categoryMatches: number
  matchRate: number
}

export default function MentorshipMatchingPage() {
  const [recommendations, setRecommendations] = useState<MentorRecommendation[]>([])
  const [analytics, setAnalytics] = useState<MatchingAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchRecommendations()
    fetchAnalytics()
  }, [])

  const fetchRecommendations = async () => {
    try {
      const response = await fetch("/api/mentorship/matching?studentId=1&type=recommendations")
      const data = await response.json()
      setRecommendations(data.recommendations || [])
    } catch (error) {
      console.error("Error fetching recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/mentorship/matching?studentId=1&type=analytics")
      const data = await response.json()
      setAnalytics(data.analytics)
    } catch (error) {
      console.error("Error fetching analytics:", error)
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getMatchScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent Match"
    if (score >= 60) return "Good Match"
    if (score >= 40) return "Fair Match"
    return "Low Match"
  }

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "unavailable":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/student" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AlumniConnect</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Mentorship Matching</h1>
          <p className="text-gray-600">AI-powered recommendations based on your interests and career goals</p>
        </div>

        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recommendations">Mentor Recommendations</TabsTrigger>
            <TabsTrigger value="analytics">Matching Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-6">
            {/* Matching Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Your Matching Profile
                </CardTitle>
                <CardDescription>Based on your interests and career goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Preferred Categories</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary">Career Development</Badge>
                      <Badge variant="secondary">Technical Skills</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline">Web Development</Badge>
                      <Badge variant="outline">AI/ML</Badge>
                      <Badge variant="outline">Startups</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Career Goal</h4>
                    <p className="text-sm text-gray-600">Full-stack developer at a tech startup</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mentor Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recommended Mentors</h2>
                <Badge className="bg-blue-100 text-blue-800">
                  <Zap className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full" />
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-24" />
                            <div className="h-3 bg-gray-200 rounded w-32" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded" />
                          <div className="h-3 bg-gray-200 rounded w-3/4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendations.map((mentor) => (
                    <Card key={mentor.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        {/* Match Score Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className={`text-2xl font-bold ${getMatchScoreColor(mentor.matchScore)}`}>
                              {mentor.matchScore}%
                            </div>
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">{getMatchScoreLabel(mentor.matchScore)}</div>
                              <div className="text-gray-500">Match Score</div>
                            </div>
                          </div>
                          <Badge className={getAvailabilityColor(mentor.availabilityStatus)}>
                            {mentor.availabilityStatus}
                          </Badge>
                        </div>

                        {/* Mentor Info */}
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="/placeholder.svg" alt={`${mentor.firstName} ${mentor.lastName}`} />
                            <AvatarFallback>
                              {mentor.firstName[0]}
                              {mentor.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {mentor.firstName} {mentor.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">{mentor.currentPosition}</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Building className="w-4 h-4 mr-2" />
                            {mentor.currentCompany}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Award className="w-4 h-4 mr-2" />
                            {mentor.industry}
                          </div>
                        </div>

                        {/* Match Reasons */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Why this is a good match:</h4>
                          <div className="space-y-1">
                            {mentor.mentorCategories.some((cat) =>
                              ["Career Development", "Technical Skills"].includes(cat),
                            ) && (
                              <div className="flex items-center text-xs text-green-600">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                                Matches your preferred mentorship categories
                              </div>
                            )}
                            {mentor.skills.some((skill) =>
                              ["JavaScript", "Python", "React"].some((interest) =>
                                skill.toLowerCase().includes(interest.toLowerCase()),
                              ),
                            ) && (
                              <div className="flex items-center text-xs text-blue-600">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                                Has skills relevant to your interests
                              </div>
                            )}
                            {mentor.industry === "Technology" && (
                              <div className="flex items-center text-xs text-purple-600">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                                Works in your target industry
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {mentor.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {mentor.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{mentor.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => router.push(`/dashboard/student/mentorship-request/${mentor.userId}`)}
                            disabled={mentor.availabilityStatus === "unavailable"}
                          >
                            <Star className="w-4 h-4 mr-1" />
                            Request Mentorship
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {analytics && (
              <>
                {/* Analytics Overview */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{analytics.totalMentors}</div>
                      <p className="text-sm text-gray-600">Total Mentors</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">{analytics.availableMentors}</div>
                      <p className="text-sm text-gray-600">Available Now</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">{analytics.categoryMatches}</div>
                      <p className="text-sm text-gray-600">Category Matches</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-2">{analytics.matchRate}%</div>
                      <p className="text-sm text-gray-600">Match Rate</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Matching Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Matching Insights
                    </CardTitle>
                    <CardDescription>How well your profile matches with available mentors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Category Alignment</span>
                        <span className="text-sm text-gray-600">{analytics.matchRate}%</span>
                      </div>
                      <Progress value={analytics.matchRate} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Mentor Availability</span>
                        <span className="text-sm text-gray-600">
                          {Math.round((analytics.availableMentors / analytics.totalMentors) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={Math.round((analytics.availableMentors / analytics.totalMentors) * 100)}
                        className="h-2"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Recommendations to improve matches:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Consider expanding your preferred mentorship categories</li>
                        <li>• Add more specific skills to your interests</li>
                        <li>• Update your career goals to be more specific</li>
                        <li>• Connect with mentors in related industries</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
