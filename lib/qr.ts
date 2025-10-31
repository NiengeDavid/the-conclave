import QRCode from "qrcode";

export async function generateQrDataUri(text: string): Promise<string> {
  // 4 = error-correction level M (medium), 8 = 8px per module, #fff/#000 colours
  return QRCode.toDataURL(text, {
    errorCorrectionLevel: "M",
    width: 200,
    margin: 2,
    color: { dark: "#000000", light: "#FFFFFF" },
  });
}
