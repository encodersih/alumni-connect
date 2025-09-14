import { type NextRequest, NextResponse } from "next/server"

// Mock data for mentorship matching
const mockStudents = [
  {
    id: 1,
    firstName: "John",
    lastName: "Student",
    major: "Computer Science",
    currentYear: 3,
    interests: ["Web Development", "AI/ML", "Startups"],
    careerGoals: "Become a full-stack developer at a tech startup",
    preferredMentorCategories: ["Career Development", "Technical Skills"],
  },
  {
    id: 6,
    firstName: "Alex",
    lastName: "Wilson",
    major: "Business Administration",
    currentYear: 2,
    interests: ["Entrepreneurship", "Finance", "Consulting"],
    careerGoals: "Start my own business or work in management consulting",
    preferredMentorCategories: ["Career Development", "Leadership", "Entrepreneurship"],
  },
]

const mockMentors = [
  {
    id: 2,
    userId: 2,
    firstName: "Sarah",
    lastName: "Alumni",
    currentCompany: "Google",
    currentPosition: "Senior Software Engineer",
    industry: "Technology",
    skills: ["JavaScript", "Python", "React", "Node.js"],
    mentorCategories: ["Career Development", "Technical Skills"],
    availabilityStatus: "available",
    matchScore: 0,
  },
  {
    id: 4,
    userId: 4,
    firstName: "Michael",
    lastName: "Johnson",
    currentCompany: "Microsoft",
    currentPosition: "Product Manager",
    industry: "Technology",
    skills: ["Product Management", "Strategy", "Leadership"],
    mentorCategories: ["Career Development", "Leadership"],
    availabilityStatus: "available",
    matchScore: 0,
  },
  {
    id: 5,
    userId: 5,
    firstName: "Emily",
    lastName: "Davis",
    currentCompany: "Adobe",
    currentPosition: "Marketing Director",
    industry: "Marketing",
    skills: ["Digital Marketing", "Brand Strategy", "Analytics"],
    mentorCategories: ["Career Development", "Marketing"],
    availabilityStatus: "busy",
    matchScore: 0,
  },
]

// Matching algorithm
function calculateMatchScore(student: any, mentor: any): number {
  let score = 0

  // Category match (40% weight)
  const categoryMatches = student.preferredMentorCategories.filter((cat: string) =>
    mentor.mentorCategories.includes(cat),
  ).length
  score += (categoryMatches / student.preferredMentorCategories.length) * 40

  // Interest/Skills match (30% weight)
  const interestMatches = student.interests.filter((interest: string) =>
    mentor.skills.some((skill: string) => skill.toLowerCase().includes(interest.toLowerCase())),
  ).length
  score += (interestMatches / student.interests.length) * 30

  // Industry relevance (20% weight)
  if (student.major === "Computer Science" && mentor.industry === "Technology") {
    score += 20
  } else if (student.major === "Business Administration" && mentor.industry === "Technology") {
    score += 15
  }

  // Availability bonus (10% weight)
  if (mentor.availabilityStatus === "available") {
    score += 10
  } else if (mentor.availabilityStatus === "busy") {
    score += 5
  }

  return Math.round(score)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get("studentId")
    const type = searchParams.get("type") || "recommendations"

    if (!studentId) {
      return NextResponse.json({ error: "Student ID is required" }, { status: 400 })
    }

    const student = mockStudents.find((s) => s.id === Number.parseInt(studentId))
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    if (type === "recommendations") {
      // Calculate match scores and sort by best matches
      const mentorsWithScores = mockMentors.map((mentor) => ({
        ...mentor,
        matchScore: calculateMatchScore(student, mentor),
      }))

      const sortedMentors = mentorsWithScores.sort((a, b) => b.matchScore - a.matchScore)

      return NextResponse.json({
        student,
        recommendations: sortedMentors,
        matchingCriteria: {
          categories: student.preferredMentorCategories,
          interests: student.interests,
          careerGoals: student.careerGoals,
        },
      })
    }

    if (type === "analytics") {
      // Return matching analytics
      const totalMentors = mockMentors.length
      const availableMentors = mockMentors.filter((m) => m.availabilityStatus === "available").length
      const categoryMatches = mockMentors.filter((mentor) =>
        mentor.mentorCategories.some((cat) => student.preferredMentorCategories.includes(cat)),
      ).length

      return NextResponse.json({
        analytics: {
          totalMentors,
          availableMentors,
          categoryMatches,
          matchRate: Math.round((categoryMatches / totalMentors) * 100),
        },
      })
    }

    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 })
  } catch (error) {
    console.error("Mentorship matching error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
