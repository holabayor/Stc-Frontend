"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import PaystackPop from '@paystack/inline-js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CreditCard, Baby, BookOpen, Calendar, DollarSign, Check, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RegistrationData {
  parentInfo: any
  childInfo: any
  subjects: any
  schedule: any[]
  totalWeekly: number
  totalMonthly: number
}

export default function PaymentPage() {
  const router = useRouter()
  const steps = [
    "/dashboard/child-info",
    "/dashboard/subjects",
    "/dashboard/schedule",
    "/dashboard/payment",
  ]
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  useEffect(() => {
    // Compile all registration data
    const parentInfo = JSON.parse(sessionStorage.getItem("registerFormData") || "{}")
    const childInfo = JSON.parse(sessionStorage.getItem("childInfoFormData") || "{}")
    const subjects = JSON.parse(sessionStorage.getItem("childInfo") || "{}")
    const schedule = JSON.parse(sessionStorage.getItem("schedule") || "[]")

    const totalWeekly = schedule.reduce((total: number, subject: any) => total + subject.totalPrice, 0)
    const totalMonthly = totalWeekly * 4

    setRegistrationData({
      parentInfo,
      childInfo,
      subjects,
      schedule,
      totalWeekly,
      totalMonthly,
    })
  }, [])


  const handlePayment = async () => {
    setIsProcessing(true)

    const paystack = new PaystackPop()
    paystack.resumeTransaction('access_code')

    // Simulate payment processing
    // setTimeout(() => {
      // setIsProcessing(false)
      // Clear session storage
      // sessionStorage.clear()
      // Redirect to success page or dashboard
      // alert("Registration completed successfully!")
      // router.push("/dashboard/success")
    // }, 3000)
  }

  const currentStep = steps.indexOf("/dashboard/payment") + 1
  const progress = (currentStep / steps.length) * 100

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading registration data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep} of {steps.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Registration</h1>
          <p className="text-gray-600">Review your information and complete payment to get started</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Preview */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  Registration Summary
                </CardTitle>
                <CardDescription>Review all your information before payment</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="child" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="child" className="text-xs">
                      Child
                    </TabsTrigger>
                    <TabsTrigger value="subjects" className="text-xs">
                      Subjects
                    </TabsTrigger>
                    <TabsTrigger value="schedule" className="text-xs">
                      Schedule
                    </TabsTrigger>
                  </TabsList>

                
                  <TabsContent value="child" className="space-y-4 mt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Baby className="h-4 w-4 text-green-600" />
                      <h3 className="font-semibold">Child Information</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span>{registrationData.childInfo.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span>{registrationData.childInfo.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date of Birth:</span>
                        <span>{registrationData.childInfo.dateOfBirth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Country:</span>
                        <span>{registrationData.childInfo.countryOfResidence}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Language:</span>
                        <span>{registrationData.childInfo.primaryLanguage}</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="subjects" className="space-y-4 mt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                      <h3 className="font-semibold">Subject Selection</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Focus:</span>
                        <span>{registrationData.subjects.learningFocus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Curriculum:</span>
                        <span>{registrationData.subjects.curriculum}</span>
                      </div>
                      {registrationData.subjects.educationLevel && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Level:</span>
                          <span>{registrationData.subjects.educationLevel}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Grade/Exam:</span>
                        <span>{registrationData.subjects.gradeLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tutor Gender:</span>
                        <span>{registrationData.subjects.tutorGender}</span>
                      </div>
                      <div className="mt-3">
                        <span className="text-gray-600">Selected Subjects:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {registrationData.subjects.selectedSubjects?.map((subject: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {registrationData.subjects.learningGoals && (
                        <div className="mt-3">
                          <span className="text-gray-600">Learning Goals:</span>
                          <p className="text-xs mt-1 text-gray-800">{registrationData.subjects.learningGoals}</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule" className="space-y-4 mt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-orange-600" />
                      <h3 className="font-semibold">Schedule & Pricing</h3>
                    </div>
                    <div className="space-y-3">
                      {registrationData.schedule.map((subject: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm">{subject.subject}</h4>
                            <Badge variant="outline" className="text-xs">
                              {subject.days.length} days/week
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            <p>Days: {subject.days.join(", ") || "None"}</p>
                            <p>Time: {subject.time}</p>
                            <p>Duration: {subject.duration} mins</p>
                            <p className="font-medium text-gray-800">₦{subject.totalPrice.toLocaleString()}/week</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

         
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Pricing Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {registrationData.schedule.map((subject: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{subject.subject}</p>
                        <p className="text-xs text-gray-600">
                          {subject.days.length} days × {subject.duration} mins
                        </p>
                      </div>
                      <span className="font-medium">₦{subject.totalPrice.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Weekly Total:</span>
                    <span className="font-bold text-lg">₦{registrationData.totalWeekly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Monthly Estimate:</span>
                    <span>₦{registrationData.totalMonthly.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-sm text-blue-800">Payment Terms</span>
                  </div>
                  <ul className="text-xs text-blue-700 space-y-1">
                    {/* <li>• Weekly billing cycle</li> */}
                    <li>• First payment due today</li>
                    {/* <li>• Cancel anytime with 7 days notice</li> */}
                    <li>• 100% satisfaction guarantee</li>
                  </ul>
                </div>
              </CardContent>
            </Card>          
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-4 w-full max-w-md">
            <Button variant="outline" onClick={() => router.back()} className="flex-1" disabled={isProcessing}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handlePayment}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  Complete Registration
                  <Check className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
