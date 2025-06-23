"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";

export default function DashnoardPage() {
  const router = useRouter();
  const steps = ["/dashboard/child-info", "/dashboard/subjects", "/dashboard/schedule", "/dashboard/payment"];
  const [isClient, setIsClient] = useState(false);




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (validateForm()) {
    //   sessionStorage.setItem("registerFormData", JSON.stringify(formData));
      // await handleRegister();
    // }
    router.push("/dashboard/child-info");
  };

  const handleBack = () => {
    const currentStepIndex = steps.findIndex((step) => step === window.location.pathname);
    if (currentStepIndex > 0) {
      router.push(steps[currentStepIndex - 1]);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <p className="text-2xl font-bold text-center">Welcome, great parent!</p>
        <h2 className="text-2xl font-bold text-center">Register your child</h2>
        {/* <p className="text-gray-500 text-center mb-4"></p> */}

       
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Continue
          </button>

        <div className="text-center mt-4">
          <button className="text-blue-500 hover:underline" onClick={handleBack}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}






// 'use client';

// import { useState } from 'react';
// import Countdown from '../components/Countdown';

// import {motion} from "framer-motion";

// export default function HomePage() {
//   const [showContent, setShowContent] = useState(false);

//   return (
//     <div>
//       {!showContent && <Countdown seconds={5} onComplete={() => setShowContent(true)} />}

//       {showContent && (
//         <motion.div className="flex justify-center items-center h-screen bg-[#0a1f44]"
//         initial={{ opacity:0, scale:0.9}}
//         animate={{ opacity:1, scale:1}}
//         transition={{duration:1}}>
//           <h1 className="text-white font-bold">Welcome to STC Tutors!</h1>
//         </motion.div>
//       )}
//     </div>
//   );
// }