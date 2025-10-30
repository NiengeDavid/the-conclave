"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

type Speaker = {
  image: string;
  name: string;
  role: string;
};

interface HeroProps {
  onCtaClick: () => void
  speakers: Speaker[];
}

export default function Hero({ onCtaClick, speakers }: HeroProps) {
  return (
    <section className="gradient-bg relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Date badge */}
        <div className="glass-effect inline-flex items-center gap-2 px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-linear-to-r from-blue-400 to-pink-400 rounded-full" />
          <span className="text-sm font-medium text-muted-foreground">November 13-14 2025 | Abuja, Nigeria</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">The Conclave 2025</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          An exclusive gathering of ministry & center leaders.
        </p>

        {/* CTA Button */}
        <Button
          onClick={onCtaClick}
          size="lg"
          className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg font-semibold rounded-lg group"
        >
          Secure your seat
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Decorative card showcase */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="glass-effect p-6 text-left">
            <div className="text-3xl font-bold gradient-text mb-2">500+</div>
            <p className="text-sm text-muted-foreground">Ministry Leaders</p>
          </div>
          <div className="glass-effect p-6 text-left">
            <div className="text-3xl font-bold gradient-text mb-2">3 Days</div>
            <p className="text-sm text-muted-foreground">Intensive Sessions</p>
          </div>
          <div className="glass-effect p-6 text-left">
            <div className="text-3xl font-bold gradient-text mb-2">Abuja</div>
            <p className="text-sm text-muted-foreground">Central Location</p>
          </div>
        </div>
      </div>
    </section>
  )
}
