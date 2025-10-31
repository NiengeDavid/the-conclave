import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      fullName,
      registrationCode,
      eventDate = "Thursday 13th & Friday 14th November, 2025.",
      eventTime = "7am - 3pm(WAT)",
      breakSessions = "12:00 PM - 12:30 PM",
      qaSessions = "Special Q&A Sessions",
      venue = "The bourdellion hotel , 2nd Avenue Gwarimpa",
      qrDataUri,
    } = body;

    // Read flyer as base64
    const flyerPath = path.join(process.cwd(), "public", "flyer.jpeg");
    const flyerBuffer = fs.readFileSync(flyerPath);

    // Convert QR code data URI to buffer
    const qrBase64 = qrDataUri.replace(/^data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(qrBase64, "base64");

    const data = await resend.emails.send({
      from: "The Conclave 2.0 Team <registration@theconclave.com.ng>",
      to: email,
      subject: "CONGRATULATIONS YOU'RE REGISTERED",
      react: EmailTemplate({
        fullName,
        registrationCode,
        eventDate,
        eventTime,
        breakSessions,
        qaSessions,
        venue,
        flyerUrl: "cid:flyer",
        qrDataUri: "cid:qrcode",
      }),
      attachments: [
        {
          filename: "flyer.jpeg",
          content: flyerBuffer,
          contentId: "flyer",
        },
        {
          filename: "qrcode.png",
          content: qrBuffer,
          contentId: "qrcode", // Add QR code as attachment
        },
      ],
      replyTo: "Blessing Ingyape <executiveassistant.arometokula@gmail.com>",
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
