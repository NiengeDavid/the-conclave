import { type NextRequest, NextResponse } from "next/server"
import { appendToSheet } from "@/lib/google-sheets"
import { registrationSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validatedData = registrationSchema.parse(body)

    // Generate unique registration code
    const registrationCode = `CONCLAVE-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    // Append to Google Sheets
    await appendToSheet({
      timestamp: new Date().toISOString(),
      fullName: validatedData.fullName,
      phone: validatedData.phone,
      email: validatedData.email,
      title: validatedData.title,
      ministry: validatedData.ministry,
      arrivalDate: validatedData.arrivalDate,
      departureDate: validatedData.departureDate,
      accommodation: validatedData.accommodation,
      feeding: validatedData.feeding,
      registrationCode,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        registrationCode,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)

    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json({ message: "Invalid registration data" }, { status: 400 })
    }

    return NextResponse.json({ message: "Failed to process registration. Please try again." }, { status: 500 })
  }
}
