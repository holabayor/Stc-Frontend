"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookOpen, Target, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";


function getCleanExamKey(exam: string): string {
  return exam.split(" ")[0].replace(/[^a-zA-Z0-9\-+]/g, "");
}

type CurriculumType = "Nigerian" | "British" | "American" | "Canada" | "";

type GradeSubjects = {
  [curriculum: string]: {
    [educationLevel: string]: {
      grades: string[];
      subjects: string[];
    };
  };
};

const examOptions: { [key: string]: string[] } = {
  Nigeria: ["NCEE (Primary 6)", "BECE (JSS3)", "SSCE (SS3)", "JAMB", "IJMB-Science", "IJMB-Commercial", "IJMB-Arts", "JUPEB", "NABTEB"],
  UK: ["11+", "IGCSE", "GCSE", "A-Levels"],
  USA: ["SAT", "ACT", "AP"],
  Canada: ["Provincinal Assessments", "Diploma Exams (Grade 12)","SAT", "AP/IB"]
};

const examSubjects: { [key: string]: string[] } = {
  NCEE: ["English Language", "Mathematics", "General Paper"],
  BECE: ["English Language", "Mathematics", "Basic Science", "Social Studies"],
  SSCE: ["English Language", "Mathematics", "Physics", "Biology", "Chemistry"],
  JAMB: ["English", "Mathematics", "Biology", "Physics", "Chemistry", "Government"],
  "IJMB-Science": ["Biology", "Chemistry", "Physics", "Mathematics", "Geography", "Agricultural Science", "Geology", "Technical Drawing", "Further Mathematics"],
  "IJMB-Commercial": ["Business Management", "Economics", "Accounting", "Government", "Commerce", "Geography", "Mathematics"],
  "IJMB-Arts": ["Literature-in-English", "CRS", "IRS", "History", "Government", "French", "Hausa/Igbo/Yoruba", "Arabic", "Music"],
  "11+": ["Maths", "English", "Verbal Reasoning", "Non-verbal Reasoning"],
  IGCSE: ["English", "Mathematics", "Biology", "Physics", "Chemistry"],
  GCSE: ["English Literature", "Maths", "Physics", "History"],
  "A-Levels": ["Mathematics", "Further Mathematics", "Economics", "Chemistry"],
  SAT: ["Reading", "Writing", "Math"],
  ACT: ["English", "Math", "Reading", "Science"],
  AP: ["Calculus", "Biology", "US History"],
  ProvicinalAssessments: ["Reading", "Mathematics", "Writing"],
  DiplomaExamsGrade12: ["English Language/Arts", "Mathematics (Calculus, Algebra)", "Biology", "Chemistry", "Physics", "History", "Geography"],
};

// educationData - Keep as you already wrote
const educationData: GradeSubjects = {
  Nigerian: {
    "Primary School": {
      grades: ["Basic 1", "Basic 2", "Basic 3", "Basic 4", "Basic 5", "Basic 6"],
      subjects: [
        "English Language",
        "Mathematics",
        "Social Studies",
        "Basic Science",
        "Religious Knowledge",
        "Physical and Health Education",
        "Creative Arts",
        "Agricultural Science",
        "Computer Studies",
        "French",
        "Verbal Reasoning",
        "Quantitative Reasoning",
      ],
    },
    "Junior Secondary School": {
      grades: ["JSS 1", "JSS 2", "JSS 3"],
      subjects: [
        "English Language",
        "Mathematics",
        "Basic Science and Technology",
        "Social Studies",
        "Civic Education",
        "Agricultural Science",
        "Business Studies",
        "Home Economics",
        "Physical and Health Education",
        "Religious Knowledge",
        "Computer Studies",
        "Creative Arts",
      ],
    },
    "Senior Secondary School": {
      grades: ["SS 1", "SS 2", "SS 3"],
      subjects: [
        "English Language",
        "Mathematics",
        "Civic Education",
        "Biology",
        "Chemistry",
        "Physics",
        "Agricultural Science",
        "Further Mathematics",
        "Technical Drawing",
        "Economics",
        "Government",
        "Literature in English",
        "Religious Studies",
        "Geography",
        "Commerce",
      ],
    },
  },
  British: {
    "Primary School": {
      grades: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"],
      subjects: [
        "English",
        "Mathematics",
        "Science",
        "History",
        "Geography",
        "Art and Design",
        "Physical Education",
        "Music",
        "Computing",
        "Religious Education",
      ],
    },
    "Secondary School": {
      grades: ["Year 7", "Year 8", "Year 9"],
      subjects: [
        "English",
        "Mathematics",
        "Science",
        "History",
        "Geography",
        "Modern Foreign Languages",
        "Design and Technology",
        "Religious Education",
        "Computing",
      ],
    },
  },
  American: {
    "Elementary School": {
      grades: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"],
      subjects: [
        "English Language Arts",
        "Mathematics",
        "Science",
        "Social Studies",
        "Physical Education",
        "Art and Music",
      ],
    },
    "Middle School": {
      grades: ["Grade 6", "Grade 7", "Grade 8"],
      subjects: [
        "English Language Arts",
        "Mathematics",
        "Science",
        "Social Studies",
        "Physical Education",
        "Technology",
        "Computer Science",
      ],
    },
  },
  Canada: {
    "Elementary School": {
      grades: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"],
      subjects: [
        "English Language Arts",
        "Mathematics",
        "Science",
        "Social Studies",
        "Physical Education",
        "Art and Music",
      ],
    },

    "Middle School": {
      grades: ["Grade 7", "Grade 8"],
      subjects: [
        "English Language Arts",
        "Mathematics",
        "Science",
        "Social Studies",
        "Physical Education",
        "Technology",
        "Computer Science",
      ],
    },

    "High School": {
      grades: ["Grade 7", "Grade 8"],
      subjects: [
        "English/Language Arts",
        "Mathematics",
        "Science",
        "Social Studies/History",
        "Physical Education",
        "Technology",
        "Computer Science",
        "French",
        "Business Studies",
        "Computer Science/ICT",
        "Arts",
        "Technology & Trades",
        "Psychology & Social Sciences",
        "Law & Political Science",
      ],
    },
  },
};


export default function SubjectsPage() {
  const router = useRouter();
    const steps = [
    "/dashboard/child-info",
    "/dashboard/subjects",
    "/dashboard/schedule",
    "/dashboard/payment",
  ]

  const [learningFocus, setLearningFocus] = useState("");
  const [curriculum, setCurriculum] = useState<CurriculumType>("");
  const [educationLevel, setEducationLevel] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [learningGoals, setLearningGoals] = useState("");
  const [tutorGender, setTutorGender] = useState("");
  
  useEffect(() => {
    const savedData = sessionStorage.getItem("childInfo");
    if (savedData) {
      const data = JSON.parse(savedData);
      setLearningFocus(data.learningFocus || "");
      setCurriculum(data.curriculum || "");
      setEducationLevel(data.educationLevel || "");
      setGradeLevel(data.gradeLevel || "");
      setSelectedSubjects(data.selectedSubjects || []);
      setLearningGoals(data.learningGoals || "");
      setTutorGender(data.tutorGender || "");
    }
  }, []);

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setSelectedSubjects((prev) =>
      (checked ? [...prev, subject] : prev.filter((s) => s !== subject)))
  };

  const handleSubmit = () => {
    sessionStorage.setItem(
      "childInfo",
      JSON.stringify({
        learningFocus,
        curriculum,
        educationLevel,
        gradeLevel,
        selectedSubjects,
        learningGoals,
        tutorGender,
      })
    );
    router.push("/dashboard/schedule");
  };

  const availableCurricula =
    learningFocus === "Exam Preparation"
      ? Object.keys(examOptions)
      : Object.keys(educationData);

  const gradeOptions =
    learningFocus === "Exam Preparation"
      ? examOptions[curriculum] || []
      : educationLevel && curriculum
        ? educationData[curriculum]?.[educationLevel]?.grades || []
        : [];

  const subjectOptions =
  learningFocus === "Exam Preparation"
    ? examSubjects[getCleanExamKey(gradeLevel)] || []
    : educationLevel && curriculum
      ? educationData[curriculum]?.[educationLevel]?.subjects || []
      : [];

      const currentStep = steps.indexOf("/dashboard/subjects") + 1
  const progress = (currentStep / steps.length) * 100


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Subject Selection</CardTitle>
            <CardDescription className="text-gray-600">
              Choose your learning focus and subjects for personalized tutoring
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Learning Focus */}
            <div className="space-y-2">
              <Label htmlFor="learningFocus">Learning Focus</Label>
              <div className="relative">
                <Target className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                <Select
                  value={learningFocus}
                  onValueChange={(value) => {
                    setLearningFocus(value)
                    setCurriculum("")
                    setEducationLevel("")
                    setGradeLevel("")
                    setSelectedSubjects([])
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select learning focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Exam Preparation">Exam Preparation</SelectItem>
                    <SelectItem value="Subject Tutoring">Subject Tutoring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Curriculum */}
            {learningFocus && (
              <div className="space-y-2">
                <Label htmlFor="curriculum">Curriculum/Country</Label>
                <Select
                  value={curriculum}
                  onValueChange={(value) => {
                    setCurriculum(value as CurriculumType)
                    setEducationLevel("")
                    setGradeLevel("")
                    setSelectedSubjects([])
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select curriculum/country" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCurricula.map((curr) => (
                      <SelectItem key={curr} value={curr}>
                        {curr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Education Level (only for Subject Tutoring) */}
            {learningFocus === "Subject Tutoring" && curriculum && (
              <div className="space-y-2">
                <Label htmlFor="educationLevel">Education Level</Label>
                <Select
                  value={educationLevel}
                  onValueChange={(value) => {
                    setEducationLevel(value)
                    setGradeLevel("")
                    setSelectedSubjects([])
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(educationData[curriculum]).map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Grade Level / Exam */}
            {curriculum && (
              <div className="space-y-2">
                <Label htmlFor="gradeLevel">{learningFocus === "Exam Preparation" ? "Exam" : "Grade Level"}</Label>
                <Select
                  value={gradeLevel}
                  onValueChange={(value) => {
                    setGradeLevel(value)
                    setSelectedSubjects([])
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={learningFocus === "Exam Preparation" ? "Select exam" : "Select grade level"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Subjects */}
            {gradeLevel && subjectOptions.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Select Subjects</Label>
                  <Badge variant="secondary">{selectedSubjects.length} selected</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
                  {subjectOptions.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={subject}
                        checked={selectedSubjects.includes(subject)}
                        onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                      />
                      <Label
                        htmlFor={subject}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Goals */}
            <div className="space-y-2">
              <Label htmlFor="learningGoals">Learning Goals</Label>
              <Textarea
                id="learningGoals"
                placeholder="E.g., Improve English speaking skills, prepare for university entrance exams..."
                value={learningGoals}
                onChange={(e) => setLearningGoals(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {/* Preferred Tutor Gender */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <Label className="text-base font-semibold">Preferred Tutor's Gender</Label>
              </div>
              <div className="flex flex-wrap gap-4">
                {["Male", "Female", "No preference"].map((gender) => (
                  <div key={gender} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={gender}
                      name="tutorGender"
                      value={gender}
                      checked={tutorGender === gender}
                      onChange={(e) => setTutorGender(e.target.value)}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <Label htmlFor={gender} className="text-sm font-medium cursor-pointer">
                      {gender}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/child-info")}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={selectedSubjects.length === 0}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
