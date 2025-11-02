# The Conclave 2025 - Event Registration Site

A modern, pixel-perfect event registration site built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components. Features Google Sheets integration for seamless registration data management.

## Features

- ✨ Stunning gradient hero section inspired by Google I/O 2025
- 📝 Comprehensive registration form with validation
- 🔐 Secure Google Sheets API integration
- 📱 Mobile-first responsive design
- 🌙 Dark mode optimized
- ⚡ Edge-friendly serverless API
- 🎯 Type-safe with full TypeScript support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Database**: Google Sheets API
- **Emails**: Resend
- **QR Codes**: qrcode 
- **Deployment**: Vercel

## Setup Instructions

### 1. Create Google Service Account & Sheet

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Sheets API
4. Create a Service Account:
   - Go to "Service Accounts"
   - Click "Create Service Account"
   - Grant "Editor" role
   - Create a JSON key and download it
5. Create a new Google Sheet named "Conclave 2025 Registrations"
6. Add headers in row 1: `Timestamp, Full Name, Phone, Email, Title, Ministry, Arrival Date, Departure Date, Accommodation, Feeding, Registration Code`
7. Share the sheet with the service account email (found in the JSON key)

### 2. Set Environment Variables

In your Vercel project settings, add:

\`\`\`
GOOGLE_SERVICE_ACCOUNT_KEY=<paste the entire JSON key as a string>
SHEET_ID=<your Google Sheet ID from the URL>
\`\`\`

To get the Sheet ID: Open your Google Sheet, the ID is in the URL between `/d/` and `/edit`

### 3. Deploy to Vercel

\`\`\`bash
# Install dependencies
npm install

# Deploy
vercel deploy
\`\`\`

Or connect your GitHub repository to Vercel for automatic deployments.

## Environment Variables

- `GOOGLE_SERVICE_ACCOUNT_KEY`: JSON service account credentials (as string)
- `SHEET_ID`: Google Sheets spreadsheet ID

## API Endpoint

**POST** `/api/register`

Request body:
\`\`\`json
{
  "fullName": "string",
  "email": "string",
  "phone": "+234XXXXXXXXXX",
  "title": "string",
  "ministry": "string",
  "arrivalDate": "YYYY-MM-DD",
  "departureDate": "YYYY-MM-DD",
  "accommodation": "yes|no",
  "feeding": "yes|no"
}
\`\`\`

Response (201):
\`\`\`json
{
  "success": true,
  "message": "Registration successful",
  "registrationCode": "CONCLAVE-XXXXXXXXX-XXXXXXX"
}
\`\`\`

## Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
/app
  ├─ page.tsx               # Main page with hero + form
  ├─ layout.tsx             # Root layout
  ├─ globals.css            # Global styles & design tokens
  └─ api/register/route.ts  # Registration API endpoint

/components
  ├─ hero.tsx               # Hero section
  ├─ registration-form.tsx  # Registration form
  └─ ui/                    # shadcn/ui components

/lib
  ├─ google-sheets.ts       # Google Sheets integration
  ├─ validations.ts         # Zod schemas
  └─ utils.ts               # Utility functions
\`\`\`

## Notes

- All form fields are required
- Phone number must be in format: +234XXXXXXXXXX
- Dates must be valid and departure date should be after arrival date
- Registration codes are auto-generated and unique
- Responses are sent to WhatsApp (requires integration setup)

## Support

For issues or questions, please open an issue in the repository.
