"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Home } from "lucide-react"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    sessionStorage.clear()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 text-center">
        <CardHeader className="pb-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Registration Complete!</CardTitle>
          <CardDescription className="text-gray-600">
            Welcome to STC Tutors! Your account has been successfully created.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
            <ul className="text-sm text-green-700 space-y-1 text-left">
              <li>• We'll match you with qualified tutors</li>
              <li>• You'll receive tutor profiles within 24 hours</li>
              <li>• Schedule your first session</li>
              <li>• Start your learning journey!</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button onClick={() => router.push("/dashboard")} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push("/schedule")} className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              View Schedule
            </Button>
            {/* <Button variant="outline" onClick={() => router.push("/support")} className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Support
            </Button> */}
          </div>

          <p className="text-xs text-gray-500">
            Need help? Contact us at statcomm.tc@gmail.com or call +234 706 055 4954
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
