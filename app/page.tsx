"use client"

import { useRef } from "react"
import Hero from "@/components/hero"
import RegistrationForm from "@/components/registration-form"

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-background">
      <Hero onCtaClick={scrollToForm} />
      <div ref={formRef} className="py-16 md:py-24">
        <RegistrationForm />
      </div>
    </main>
  )
}
