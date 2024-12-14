'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function SignUp() {
 const [step, setStep] = useState(1)
 const router = useRouter()

 const nextStep = () => setStep(step + 1)
 const prevStep = () => setStep(step - 1)

 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault()
   // Here you would typically send the form data to your backend
   // For now, we'll just redirect to the dashboard
   router.push('/dashboard')
 }

 return (
   <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden">
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8 }}
       className="bg-gray-900 p-8 rounded-lg shadow-lg z-10 w-full max-w-md"
     >
       <h2 className="text-3xl font-bold mb-6 text-center">
         Create Your <code className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">&lt;DelVe&gt;</code> Profile
       </h2>
       <form onSubmit={handleSubmit}>
         {step === 1 && (
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             transition={{ duration: 0.5 }}
           >
             <div className="space-y-4">
               <div>
                 <Label htmlFor="name">Name</Label>
                 <Input id="name" placeholder="Your name" required className="bg-gray-800 text-white" />
               </div>
               <div>
                 <Label htmlFor="email">Email</Label>
                 <Input id="email" type="email" placeholder="Your email" required className="bg-gray-800 text-white" />
               </div>
               <div>
                 <Label htmlFor="password">Password</Label>
                 <Input id="password" type="password" placeholder="Create a password" required className="bg-gray-800 text-white" />
               </div>
               <Button onClick={nextStep} className="w-full bg-blue-500 text-white hover:bg-blue-600">Next</Button>
             </div>
           </motion.div>
         )}
         {step === 2 && (
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             transition={{ duration: 0.5 }}
           >
             <div className="space-y-4">
               <div>
                 <Label htmlFor="tech-stack">Tech Stack</Label>
                 <Select name="tech-stack" required>
                   <SelectTrigger className="bg-gray-800 text-white">
                     <SelectValue placeholder="Select your primary tech stack" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="javascript">JavaScript</SelectItem>
                     <SelectItem value="python">Python</SelectItem>
                     <SelectItem value="java">Java</SelectItem>
                     <SelectItem value="csharp">C#</SelectItem>
                     <SelectItem value="other">Other</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <div>
                 <Label htmlFor="proficiency">Proficiency Level</Label>
                 <Select name="proficiency" required>
                   <SelectTrigger className="bg-gray-800 text-white">
                     <SelectValue placeholder="Select your proficiency level" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="beginner">Beginner</SelectItem>
                     <SelectItem value="intermediate">Intermediate</SelectItem>
                     <SelectItem value="advanced">Advanced</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <div>
                 <Label htmlFor="interests">Interests</Label>
                 <Textarea id="interests" placeholder="What areas of development are you interested in?" required className="bg-gray-800 text-white" />
               </div>
               <div className="flex justify-between">
                 <Button onClick={prevStep} variant="outline" className="text-white">Back</Button>
                 <Button onClick={nextStep} className="bg-blue-500 text-white hover:bg-blue-600">Next</Button>
               </div>
             </div>
           </motion.div>
         )}
         {step === 3 && (
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             transition={{ duration: 0.5 }}
           >
             <div className="space-y-4">
               <div>
                 <Label htmlFor="goals">Goals</Label>
                 <Select name="goals" required>
                   <SelectTrigger className="bg-gray-800 text-white">
                     <SelectValue placeholder="What do you want to use DelVe for?" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="projects">Building Projects</SelectItem>
                     <SelectItem value="learning">Learning New Skills</SelectItem>
                     <SelectItem value="problem-solving">Problem Solving</SelectItem>
                     <SelectItem value="code-improvement">Code Improvement</SelectItem>
                     <SelectItem value="general">General Coding Help</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <div>
                 <Label htmlFor="connect">Open to Connections</Label>
                 <Select name="connect" required>
                   <SelectTrigger className="bg-gray-800 text-white">
                     <SelectValue placeholder="Are you open to other users connecting with you?" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="yes">Yes</SelectItem>
                     <SelectItem value="no">No</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <div className="flex justify-between">
                 <Button onClick={prevStep} variant="outline" className="text-white">Back</Button>
                 <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">Create Profile</Button>
               </div>
             </div>
           </motion.div>
         )}
       </form>
     </motion.div>
   </div>
 )
}

