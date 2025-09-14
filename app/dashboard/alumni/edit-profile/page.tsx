"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Users, ArrowLeft, Save, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProfileData {
  firstName: string
  lastName: string
  currentCompany: string
  currentPosition: string
  industry: string
  location: string
  bio: string
  skills: string[]
  linkedinUrl: string
  websiteUrl: string
  isMentor: boolean
  mentorCategories: string[]
  availabilityStatus: string
}

export default function EditProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "Sarah",
    lastName: "Alumni",
    currentCompany: "Google",
    currentPosition: "Senior Software Engineer",
    industry: "Technology",
    location: "San Francisco, CA",
    bio: "Passionate software engineer with 6 years of experience in full-stack development.",
    skills: ["JavaScript", "Python", "React", "Node.js"],
    linkedinUrl: "https://linkedin.com/in/sarah-alumni",
    websiteUrl: "",
    isMentor: true,
    mentorCategories: ["Career Development", "Technical Skills"],
    availabilityStatus: "available",
  })

  const [newSkill, setNewSkill] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: keyof ProfileData, value: string | boolean | string[]) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const toggleMentorCategory = (category: string) => {
    setProfile((prev) => ({
      ...prev,
      mentorCategories: prev.mentorCategories.includes(category)
        ? prev.mentorCategories.filter((c) => c !== category)
        : [...prev.mentorCategories, category],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 2, ...profile }),
      })

      if (response.ok) {
        alert("Profile updated successfully!")
        router.push("/dashboard/alumni")
      } else {
        alert("Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const mentorCategoryOptions = [
    "Career Development",
    "Technical Skills",
    "Leadership",
    "Entrepreneurship",
    "Industry Insights",
    "Job Search",
    "Networking",
    "Personal Branding",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/alumni" className="flex items-center space-x-2">
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
            <p className="text-gray-600">Update your professional information and mentorship preferences</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Your personal and professional details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPosition">Current Position</Label>
                    <Input
                      id="currentPosition"
                      value={profile.currentPosition}
                      onChange={(e) => handleInputChange("currentPosition", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentCompany">Current Company</Label>
                    <Input
                      id="currentCompany"
                      value={profile.currentCompany}
                      onChange={(e) => handleInputChange("currentCompany", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={profile.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Consulting">Consulting</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="City, State/Country"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={4}
                    placeholder="Tell others about your professional journey, expertise, and interests..."
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
                <CardDescription>Add your professional skills and areas of expertise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Links</CardTitle>
                <CardDescription>Add links to your professional profiles and websites</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    value={profile.linkedinUrl}
                    onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Personal Website</Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    value={profile.websiteUrl}
                    onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Mentorship Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Settings</CardTitle>
                <CardDescription>Configure your mentorship availability and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mentor-toggle" className="text-base font-medium">
                      Available for Mentorship
                    </Label>
                    <p className="text-sm text-gray-600">Allow students to request mentorship from you</p>
                  </div>
                  <Switch
                    id="mentor-toggle"
                    checked={profile.isMentor}
                    onCheckedChange={(checked) => handleInputChange("isMentor", checked)}
                  />
                </div>

                {profile.isMentor && (
                  <>
                    <div className="space-y-2">
                      <Label>Mentorship Categories</Label>
                      <p className="text-sm text-gray-600">Select areas where you can provide mentorship</p>
                      <div className="grid md:grid-cols-2 gap-2">
                        {mentorCategoryOptions.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={category}
                              checked={profile.mentorCategories.includes(category)}
                              onChange={() => toggleMentorCategory(category)}
                              className="rounded border-gray-300"
                            />
                            <Label htmlFor={category} className="text-sm">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availabilityStatus">Availability Status</Label>
                      <Select
                        value={profile.availabilityStatus}
                        onValueChange={(value) => handleInputChange("availabilityStatus", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="busy">Busy</SelectItem>
                          <SelectItem value="unavailable">Unavailable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Saving..." : "Save Changes"}
                <Save className="w-4 h-4 ml-2" />
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
