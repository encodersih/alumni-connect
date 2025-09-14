"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, X, Check, MessageCircle, Users, Calendar, Star } from "lucide-react"

interface Notification {
  id: number
  type: "message" | "mentorship" | "connection" | "event" | "system"
  title: string
  description: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    // Mock notifications data
    const mockNotifications: Notification[] = [
      {
        id: 1,
        type: "mentorship",
        title: "Mentorship Request Accepted",
        description: "Sarah Alumni has accepted your mentorship request",
        timestamp: "2024-09-13T16:30:00Z",
        isRead: false,
        actionUrl: "/messages",
      },
      {
        id: 2,
        type: "message",
        title: "New Message",
        description: "You have a new message from Michael Johnson",
        timestamp: "2024-09-13T14:15:00Z",
        isRead: false,
        actionUrl: "/messages",
      },
      {
        id: 3,
        type: "connection",
        title: "Connection Request",
        description: "Alex Wilson wants to connect with you",
        timestamp: "2024-09-13T12:45:00Z",
        isRead: true,
        actionUrl: "/dashboard/alumni",
      },
      {
        id: 4,
        type: "event",
        title: "Event Reminder",
        description: "Alumni Networking Night is tomorrow at 6:00 PM",
        timestamp: "2024-09-13T10:20:00Z",
        isRead: true,
        actionUrl: "/events",
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.isRead).length)
  }

  const markAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
    setUnreadCount(0)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="w-4 h-4 text-blue-600" />
      case "mentorship":
        return <Star className="w-4 h-4 text-yellow-600" />
      case "connection":
        return <Users className="w-4 h-4 text-green-600" />
      case "event":
        return <Calendar className="w-4 h-4 text-purple-600" />
      default:
        return <Bell className="w-4 h-4 text-gray-600" />
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0 rounded-full min-w-[16px] h-4">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 z-50">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button size="sm" variant="ghost" onClick={markAllAsRead}>
                      <Check className="w-4 h-4 mr-1" />
                      Mark all read
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-80">
                <div className="space-y-1">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notification.isRead ? "bg-blue-50 border-l-2 border-l-blue-500" : ""
                        }`}
                        onClick={() => {
                          markAsRead(notification.id)
                          if (notification.actionUrl) {
                            window.location.href = notification.actionUrl
                          }
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{formatTime(notification.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
