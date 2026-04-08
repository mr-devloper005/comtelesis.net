"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#EFECE3] flex items-center justify-center p-8 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl border border-[#8FABD4]/40 bg-white p-8 shadow-sm"
      >
        <Link
          href="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm text-black/60 hover:text-[#4A70A9]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        {!isSubmitted ? (
          <>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Reset your password
            </h1>
            <p className="mb-8 text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-[#8FABD4]/45 focus-visible:ring-[#4A70A9]"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#4A70A9] text-white hover:bg-[#3d5f8f]" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#8FABD4]/30">
              <CheckCircle className="h-8 w-8 text-[#4A70A9]" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Check your email
            </h1>
            <p className="mb-8 text-muted-foreground">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <Button asChild variant="outline" className="w-full border-[#8FABD4]/50">
              <Link href="/login">Back to login</Link>
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">
              Didn't receive the email?{" "}
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-primary hover:underline"
              >
                Try again
              </button>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
