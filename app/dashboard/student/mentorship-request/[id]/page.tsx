"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function MentorshipRequestPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message || !category) return

    setLoading(true)

    try {
      const response = await fetch("/api/mentorship/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: 1, // Current user ID
          mentorId: Number.parseInt(params.id),
          message,
          category,
        }),
      })

      if (response.ok) {
        alert("Mentorship request sent successfully!")
        router.push("/dashboard/student")
      } else {
        alert("Failed to send mentorship request")
      }
    } catch (error) {
      console.error("Error sending mentorship request:", error)
      alert("An error occurred")
    } finally {
      setLoading(false)
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
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Request Mentorship
              </CardTitle>
              <CardDescription>
                Explain your goals and what you hope to learn from this mentorship relationship
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Mentorship Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mentorship focus area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Career Development">Career Development</SelectItem>
                      <SelectItem value="Technical Skills">Technical Skills</SelectItem>
                      <SelectItem value="Leadership">Leadership</SelectItem>
                      <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                      <SelectItem value="Industry Insights">Industry Insights</SelectItem>
                      <SelectItem value="Job Search">Job Search</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mentorship Request Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Dear [Mentor Name],

I am a [year] year student studying [major] at [University]. I am reaching out because I am very interested in [specific area/industry] and would greatly value your mentorship.

Specifically, I would like guidance on:
- [Goal 1]
- [Goal 2]
- [Goal 3]

I am committed to making the most of this mentorship opportunity and am flexible with scheduling. Thank you for considering my request.

Best regards,
[Your Name]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={12}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Be specific about your goals and what you hope to achieve through mentorship
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Tips for a successful mentorship request:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Be specific about your goals and what you want to learn</li>
                    <li>• Show that you've researched their background and career</li>
                    <li>• Demonstrate your commitment and enthusiasm</li>
                    <li>• Be respectful of their time and availability</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={!message || !category || loading} className="flex-1">
                    {loading ? "Sending Request..." : "Send Mentorship Request"}
                    <Star className="w-4 h-4 ml-2" />
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
