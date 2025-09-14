import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">AlumniConnect</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Registration</h1>
          <p className="text-gray-600">Contact your administrator for account access</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registration Required</CardTitle>
            <CardDescription>New accounts must be created by system administrators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Creation Restricted</h3>
              <p className="text-gray-600 text-sm mb-6">
                For security and data integrity, only authorized administrators can create new accounts. Please contact
                your institution's administrator to request access.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Email Administrator</p>
                  <p className="text-xs text-gray-600">admin@university.edu</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Call IT Support</p>
                  <p className="text-xs text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Link href="/auth/login">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Back to Login</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
