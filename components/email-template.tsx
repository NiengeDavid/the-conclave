import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  registrationCode: string;
  eventDate: string;
  eventTime: string;
  breakSessions: string;
  qaSessions: string;
  venue: string;
  flyerUrl?: string;
}

export function EmailTemplate({
  fullName,
  registrationCode,
  eventDate,
  eventTime,
  breakSessions,
  qaSessions,
  venue,
  flyerUrl,
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
          You're Registered!
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
            Program Schedule
          </h3>
          <p style={{ margin: "10px 0", color: "#34495e" }}>
            <strong>Date:</strong> {eventDate}
          </p>
          <p style={{ margin: "10px 0", color: "#34495e" }}>
            <strong>Time:</strong> {eventTime}
          </p>
          <p style={{ margin: "10px 0", color: "#34495e" }}>
            <strong>Break Sessions:</strong> {breakSessions}
          </p>
          <p style={{ margin: "10px 0", color: "#34495e" }}>
            <strong>Q&A Sessions:</strong> {qaSessions}
          </p>
          <p style={{ margin: "10px 0", color: "#34495e" }}>
            <strong>Venue:</strong> {venue}
          </p>
        </div>

        <p style={{ color: "#34495e", fontSize: "16px", lineHeight: "1.6" }}>
          As stated earlier, this event is an exclusive meeting. You have been
          assigned a passcode. Please note, it admits only you and it is{" "}
          <strong>non-transferable</strong>.
        </p>

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
          <p style={{ margin: "5px 0", color: "#34495e" }}>Yours,</p>
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
        🎉 We look forward to seeing you there!
      </p>
    </div>
  );
}
