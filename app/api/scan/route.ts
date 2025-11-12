import { type NextRequest, NextResponse } from "next/server";
import { verifyAndAdmitCode } from "@/lib/scanner";

export async function POST(request: NextRequest) {
  try {
    const { registrationCode } = await request.json();

    if (!registrationCode) {
      return NextResponse.json(
        { success: false, message: "Registration code is required" },
        { status: 400 }
      );
    }

    const result = await verifyAndAdmitCode(registrationCode);

    if (!result.success) {
      return NextResponse.json(result, {
        status: result.message === "Invalid registration code" ? 404 : 400,
      });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Scan error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process scan. Please try again." },
      { status: 500 }
    );
  }
}
