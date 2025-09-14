"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Shield,
  BarChart3,
  Calendar,
  Settings,
  UserPlus,
  UserMinus,
  Download,
  Mail,
  AlertTriangle,
  TrendingUp,
  Activity,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  userType: "student" | "alumni" | "admin"
  isActive: boolean
  createdAt: string
  lastLogin?: string
}

interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalStudents: number
  totalAlumni: number
  totalMentorships: number
  activeConnections: number
  monthlyGrowth: number
}

interface RecentActivity {
  id: number
  type: string
  description: string
  timestamp: string
  userId: number
  userName: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is admin
    const userType = localStorage.getItem("userType")
    if (userType !== "admin") {
      router.push("/auth/login")
      return
    }

    fetchUsers()
    fetchStats()
    fetchRecentActivity()
  }, [router])

  const fetchUsers = async () => {
    // Mock user data
    const mockUsers: User[] = [
      {
        id: 1,
        email: "student@university.edu",
        firstName: "John",
        lastName: "Student",
        userType: "student",
        isActive: true,
        createdAt: "2024-09-01T10:00:00Z",
        lastLogin: "2024-09-13T14:30:00Z",
      },
      {
        id: 2,
        email: "alumni@university.edu",
        firstName: "Sarah",
        lastName: "Alumni",
        userType: "alumni",
        isActive: true,
        createdAt: "2024-08-15T09:00:00Z",
        lastLogin: "2024-09-13T16:45:00Z",
      },
      {
        id: 3,
        email: "admin@university.edu",
        firstName: "Admin",
        lastName: "User",
        userType: "admin",
        isActive: true,
        createdAt: "2024-07-01T08:00:00Z",
        lastLogin: "2024-09-13T18:00:00Z",
      },
      {
        id: 4,
        email: "alumni2@university.edu",
        firstName: "Michael",
        lastName: "Johnson",
        userType: "alumni",
        isActive: true,
        createdAt: "2024-08-20T11:00:00Z",
        lastLogin: "2024-09-12T13:20:00Z",
      },
      {
        id: 5,
        email: "alumni3@university.edu",
        firstName: "Emily",
        lastName: "Davis",
        userType: "alumni",
        isActive: false,
        createdAt: "2024-08-25T12:00:00Z",
        lastLogin: "2024-09-10T10:15:00Z",
      },
      {
        id: 6,
        email: "student2@university.edu",
        firstName: "Alex",
        lastName: "Wilson",
        userType: "student",
        isActive: true,
        createdAt: "2024-09-05T15:00:00Z",
        lastLogin: "2024-09-13T12:00:00Z",
      },
    ]

    setUsers(mockUsers)
    setLoading(false)
  }

  const fetchStats = async () => {
    // Mock stats data
    const mockStats: SystemStats = {
      totalUsers: 6,
      activeUsers: 5,
      totalStudents: 2,
      totalAlumni: 3,
      totalMentorships: 2,
      activeConnections: 4,
      monthlyGrowth: 15.2,
    }

    setStats(mockStats)
  }

  const fetchRecentActivity = async () => {
    // Mock activity data
    const mockActivity: RecentActivity[] = [
      {
        id: 1,
        type: "mentorship_request",
        description: "New mentorship request submitted",
        timestamp: "2024-09-13T16:30:00Z",
        userId: 1,
        userName: "John Student",
      },
      {
        id: 2,
        type: "user_registration",
        description: "New student registered",
        timestamp: "2024-09-13T14:15:00Z",
        userId: 6,
        userName: "Alex Wilson",
      },
      {
        id: 3,
        type: "profile_update",
        description: "Alumni profile updated",
        timestamp: "2024-09-13T12:45:00Z",
        userId: 2,
        userName: "Sarah Alumni",
      },
      {
        id: 4,
        type: "connection_made",
        description: "New alumni-student connection",
        timestamp: "2024-09-13T10:20:00Z",
        userId: 4,
        userName: "Michael Johnson",
      },
    ]

    setRecentActivity(mockActivity)
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = userTypeFilter === "all" || user.userType === userTypeFilter

    return matchesSearch && matchesType
  })

  const toggleUserStatus = async (userId: number) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, isActive: !user.isActive } : user)))
  }

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case "student":
        return "bg-blue-100 text-blue-800"
      case "alumni":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "mentorship_request":
        return <MessageCircle className="w-4 h-4 text-blue-600" />
      case "user_registration":
        return <UserPlus className="w-4 h-4 text-green-600" />
      case "profile_update":
        return <Settings className="w-4 h-4 text-orange-600" />
      case "connection_made":
        return <Users className="w-4 h-4 text-purple-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
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
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AlumniConnect</span>
            </Link>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Admin Dashboard
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, monitor system activity, and oversee platform operations</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            {stats && (
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{stats.totalUsers}</div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <div className="flex items-center justify-center mt-2 text-xs text-green-600">
                      <TrendingUp className="w-3 h-3 mr-1" />+{stats.monthlyGrowth}% this month
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">{stats.activeUsers}</div>
                    <p className="text-sm text-gray-600">Active Users</p>
                    <div className="text-xs text-gray-500 mt-2">
                      {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">{stats.totalMentorships}</div>
                    <p className="text-sm text-gray-600">Active Mentorships</p>
                    <div className="text-xs text-gray-500 mt-2">Ongoing relationships</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-2">{stats.activeConnections}</div>
                    <p className="text-sm text-gray-600">Total Connections</p>
                    <div className="text-xs text-gray-500 mt-2">Alumni-student links</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest system events and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">
                          by {activity.userName} • {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button className="h-20 flex-col">
                    <UserPlus className="w-6 h-6 mb-2" />
                    Add New User
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Calendar className="w-6 h-6 mb-2" />
                    Create Event
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Download className="w-6 h-6 mb-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* User Management Header */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  User Management
                </CardTitle>
                <CardDescription>Manage all platform users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="alumni">Alumni</SelectItem>
                      <SelectItem value="admin">Administrators</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>

                {/* Users Table */}
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/placeholder.svg" alt={`${user.firstName} ${user.lastName}`} />
                          <AvatarFallback>
                            {user.firstName[0]}
                            {user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                            {user.lastLogin && ` • Last login ${new Date(user.lastLogin).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getUserTypeColor(user.userType)}>{user.userType}</Badge>
                        <Badge className={user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={user.isActive ? "destructive" : "default"}
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            {user.isActive ? <UserMinus className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Platform Analytics
                </CardTitle>
                <CardDescription>Detailed insights into platform usage and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">User Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Students</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-blue-500 rounded-full"
                              style={{ width: `${(stats?.totalStudents || 0 / stats?.totalUsers || 1) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{stats?.totalStudents}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Alumni</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-green-500 rounded-full"
                              style={{ width: `${(stats?.totalAlumni || 0 / stats?.totalUsers || 1) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{stats?.totalAlumni}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Engagement Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Active Users</span>
                        <span className="text-sm font-medium">
                          {Math.round(((stats?.activeUsers || 0) / (stats?.totalUsers || 1)) * 100)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Monthly Growth</span>
                        <span className="text-sm font-medium text-green-600">+{stats?.monthlyGrowth}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Mentorship Success Rate</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Event Management
                    </CardTitle>
                    <CardDescription>Create and manage alumni events and networking opportunities</CardDescription>
                  </div>
                  <Button>
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>
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
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-green-100 text-green-800">45 Registered</Badge>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
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
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-blue-100 text-blue-800">32 Registered</Badge>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  System Settings
                </CardTitle>
                <CardDescription>Configure platform settings and monitor system health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">System Health</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Database Status</span>
                        <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">API Response Time</span>
                        <span className="text-sm font-medium">125ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Uptime</span>
                        <span className="text-sm font-medium">99.9%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Security Alerts</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span>2 failed login attempts detected</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <AlertTriangle className="w-4 h-4 text-green-500" />
                        <span>All systems secure</span>
                      </div>
                    </div>
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
