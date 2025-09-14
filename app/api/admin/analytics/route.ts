import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "month"

    // Mock analytics data
    const analytics = {
      overview: {
        totalUsers: 6,
        activeUsers: 5,
        totalStudents: 2,
        totalAlumni: 3,
        totalMentorships: 2,
        activeConnections: 4,
        monthlyGrowth: 15.2,
      },
      userGrowth: [
        { month: "Aug", students: 1, alumni: 2 },
        { month: "Sep", students: 2, alumni: 3 },
      ],
      engagement: {
        dailyActiveUsers: 4,
        weeklyActiveUsers: 5,
        monthlyActiveUsers: 6,
        averageSessionDuration: "12m 34s",
      },
      mentorship: {
        totalRequests: 5,
        acceptedRequests: 2,
        pendingRequests: 1,
        declinedRequests: 2,
        successRate: 40,
      },
      topIndustries: [
        { name: "Technology", count: 2 },
        { name: "Marketing", count: 1 },
        { name: "Finance", count: 0 },
      ],
      recentActivity: [
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
      ],
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Admin analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
