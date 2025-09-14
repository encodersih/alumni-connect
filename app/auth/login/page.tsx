"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, GraduationCap, Shield, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [userType, setUserType] = useState<string>("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userType || !email || !password) return

    setLoading(true)

    // Simulate login process
    setTimeout(() => {
      // Store user type in localStorage for demo purposes
      localStorage.setItem("userType", userType)
      localStorage.setItem("userEmail", email)

      // Redirect based on user type
      switch (userType) {
        case "student":
          router.push("/dashboard/student")
          break
        case "alumni":
          router.push("/dashboard/alumni")
          break
        case "admin":
          router.push("/dashboard/admin")
          break
        default:
          break
      }
      setLoading(false)
    }, 1000)
  }

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "student":
        return <GraduationCap className="w-5 h-5" />
      case "alumni":
        return <User className="w-5 h-5" />
      case "admin":
        return <Shield className="w-5 h-5" />
      default:
        return <Users className="w-5 h-5" />
    }
  }

  const defaultCredentials = {
    student: { email: "student@university.edu", password: "student123" },
    alumni: { email: "alumni@university.edu", password: "alumni123" },
    admin: { email: "admin@university.edu", password: "admin123" },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">AlumniConnect</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Choose your account type and enter your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType">Account Type</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>Current Student</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="alumni">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Alumni</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Administrator</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!userType || !email || !password || loading}
              >
                {loading ? "Signing in..." : "Sign In"}
                {userType && getUserTypeIcon(userType)}
              </Button>
            </form>

            {/* Demo Credentials */}
            {userType && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm text-gray-900 mb-2">Demo Credentials:</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>
                    <strong>Email:</strong> {defaultCredentials[userType as keyof typeof defaultCredentials]?.email}
                  </p>
                  <p>
                    <strong>Password:</strong>{" "}
                    {defaultCredentials[userType as keyof typeof defaultCredentials]?.password}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full bg-transparent"
                  onClick={() => {
                    const creds = defaultCredentials[userType as keyof typeof defaultCredentials]
                    if (creds) {
                      setEmail(creds.email)
                      setPassword(creds.password)
                    }
                  }}
                >
                  Use Demo Credentials
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-blue-600 hover:underline">
                  Contact Administrator
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
