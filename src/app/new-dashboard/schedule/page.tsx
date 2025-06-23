"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Clock, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SubjectSchedule {
  subject: string;
  days: string[];
  time: string;
  duration: number;
  totalPrice: number;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const durationOptions = [
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1 hr 30 mins" },
  { value: 120, label: "2 hours" }
];
const timeOptions = [
  "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm"
];

export default function SchedulingPage() {
  const router = useRouter();
    const steps = [
    "/dashboard/child-info",
    "/dashboard/subjects",
    "/dashboard/schedule",
    "/dashboard/payment",
  ]

  const [subjects, setSubjects] = useState<SubjectSchedule[]>(() => {
    // Initialize state from sessionStorage if available
    const savedSchedule = sessionStorage.getItem("schedule");
    return savedSchedule && savedSchedule !== "[]" ? JSON.parse(savedSchedule) : [];
  });

  useEffect(() => {
    // Initialize subjects from childInfo only if no valid schedule exists in sessionStorage
    const savedSchedule = sessionStorage.getItem("schedule");
    if (!savedSchedule || savedSchedule === "[]") {
      const savedData = sessionStorage.getItem("childInfo");
      if (savedData) {
        const { selectedSubjects } = JSON.parse(savedData);
        if (selectedSubjects && selectedSubjects.length > 0) {
          const initialSubjects = selectedSubjects.map((subject: string) => ({
            subject,
            days: [],
            time: "8:00am",
            duration: 60,
            totalPrice: 0
          }));
          setSubjects(initialSubjects);
        }
      }
    }
  }, []);

  useEffect(() => {
    // Save to sessionStorage only if subjects is non-empty
    if (subjects.length > 0) {
      sessionStorage.setItem("schedule", JSON.stringify(subjects));
    } else {
      // Clear schedule from sessionStorage if subjects is empty
      sessionStorage.removeItem("schedule");
    }
  }, [subjects]);

  const calculateSubjectPrice = (days: string[], duration: number) => {
    const ratePerHour = 1000;
    const hoursPerDay = duration / 60;
    const totalHours = days.length * hoursPerDay;
    return totalHours * ratePerHour;
  };

  const handleDayChange = (subjectIndex: number, day: string, checked: boolean) => {
    setSubjects(prevSubjects =>
      prevSubjects.map((subject, idx) => {
        if (idx === subjectIndex) {
          const newDays = checked ?
          [...subject.days, day]
            : subject.days.filter(d => d !== day)
          return { 
            ...subject, 
            days: newDays,
            totalPrice: calculateSubjectPrice(newDays, subject.duration)
          };
        }
        return subject;
      })
    );
  };

  const handleTimeChange = (subjectIndex: number, time: string) => {
    setSubjects(prev => {
      const updated = [...prev];
      updated[subjectIndex].time = time;
      return updated;
    });
  };

  const handleDurationChange = (subjectIndex: number, duration: number) => {
    setSubjects(prev => {
      const updated = [...prev];
      updated[subjectIndex].duration = duration;
      updated[subjectIndex].totalPrice = calculateSubjectPrice(updated[subjectIndex].days, duration);
      return updated;
    });
  };

  const handleSubmit = () => {
    const data = {
      childInfo: JSON.parse(sessionStorage.getItem("childInfo") || "{}"),
      learningInfo: JSON.parse(sessionStorage.getItem("childInfoFormData") || "{}"),
      schedule: subjects,
      totalBill: calculateTotal(),
      totalMonthly: calculateTotal() * 4
    };
    console.log("Final Data:", data);
    router.push("/dashboard/payment");
  };

  const calculateTotal = () => {
    return subjects.reduce((total, subject) => total + subject.totalPrice, 0);
  };

const totalWeekly = calculateTotal()
  const totalMonthly = totalWeekly * 4
  const currentStep = steps.indexOf("/dashboard/schedule") + 1
  const progress = (currentStep / steps.length) * 100

  if (subjects.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle>No Subjects Selected</CardTitle>
            <CardDescription>Please go back and select subjects first.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.back()} className="w-full">
              Go Back to Select Subjects
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

 return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
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
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Your Subjects</h1>
          <p className="text-gray-600">Set up your preferred days, times, and duration for each subject</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Schedule Configuration */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Subject Schedule
                </CardTitle>
                <CardDescription>Configure your tutoring schedule for each subject</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {subjects.map((subject, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold text-lg mb-4 text-gray-900">{subject.subject}</h3>

                    {/* Days Selection */}
                    <div className="space-y-3 mb-4">
                      <Label className="text-sm font-medium">Days of the week</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {daysOfWeek.map((day) => (
                          <div key={day} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${index}-${day}`}
                              checked={subject.days.includes(day)}
                              onCheckedChange={(checked) => handleDayChange(index, day, checked as boolean)}
                            />
                            <Label htmlFor={`${index}-${day}`} className="text-sm cursor-pointer">
                              {day.slice(0, 3)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Time Selection */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Time</Label>
                        <Select value={subject.time} onValueChange={(value) => handleTimeChange(index, value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Duration Selection */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Duration</Label>
                        <Select
                          value={subject.duration.toString()}
                          onValueChange={(value) => handleDurationChange(index, Number(value))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {durationOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value.toString()}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Subject Summary */}
                    <div className="mt-4 p-3 bg-white rounded border">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">
                            {subject.days.length > 0 ? `${subject.days.length} days/week` : "No days selected"} •{" "}
                            {subject.duration} mins/session
                          </p>
                          <p className="text-sm font-medium">Weekly: ₦{subject.totalPrice.toLocaleString()}</p>
                        </div>
                        <Badge variant={subject.days.length > 0 ? "default" : "secondary"}>
                          {subject.days.length > 0 ? "Scheduled" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Schedule Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Schedule Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{subject.subject}</h4>
                      <Badge variant="outline" className="text-xs">
                        {subject.days.length} days
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>Days: {subject.days.join(", ") || "None selected"}</p>
                      <p>Time: {subject.time}</p>
                      <p>Duration: {subject.duration} mins</p>
                    </div>
                    <div className="text-sm font-medium">₦{subject.totalPrice.toLocaleString()}/week</div>
                    {index < subjects.length - 1 && <Separator className="my-3" />}
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Weekly Total:</span>
                    <span className="font-bold text-lg">₦{totalWeekly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Est. Monthly:</span>
                    <span>₦{totalMonthly.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-4">* Prices are calculated at ₦1,000 per hour</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-4 w-full max-w-md">
            <Button variant="outline" onClick={() => router.back()} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              disabled={subjects.every((s) => s.days.length === 0)}
            >
              Continue to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}