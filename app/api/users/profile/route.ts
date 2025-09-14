import { type NextRequest, NextResponse } from "next/server"

// Mock profile data
const mockProfiles = {
  1: {
    // Student
    id: 1,
    userId: 1,
    studentId: "STU001",
    currentYear: 3,
    major: "Computer Science",
    expectedGraduation: 2025,
    interests: ["Web Development", "AI/ML", "Startups"],
    careerGoals: "Become a full-stack developer at a tech startup",
  },
  2: {
    // Alumni
    id: 2,
    userId: 2,
    graduationYear: 2018,
    degree: "Bachelor of Science",
    major: "Computer Science",
    currentCompany: "Google",
    currentPosition: "Senior Software Engineer",
    industry: "Technology",
    location: "San Francisco, CA",
    bio: "Passionate software engineer with 6 years of experience in full-stack development.",
    skills: ["JavaScript", "Python", "React", "Node.js"],
    isMentor: true,
    mentorCategories: ["Career Development", "Technical Skills"],
    linkedinUrl: "https://linkedin.com/in/sarah-alumni",
    availabilityStatus: "available",
  },
  3: {
    // Admin
    id: 3,
    userId: 3,
    role: "System Administrator",
    permissions: ["manage_users", "manage_events", "view_analytics"],
  },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const profile = mockProfiles[Number.parseInt(userId) as keyof typeof mockProfiles]

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const profileData = await request.json()
    const { userId } = profileData

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // In a real app, update the database
    // For demo, just return success
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
