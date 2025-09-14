"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Users,
  MessageCircle,
  Calendar,
  BookOpen,
  MapPin,
  Building,
  Star,
  Edit,
  Plus,
  TrendingUp,
  Award,
  Globe,
  Linkedin,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface AlumniProfile {
  id: number
  userId: number
  firstName: string
  lastName: string
  graduationYear: number
  degree: string
  major: string
  currentCompany: string
  currentPosition: string
  industry: string
  location: string
  bio: string
  skills: string[]
  isMentor: boolean
  mentorCategories: string[]
  linkedinUrl: string
  websiteUrl: string
  profileImageUrl: string
  availabilityStatus: string
}

interface MentorshipRequest {
  id: number
  studentName: string
  status: string
  category: string
  message: string
  createdAt: string
}

interface CareerUpdate {
  id: number
  company: string
  position: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description: string
}

export default function AlumniDashboard() {
  const [profile, setProfile] = useState<AlumniProfile | null>(null)
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>([])
  const [careerHistory, setCareerHistory] = useState<CareerUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is alumni
    const userType = localStorage.getItem("userType")
    if (userType !== "alumni") {
      router.push("/auth/login")
      return
    }

    fetchProfile()
    fetchMentorshipRequests()
    fetchCareerHistory()
  }, [router])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/users/profile?userId=2")
      const data = await response.json()
      setProfile({
        ...data.profile,
        firstName: "Sarah",
        lastName: "Alumni",
      })
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMentorshipRequests = async () => {
    try {
      const response = await fetch("/api/mentorship/requests?userId=2&userType=alumni")
      const data = await response.json()
      setMentorshipRequests(data.requests || [])
    } catch (error) {
      console.error("Error fetching mentorship requests:", error)
    }
  }

  const fetchCareerHistory = async () => {
    // Mock career history data
    setCareerHistory([
      {
        id: 1,
        company: "Google",
        position: "Senior Software Engineer",
        startDate: "2020-01-01",
        isCurrent: true,
        description: "Leading full-stack development projects and mentoring junior developers.",
      },
      {
        id: 2,
        company: "Microsoft",
        position: "Software Engineer",
        startDate: "2018-06-01",
        endDate: "2019-12-31",
        isCurrent: false,
        description: "Developed cloud-based solutions and worked on Azure platform improvements.",
      },
    ])
  }

  const toggleMentorStatus = async () => {
    if (!profile) return

    try {
      const updatedProfile = { ...profile, isMentor: !profile.isMentor }
      setProfile(updatedProfile)

      // In real app, update database
      await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      })
    } catch (error) {
      console.error("Error updating mentor status:", error)
    }
  }

  const handleMentorshipRequest = async (requestId: number, status: "accepted" | "declined") => {
    try {
      await fetch("/api/mentorship/requests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status }),
      })

      // Update local state
      setMentorshipRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status } : req)))
    } catch (error) {
      console.error("Error updating mentorship request:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "declined":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AlumniConnect</span>
            </Link>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Alumni Dashboard
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Messages
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                localStorage.clear()
                router.push("/auth/login")
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={profile?.profileImageUrl || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback className="text-2xl">
                      {profile?.firstName?.[0]}
                      {profile?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-gray-900">
                    {profile?.firstName} {profile?.lastName}
                  </h2>
                  <p className="text-gray-600">{profile?.currentPosition}</p>
                  <p className="text-sm text-gray-500">{profile?.currentCompany}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {profile?.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Class of {profile?.graduationYear}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    {profile?.industry}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {profile?.linkedinUrl && (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:underline"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn Profile
                    </a>
                  )}
                  {profile?.websiteUrl && (
                    <a
                      href={profile.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:underline"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Personal Website
                    </a>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="mentor-toggle" className="text-sm font-medium">
                      Available for Mentorship
                    </Label>
                    <Switch
                      id="mentor-toggle"
                      checked={profile?.isMentor || false}
                      onCheckedChange={toggleMentorStatus}
                    />
                  </div>
                  {profile?.isMentor && <Badge className="bg-green-100 text-green-800 text-xs">Active Mentor</Badge>}
                </div>

                <Button className="w-full mt-4" onClick={() => router.push("/dashboard/alumni/edit-profile")}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                <TabsTrigger value="career">Career</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* About Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{profile?.bio}</p>
                  </CardContent>
                </Card>

                {/* Skills Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile?.skills?.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <p className="text-sm text-gray-600">Updated profile information</p>
                        <span className="text-xs text-gray-400">2 days ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <p className="text-sm text-gray-600">Accepted mentorship request from John Student</p>
                        <span className="text-xs text-gray-400">1 week ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <p className="text-sm text-gray-600">Registered for Alumni Networking Night</p>
                        <span className="text-xs text-gray-400">2 weeks ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mentorship" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Mentorship Requests
                    </CardTitle>
                    <CardDescription>Manage incoming mentorship requests from students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mentorshipRequests.length === 0 ? (
                      <div className="text-center py-8">
                        <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No mentorship requests</h3>
                        <p className="text-gray-600">
                          {profile?.isMentor
                            ? "Students will be able to request mentorship from you"
                            : "Enable mentorship availability to receive requests"}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {mentorshipRequests.map((request) => (
                          <Card key={request.id} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="font-medium text-gray-900">{request.studentName}</h4>
                                  <p className="text-sm text-gray-600">{request.category}</p>
                                </div>
                                <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                              </div>
                              <p className="text-sm text-gray-700 mb-4">{request.message}</p>
                              {request.status === "pending" && (
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={() => handleMentorshipRequest(request.id, "accepted")}>
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleMentorshipRequest(request.id, "declined")}
                                  >
                                    Decline
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="career" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <Award className="w-5 h-5 mr-2" />
                          Career Journey
                        </CardTitle>
                        <CardDescription>Your professional experience and achievements</CardDescription>
                      </div>
                      <Button size="sm" onClick={() => router.push("/dashboard/alumni/add-experience")}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {careerHistory.map((experience, index) => (
                        <div key={experience.id} className="relative">
                          {index !== careerHistory.length - 1 && (
                            <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200" />
                          )}
                          <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Building className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-gray-900">{experience.position}</h4>
                                {experience.isCurrent && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">Current</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{experience.company}</p>
                              <p className="text-xs text-gray-500 mb-2">
                                {new Date(experience.startDate).getFullYear()} -{" "}
                                {experience.isCurrent ? "Present" : new Date(experience.endDate!).getFullYear()}
                              </p>
                              <p className="text-sm text-gray-700">{experience.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="network" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      My Network
                    </CardTitle>
                    <CardDescription>Your connections and mentees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="text-center p-6 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-2">12</div>
                        <p className="text-sm text-gray-600">Active Connections</p>
                      </div>
                      <div className="text-center p-6 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-2">3</div>
                        <p className="text-sm text-gray-600">Current Mentees</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Alumni Networking Night</h4>
                            <p className="text-sm text-gray-600">October 15, 2024 at 6:00 PM</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Registered</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
