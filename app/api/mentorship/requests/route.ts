import { type NextRequest, NextResponse } from "next/server"

// Mock mentorship requests data
const mockRequests = [
  {
    id: 1,
    studentId: 1,
    mentorId: 2,
    studentName: "John Student",
    mentorName: "Sarah Alumni",
    status: "pending",
    message:
      "Hi Sarah, I would love to learn more about your journey in software engineering and get guidance on my career path.",
    category: "Career Development",
    createdAt: "2024-09-10T10:00:00Z",
  },
  {
    id: 2,
    studentId: 6,
    mentorId: 4,
    studentName: "Alex Wilson",
    mentorName: "Michael Johnson",
    status: "accepted",
    message: "Hello Michael, I am interested in product management and would appreciate your mentorship.",
    category: "Career Development",
    createdAt: "2024-09-08T14:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const userType = searchParams.get("userType")

    if (!userId || !userType) {
      return NextResponse.json({ error: "User ID and user type are required" }, { status: 400 })
    }

    let filteredRequests = mockRequests

    // Filter based on user type
    if (userType === "student") {
      filteredRequests = mockRequests.filter((req) => req.studentId === Number.parseInt(userId))
    } else if (userType === "alumni") {
      filteredRequests = mockRequests.filter((req) => req.mentorId === Number.parseInt(userId))
    }

    return NextResponse.json({ requests: filteredRequests })
  } catch (error) {
    console.error("Mentorship requests fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { studentId, mentorId, message, category } = await request.json()

    if (!studentId || !mentorId || !message || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // In a real app, save to database
    const newRequest = {
      id: mockRequests.length + 1,
      studentId,
      mentorId,
      message,
      category,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      request: newRequest,
      message: "Mentorship request sent successfully",
    })
  } catch (error) {
    console.error("Mentorship request creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { requestId, status } = await request.json()

    if (!requestId || !status) {
      return NextResponse.json({ error: "Request ID and status are required" }, { status: 400 })
    }

    // In a real app, update database
    return NextResponse.json({
      success: true,
      message: `Mentorship request ${status} successfully`,
    })
  } catch (error) {
    console.error("Mentorship request update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
