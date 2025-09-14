import { type NextRequest, NextResponse } from "next/server"

// Mock user data for demo purposes
const mockUsers = {
  "student@university.edu": {
    id: 1,
    email: "student@university.edu",
    userType: "student",
    firstName: "John",
    lastName: "Student",
    password: "student123",
  },
  "alumni@university.edu": {
    id: 2,
    email: "alumni@university.edu",
    userType: "alumni",
    firstName: "Sarah",
    lastName: "Alumni",
    password: "alumni123",
  },
  "admin@university.edu": {
    id: 3,
    email: "admin@university.edu",
    userType: "admin",
    firstName: "Admin",
    lastName: "User",
    password: "admin123",
  },
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, userType } = await request.json()

    // Validate input
    if (!email || !password || !userType) {
      return NextResponse.json({ error: "Email, password, and user type are required" }, { status: 400 })
    }

    // Check if user exists and password matches
    const user = mockUsers[email as keyof typeof mockUsers]
    if (!user || user.password !== password || user.userType !== userType) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token: "mock-jwt-token", // In real app, generate actual JWT
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
