"use client";

import { useRef } from "react";
import Hero from "@/components/hero";
import RegistrationForm from "@/components/registration-form";
import KeynoteSection from "@/components/hero-2";

const speakersData = [
  {
    image: "/assets/Rev.jpg",
    name: "Rev. Arome Tokula",
    role: "Lead Pastor, CFM",
  },
  {
    image: "/assets/revAyeni.jpg",
    name: "Rev. Tunde Ayeni",
    role: "Lead Pastor, Graceville",
  },
];

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      <KeynoteSection onCtaClick={scrollToForm} speakers={speakersData} />
      <div ref={formRef} className="py-16 md:py-24">
        <RegistrationForm />
      </div>
    </main>
  );
}
