"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ConnectPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")
  const [connectionType, setConnectionType] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message || !connectionType) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      alert("Connection request sent successfully!")
      router.push("/dashboard/student")
    }, 1000)
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
              <CardTitle>Send Connection Request</CardTitle>
              <CardDescription>Introduce yourself and explain why you'd like to connect</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleConnect} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="connectionType">Connection Type</Label>
                  <Select value={connectionType} onValueChange={setConnectionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select connection type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Networking</SelectItem>
                      <SelectItem value="career-advice">Career Advice</SelectItem>
                      <SelectItem value="industry-insights">Industry Insights</SelectItem>
                      <SelectItem value="job-opportunities">Job Opportunities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Personal Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Hi [Name], I'm a current student at [University] studying [Major]. I'd love to connect with you because..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Tip: Mention specific reasons why you want to connect and what you hope to learn
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={!message || !connectionType || loading} className="flex-1">
                    {loading ? "Sending..." : "Send Connection Request"}
                    <Send className="w-4 h-4 ml-2" />
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
