import { google } from "googleapis"

interface RegistrationRow {
  timestamp: string
  fullName: string
  phone: string
  email: string
  title: string
  ministry: string
  arrivalDate: string
  departureDate: string
  accommodation: string
  feeding: string
  registrationCode: string
}

async function getSheetClient() {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY

  if (!serviceAccountKey) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set")
  }

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(serviceAccountKey),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })

  return google.sheets({ version: "v4", auth })
}

export async function appendToSheet(row: RegistrationRow) {
  const sheets = await getSheetClient()
  const sheetId = process.env.SHEET_ID

  if (!sheetId) {
    throw new Error("SHEET_ID environment variable is not set")
  }

  const values = [
    [
      row.timestamp,
      row.fullName,
      row.phone,
      row.email,
      row.title,
      row.ministry,
      row.arrivalDate,
      row.departureDate,
      row.accommodation,
      row.feeding,
      row.registrationCode,
    ],
  ]

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:K",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })
  } catch (error) {
    console.error("Error appending to sheet:", error)
    throw new Error("Failed to save registration to database")
  }
}
