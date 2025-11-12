import { google } from "googleapis";

async function getSheetClient() {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set"
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(serviceAccountKey),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

interface ScanResult {
  success: boolean;
  message: string;
  fullName?: string;
  email?: string;
}

export async function verifyAndAdmitCode(
  registrationCode: string
): Promise<ScanResult> {
  const sheets = await getSheetClient();
  const sheetId = process.env.SHEET_ID;

  if (!sheetId) {
    throw new Error("SHEET_ID environment variable is not set");
  }

  try {
    // Get all data from sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!A:L",
    });

    const rows = response.data.values || [];

    // Find row with matching registration code (column K is index 10)
    const rowIndex = rows.findIndex(
      (row, index) => index > 0 && row[10] === registrationCode
    );

    if (rowIndex === -1) {
      return {
        success: false,
        message: "Invalid registration code",
      };
    }

    // Check if already admitted (column L is index 11)
    const currentStatus = rows[rowIndex][11];
    if (currentStatus === "Admitted") {
      return {
        success: false,
        message: "This code has already been used",
        fullName: rows[rowIndex][1],
      };
    }

    // Mark as admitted
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `Sheet1!L${rowIndex + 1}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [["Admitted"]],
      },
    });

    return {
      success: true,
      message: "Successfully admitted",
      fullName: rows[rowIndex][1],
      email: rows[rowIndex][3],
    };
  } catch (error) {
    console.error("Error verifying code:", error);
    throw new Error("Failed to verify registration code");
  }
}
