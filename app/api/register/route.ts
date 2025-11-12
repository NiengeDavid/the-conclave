import { type NextRequest, NextResponse } from "next/server";
import { appendToSheet } from "@/lib/google-sheets";
import QRCode from "qrcode";

function generateRegistrationCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 12; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
    if ((i + 1) % 4 === 0 && i < 11) code += "-";
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const registrationCode = generateRegistrationCode();

    // Generate QR Code as data URI
    const qrDataUri = await QRCode.toDataURL(registrationCode, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    const registrationData = {
      timestamp: new Date().toISOString(),
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      title: body.title,
      ministry: body.ministry,
      arrivalDate: body.arrivalDate,
      departureDate: body.departureDate,
      accommodation: body.accommodation,
      feeding: body.feeding,
      registrationCode,
      status: "pending",
    };

    await appendToSheet(registrationData);

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        registrationCode,
        qrDataUri, // Include QR code in response
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { message: "Invalid registration data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to process registration. Please try again." },
      { status: 500 }
    );
  }
}
