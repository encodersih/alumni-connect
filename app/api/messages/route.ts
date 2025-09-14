import { type NextRequest, NextResponse } from "next/server"

// Mock messages data
const mockConversations = [
  {
    id: 1,
    participantId: 2,
    participantName: "Sarah Alumni",
    participantType: "alumni",
    participantAvatar: "/professional-woman-diverse.png",
    lastMessage: "Thanks for reaching out! I'd be happy to help with your career questions.",
    lastMessageTime: "2024-09-13T16:30:00Z",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: 2,
    participantId: 4,
    participantName: "Michael Johnson",
    participantType: "alumni",
    participantAvatar: "/professional-man.png",
    lastMessage: "Let's schedule a call to discuss your product management interests.",
    lastMessageTime: "2024-09-13T14:15:00Z",
    unreadCount: 0,
    isOnline: false,
  },
]

const mockMessages = [
  {
    id: 1,
    conversationId: 1,
    senderId: 1,
    senderName: "John Student",
    content:
      "Hi Sarah! I'm a computer science student interested in learning more about your career path in software engineering.",
    timestamp: "2024-09-13T15:00:00Z",
    isRead: true,
    type: "text",
  },
  {
    id: 2,
    conversationId: 1,
    senderId: 2,
    senderName: "Sarah Alumni",
    content: "Hi John! Great to hear from you. I'd be happy to share my experience and help guide your career journey.",
    timestamp: "2024-09-13T15:30:00Z",
    isRead: true,
    type: "text",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const conversationId = searchParams.get("conversationId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    if (conversationId) {
      // Return messages for specific conversation
      const messages = mockMessages.filter((msg) => msg.conversationId === Number.parseInt(conversationId))
      return NextResponse.json({ messages })
    } else {
      // Return conversations list
      return NextResponse.json({ conversations: mockConversations })
    }
  } catch (error) {
    console.error("Messages fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { conversationId, senderId, content, type = "text" } = await request.json()

    if (!conversationId || !senderId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In real app, save message to database
    const newMessage = {
      id: mockMessages.length + 1,
      conversationId,
      senderId,
      senderName: "Current User",
      content,
      timestamp: new Date().toISOString(),
      isRead: false,
      type,
    }

    return NextResponse.json({
      success: true,
      message: newMessage,
    })
  } catch (error) {
    console.error("Message send error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
