"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  MessageCircle,
  Send,
  Search,
  Plus,
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Conversation {
  id: number
  participantId: number
  participantName: string
  participantType: "student" | "alumni" | "admin"
  participantAvatar?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
}

interface Message {
  id: number
  senderId: number
  senderName: string
  content: string
  timestamp: string
  isRead: boolean
  type: "text" | "image" | "file"
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const currentUserId = 1 // Mock current user ID
  const currentUserType = localStorage.getItem("userType") || "student"

  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id)
    }
  }, [selectedConversation])

  const fetchConversations = async () => {
    // Mock conversations data
    const mockConversations: Conversation[] = [
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
      {
        id: 3,
        participantId: 3,
        participantName: "Admin User",
        participantType: "admin",
        lastMessage: "Your mentorship request has been approved.",
        lastMessageTime: "2024-09-12T10:20:00Z",
        unreadCount: 1,
        isOnline: true,
      },
    ]

    setConversations(mockConversations)
    setLoading(false)
  }

  const fetchMessages = async (conversationId: number) => {
    // Mock messages data
    const mockMessages: Message[] = [
      {
        id: 1,
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
        senderId: 2,
        senderName: "Sarah Alumni",
        content:
          "Hi John! Great to hear from you. I'd be happy to share my experience and help guide your career journey.",
        timestamp: "2024-09-13T15:30:00Z",
        isRead: true,
        type: "text",
      },
      {
        id: 3,
        senderId: 1,
        senderName: "John Student",
        content: "That would be amazing! What advice would you give to someone just starting out?",
        timestamp: "2024-09-13T16:00:00Z",
        isRead: true,
        type: "text",
      },
      {
        id: 4,
        senderId: 2,
        senderName: "Sarah Alumni",
        content:
          "Thanks for reaching out! I'd be happy to help with your career questions. Focus on building strong fundamentals and don't be afraid to take on challenging projects.",
        timestamp: "2024-09-13T16:30:00Z",
        isRead: false,
        type: "text",
      },
    ]

    setMessages(mockMessages)
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: messages.length + 1,
      senderId: currentUserId,
      senderName: "John Student",
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
      type: "text",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: newMessage,
              lastMessageTime: new Date().toISOString(),
            }
          : conv,
      ),
    )
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case "student":
        return "bg-blue-100 text-blue-800"
      case "alumni":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/dashboard/${currentUserType}`} className="flex items-center space-x-2">
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
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Messages
                </CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>Your conversations with alumni and students</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <ScrollArea className="h-[500px]">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation?.id === conversation.id ? "bg-blue-50 border-r-2 border-r-blue-500" : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conversation.participantAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{conversation.participantName.split(" ").map((n) => n[0])}</AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 truncate">{conversation.participantName}</h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">{formatTime(conversation.lastMessageTime)}</span>
                              {conversation.unreadCount > 0 && (
                                <Badge className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                            <Badge className={getUserTypeColor(conversation.participantType)} variant="secondary">
                              {conversation.participantType}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={selectedConversation.participantAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {selectedConversation.participantName.split(" ").map((n) => n[0])}
                          </AvatarFallback>
                        </Avatar>
                        {selectedConversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedConversation.participantName}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedConversation.isOnline ? "Online" : "Last seen recently"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === currentUserId ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              message.senderId === currentUserId
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.senderId === currentUserId ? "text-blue-100" : "text-gray-500"
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <Separator />

                  {/* Message Input */}
                  <div className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <div className="flex-1">
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                      </div>
                      <Button size="sm" variant="ghost">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button size="sm" onClick={sendMessage} disabled={!newMessage.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
