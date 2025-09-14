import { type NextRequest, NextResponse } from "next/server"

// Mock admin user management data
const mockUsers = [
  {
    id: 1,
    email: "student@university.edu",
    firstName: "John",
    lastName: "Student",
    userType: "student",
    isActive: true,
    createdAt: "2024-09-01T10:00:00Z",
    lastLogin: "2024-09-13T14:30:00Z",
    profileComplete: true,
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
    profileComplete: true,
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
    profileComplete: true,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const userType = searchParams.get("userType") || "all"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredUsers = mockUsers

    // Apply filters
    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (userType !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.userType === userType)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return NextResponse.json({
      users: paginatedUsers,
      total: filteredUsers.length,
      page,
      totalPages: Math.ceil(filteredUsers.length / limit),
    })
  } catch (error) {
    console.error("Admin users fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()
    const { email, firstName, lastName, userType } = userData

    if (!email || !firstName || !lastName || !userType) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // In real app, create user in database
    const newUser = {
      id: mockUsers.length + 1,
      email,
      firstName,
      lastName,
      userType,
      isActive: true,
      createdAt: new Date().toISOString(),
      profileComplete: false,
    }

    return NextResponse.json({
      success: true,
      user: newUser,
      message: "User created successfully",
    })
  } catch (error) {
    console.error("Admin user creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, isActive } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // In real app, update user in database
    return NextResponse.json({
      success: true,
      message: `User ${isActive ? "activated" : "deactivated"} successfully`,
    })
  } catch (error) {
    console.error("Admin user update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
