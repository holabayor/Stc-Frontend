"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Baby, Calendar, Globe, Languages } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Countries and Flags
const countries = [
  { name: "United States", code: "us", dialCode: "+1" },
  { name: "United Kingdom", code: "gb", dialCode: "+44" },
  { name: "Nigeria", code: "ng", dialCode: "+234" },
  { name: "Canada", code: "ca", dialCode: "+1" },
];

/*
// Education Levels
const educationLevels: Record<string, string[]> = {
  British: ["Primary", "Secondary", "A-Level", "Undergraduate", "Postgraduate"],
  American: ["Elementary", "Middle School", "High School", "Undergraduate", "Graduate"],
  Nigerian: ["Primary 1-6", "JSS 1-3", "SSS 1-3", "Undergraduate", "Postgraduate"],
  //EYFS: ["Nursery", "Reception", "Primary", "Undergraduate"],
  Montessori: ["Toddler", "Primary", "Secondary", "Higher Education"],
};

// Grade Levels per Country
const gradeLevels: Record<string, string[]> = {
  "United States": ["Kindergarten", "Grade 1-5", "Grade 6-8", "Grade 9-12"],
  "United Kingdom": ["Reception", "Year 1-6", "Year 7-9", "Year 10-13"],
  Nigeria: ["Primary 1-6", "JSS 1-3", "SSS 1-3"],
  Canada: ["Grade 1-6", "Grade 7-9", "Grade 10-12"],
};*/

const languages = ["English", "French", "Spanish", "Mandarin", "Arabic"];

export default function ChildInfoPage() {
  const router = useRouter();
   const steps = [
    "/dashboard/child-info",
    "/dashboard/subjects",
    "/dashboard/schedule",
    "/dashboard/payment",
  ]


  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    countryCode: countries[0].dialCode, // Default
    countryOfResidence: "",
    curriculum: "",
    educationLevel: "",
    primaryLanguage: "",
    gradeLevel: "",
  });

  // Load saved form data from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = sessionStorage.getItem("childInfoFormData");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }

  }, []);
  console.log("Child Info Form Data:", formData);

  // Handle form field changes
  const handleChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("childInfoFormData", JSON.stringify(formData));
    router.push("/dashboard/subjects");
  };

  // Save form data and navigate back
  const handleBack = () => {
    if (typeof window !== "undefined" && formData) {
      sessionStorage.setItem("childInfoFormData", JSON.stringify(formData));
    }
    router.push("/dashboard"); // Navigate to the previous step
  };

    const currentStep = steps.indexOf("/dashboard/child-info") + 1
  const progress = (currentStep / steps.length) * 100


  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep} of {steps.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Baby className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Child Information</CardTitle>
            <CardDescription className="text-gray-600">
              Tell us about your child to help us find the perfect tutor
            </CardDescription>
          </CardHeader>

          <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
           <div className="space-y-2">

          <Label htmlFor="fullName">Child's Full Name</Label>
          <Input
          id="fullName"
            name="fullName"
            placeholder="Child's Full Name"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
            </div>

         {/* Gender Dropdown  */}
         <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

          <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryLanguage">Primary Teaching Language</Label>
                <div className="relative">
                  <Languages className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                  <Select
                    value={formData.primaryLanguage}
                    onValueChange={(value) => handleChange("primaryLanguage", value)}
                    required
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select primary teaching language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="countryOfResidence">Country of Residence</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                  <Select
                    value={formData.countryOfResidence}
                    onValueChange={(value) => handleChange("countryOfResidence", value)}
                    required
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select country of residence" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
         </CardContent>
        </Card>
      </div>
    </div>
  );
}