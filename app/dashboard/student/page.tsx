"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Search,
  MessageCircle,
  Calendar,
  BookOpen,
  MapPin,
  Building,
  Star,
  Filter,
  UserPlus,
  Clock,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Alumni {
  id: number
  userId: number
  firstName: string
  lastName: string
  graduationYear: number
  currentCompany: string
  currentPosition: string
  industry: string
  location: string
  bio: string
  skills: string[]
  isMentor: boolean
  mentorCategories: string[]
  profileImageUrl: string
  availabilityStatus: string
}

interface MentorshipRequest {
  id: number
  mentorName: string
  status: string
  category: string
  createdAt: string
}

export default function StudentDashboard() {
  const [alumni, setAlumni] = useState<Alumni[]>([])
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [mentorsOnly, setMentorsOnly] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is a student
    const userType = localStorage.getItem("userType")
    if (userType !== "student") {
      router.push("/auth/login")
      return
    }

    fetchAlumni()
    fetchMentorshipRequests()
  }, [router])

  const fetchAlumni = async () => {
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        industry: industryFilter,
        mentorsOnly: mentorsOnly.toString(),
      })

      const response = await fetch(`/api/alumni/search?${params}`)
      const data = await response.json()
      setAlumni(data.alumni || [])
    } catch (error) {
      console.error("Error fetching alumni:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMentorshipRequests = async () => {
    try {
      const response = await fetch("/api/mentorship/requests?userId=1&userType=student")
      const data = await response.json()
      setMentorshipRequests(data.requests || [])
    } catch (error) {
      console.error("Error fetching mentorship requests:", error)
    }
  }

  const handleSearch = () => {
    setLoading(true)
    fetchAlumni()
  }

  const handleConnect = (alumniId: number) => {
    router.push(`/dashboard/student/connect/${alumniId}`)
  }

  const handleRequestMentorship = (alumniId: number) => {
    router.push(`/dashboard/student/mentorship-request/${alumniId}`)
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
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Student Dashboard
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/student/mentorship-matching">
              <Button variant="outline" size="sm">
                <Zap className="w-4 h-4 mr-2" />
                Smart Matching
              </Button>
            </Link>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, John!</h1>
          <p className="text-gray-600">Connect with alumni, find mentors, and grow your network.</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Alumni</TabsTrigger>
            <TabsTrigger value="mentorship">My Mentorship</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Find Alumni
                </CardTitle>
                <CardDescription>Search and connect with alumni from your institution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by name, company, skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={mentorsOnly ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMentorsOnly(!mentorsOnly)}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Mentors Only
                    </Button>
                    <Button onClick={handleSearch}>Search</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alumni Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
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
                  ))
                : alumni.map((person) => (
                    <Card key={person.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={person.profileImageUrl || "/placeholder.svg"}
                              alt={`${person.firstName} ${person.lastName}`}
                            />
                            <AvatarFallback>
                              {person.firstName[0]}
                              {person.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {person.firstName} {person.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">{person.currentPosition}</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Building className="w-4 h-4 mr-2" />
                            {person.currentCompany}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {person.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Class of {person.graduationYear}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{person.bio}</p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {person.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {person.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{person.skills.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleConnect(person.userId)}>
                            <UserPlus className="w-4 h-4 mr-1" />
                            Connect
                          </Button>
                          {person.isMentor && (
                            <Button size="sm" onClick={() => handleRequestMentorship(person.userId)}>
                              <Star className="w-4 h-4 mr-1" />
                              Mentor
                            </Button>
                          )}
                        </div>

                        {person.isMentor && (
                          <div className="mt-2">
                            <Badge className="bg-green-100 text-green-800 text-xs">Available for Mentorship</Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </TabsContent>

          <TabsContent value="mentorship" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  My Mentorship Requests
                </CardTitle>
                <CardDescription>Track your mentorship applications and connections</CardDescription>
              </CardHeader>
              <CardContent>
                {mentorshipRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No mentorship requests yet</h3>
                    <p className="text-gray-600 mb-4">Start by browsing alumni and requesting mentorship</p>
                    <Button onClick={() => document.querySelector('[value="browse"]')?.click()}>Browse Alumni</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mentorshipRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Star className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{request.mentorName}</h4>
                            <p className="text-sm text-gray-600">{request.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(request.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Alumni events and networking opportunities</CardDescription>
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
                        <p className="text-sm text-gray-600">University Campus Center</p>
                        <p className="text-sm text-gray-500">October 15, 2024 at 6:00 PM</p>
                      </div>
                    </div>
                    <Button size="sm">Register</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Tech Career Panel</h4>
                        <p className="text-sm text-gray-600">Engineering Building Auditorium</p>
                        <p className="text-sm text-gray-500">October 22, 2024 at 2:00 PM</p>
                      </div>
                    </div>
                    <Button size="sm">Register</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
