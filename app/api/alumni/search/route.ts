import { type NextRequest, NextResponse } from "next/server"

// Mock alumni data
const mockAlumni = [
  {
    id: 2,
    userId: 2,
    firstName: "Sarah",
    lastName: "Alumni",
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
    profileImageUrl: "/professional-woman-diverse.png",
    availabilityStatus: "available",
  },
  {
    id: 4,
    userId: 4,
    firstName: "Michael",
    lastName: "Johnson",
    graduationYear: 2015,
    degree: "Master of Business Administration",
    major: "Business Administration",
    currentCompany: "Microsoft",
    currentPosition: "Product Manager",
    industry: "Technology",
    location: "Seattle, WA",
    bio: "Product management expert with focus on enterprise solutions.",
    skills: ["Product Management", "Strategy", "Leadership"],
    isMentor: true,
    mentorCategories: ["Career Development", "Leadership"],
    profileImageUrl: "/professional-man.png",
    availabilityStatus: "available",
  },
  {
    id: 5,
    userId: 5,
    firstName: "Emily",
    lastName: "Davis",
    graduationYear: 2020,
    degree: "Bachelor of Arts",
    major: "Marketing",
    currentCompany: "Adobe",
    currentPosition: "Marketing Director",
    industry: "Marketing",
    location: "New York, NY",
    bio: "Creative marketing professional with expertise in digital campaigns.",
    skills: ["Digital Marketing", "Brand Strategy", "Analytics"],
    isMentor: false,
    mentorCategories: [],
    profileImageUrl: "/professional-woman-marketing.png",
    availabilityStatus: "busy",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const industry = searchParams.get("industry") || ""
    const mentorsOnly = searchParams.get("mentorsOnly") === "true"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredAlumni = mockAlumni

    // Apply filters
    if (search) {
      filteredAlumni = filteredAlumni.filter(
        (alumni) =>
          alumni.firstName.toLowerCase().includes(search.toLowerCase()) ||
          alumni.lastName.toLowerCase().includes(search.toLowerCase()) ||
          alumni.currentCompany.toLowerCase().includes(search.toLowerCase()) ||
          alumni.currentPosition.toLowerCase().includes(search.toLowerCase()) ||
          alumni.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase())),
      )
    }

    if (industry) {
      filteredAlumni = filteredAlumni.filter((alumni) => alumni.industry.toLowerCase() === industry.toLowerCase())
    }

    if (mentorsOnly) {
      filteredAlumni = filteredAlumni.filter((alumni) => alumni.isMentor)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedAlumni = filteredAlumni.slice(startIndex, endIndex)

    return NextResponse.json({
      alumni: paginatedAlumni,
      total: filteredAlumni.length,
      page,
      totalPages: Math.ceil(filteredAlumni.length / limit),
    })
  } catch (error) {
    console.error("Alumni search error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
