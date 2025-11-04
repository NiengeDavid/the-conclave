import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  registrationCode: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  flyerUrl?: string;
  qrDataUri?: string;
}

export function EmailTemplate({
  fullName,
  registrationCode,
  eventDate,
  eventTime,
  venue,
  flyerUrl,
  qrDataUri,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2c3e50",
            fontSize: "28px",
            marginBottom: "20px",
          }}
        >
          Welcome to The Conclave 2025
        </h1>

        <p style={{ color: "#34495e", fontSize: "16px", lineHeight: "1.6" }}>
          Hi <strong>{fullName}</strong>,
        </p>

        <p style={{ color: "#34495e", fontSize: "16px", lineHeight: "1.6" }}>
          Congratulations on being selected to be a part of this exclusive
          meeting
        </p>

        <h2
          style={{
            textAlign: "center",
            color: "#3498db",
            fontSize: "24px",
            margin: "30px 0 20px 0",
          }}
        >
          The Conclave: Heart to Heart
        </h2>

        {flyerUrl && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <img
              src={flyerUrl}
              alt="Event Flyer"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </div>
        )}

        <div
          style={{
            backgroundColor: "#ecf0f1",
            padding: "20px",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        >
          <h3
            style={{
              color: "#2c3e50",
              marginTop: "0",
              fontSize: "18px",
            }}
          >
            Please take note of the following important details for the Conclave
            2025:
          </h3>
          <p style={{ margin: "10px 0", color: "#34495e" }}>
            <strong>1. Date:</strong> {eventDate}
          </p>
          <p style={{ margin: "10px 0", color: "#34495e" }}>
            <strong>2. Time:</strong> {eventTime}
          </p>
          <p style={{ margin: "10px 0", color: "#34495e" }}>
            <strong>3. Venue:</strong> {venue}
          </p>
          <h4 style={{ margin: "20px 0 10px 0", color: "#2c3e50" }}>
            4. Attendance & Punctuality
          </h4>
          <ul
            style={{ margin: "10px 0", paddingLeft: "20px", color: "#34495e" }}
          >
            <li>
              Conclave is a stretch meeting designed for deep focus and full
              engagement.
            </li>
            <li>Sessions will run continuously with short or no breaks.</li>
            <li>
              Punctuality is very important. All sessions will start promptly at
              the stated time.
            </li>
            <li>
              Please arrive early each day to complete your check-in and settle
              before sessions begin.
            </li>
          </ul>

          <h4 style={{ margin: "20px 0 10px 0", color: "#2c3e50" }}>
            5. Access & Entry
          </h4>
          <ul
            style={{ margin: "10px 0", paddingLeft: "20px", color: "#34495e" }}
          >
            <li>
              Each participant has been assigned a unique QR code and passcode.
            </li>
            <li>
              These credentials are strictly personal and non-transferable.
            </li>
            <li>
              Your QR code grants you quick entry at the venue gate—please have
              it ready upon arrival.
            </li>
          </ul>

          <h4 style={{ margin: "20px 0 10px 0", color: "#2c3e50" }}>
            6. Preparation & Mindset
          </h4>
          <ul
            style={{ margin: "10px 0", paddingLeft: "20px", color: "#34495e" }}
          >
            <li>
              Come focused, alert, and spiritually ready to receive all that God
              has for you.
            </li>
            <li>
              Plan your schedule to remain fully present throughout the
              sessions.
            </li>
          </ul>
        </div>

        <p style={{ color: "#34495e", fontSize: "16px", lineHeight: "1.6" }}>
          As stated earlier, this event is an exclusive meeting. You have been
          assigned a passcode. Please note, it admits only you and it is{" "}
          <strong>non-transferable</strong>.
        </p>

        {qrDataUri && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <p
              style={{
                margin: "0 0 10px 0",
                fontSize: "14px",
                color: "#34495e",
              }}
            >
              QR Code for Quick Entry:
            </p>
            <img
              src={qrDataUri}
              alt="QR Code"
              style={{
                maxWidth: "200px",
                height: "auto",
                margin: "0 auto",
                display: "block",
              }}
            />
          </div>
        )}

        <div
          style={{
            backgroundColor: "#e8f4f8",
            padding: "30px",
            borderRadius: "8px",
            textAlign: "center",
            margin: "30px 0",
            border: "2px dashed #3498db",
          }}
        >
          <p
            style={{
              margin: "0 0 10px 0",
              fontSize: "16px",
              color: "#34495e",
            }}
          >
            Your Assigned Passcode:
          </p>
          <p
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#e74c3c",
              margin: "10px 0",
              letterSpacing: "3px",
            }}
          >
            {registrationCode}
          </p>
        </div>

        <p
          style={{
            color: "#34495e",
            fontSize: "16px",
            lineHeight: "1.6",
            backgroundColor: "#fff3cd",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #ffc107",
          }}
        >
          ⚠️ You will be required to present this at the entrance of the venue.
          Please ensure to screenshot it and save to your phone or print this
          email out in case you don't have a smart device.
        </p>

        <p style={{ color: "#34495e", fontSize: "16px", lineHeight: "1.6" }}>
          Save this information securely. We look forward to having you at The
          Conclave.
        </p>

        <div
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <p style={{ margin: "5px 0", color: "#34495e" }}>Warm regards,</p>
          <p style={{ margin: "5px 0", color: "#34495e", fontWeight: "bold" }}>
            Blessing Ingyape
          </p>
          <p style={{ margin: "5px 0", color: "#7f8c8d", fontSize: "14px" }}>
            Executive Assistant, Rev. Arome Tokula
            <br />
            The Conclave 2.0 Team!
          </p>
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          color: "#7f8c8d",
          fontSize: "12px",
          marginTop: "20px",
        }}
      >
        🎉 We look forward to a powerful and unforgettable time together!
      </p>
    </div>
  );
}
