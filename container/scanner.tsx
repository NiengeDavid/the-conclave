"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, XCircle, Camera, AlertCircle } from "lucide-react";

// Dynamically import QR scanner to avoid SSR issues
const QrReader = dynamic(
  () => import("react-qr-reader").then((mod) => mod.QrReader),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-16 h-16 text-white animate-spin" />
      </div>
    ),
  }
);

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const processingRef = useRef(false); // Prevent duplicate scans

  useEffect(() => {
    // Request camera permission on mount
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      // Stop the stream immediately, we just needed permission
      stream.getTracks().forEach((track) => track.stop());

      setHasPermission(true);
      setScanning(true);
      setError(null);
    } catch (err: any) {
      console.error("Camera permission error:", err);
      setHasPermission(false);
      setError(err.message || "Camera access denied");
      toast.error("Camera Access Required", {
        description: "Please allow camera access to scan QR codes",
      });
    }
  };

  const handleScan = async (result: any) => {
    // Prevent duplicate processing
    if (!result || processing || processingRef.current) return;

    const scannedText = result?.text;
    if (!scannedText) return;

    // Set both state and ref to prevent race conditions
    processingRef.current = true;
    setProcessing(true);
    setScanning(false);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationCode: scannedText }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`✅ Welcome ${data.fullName}!`, {
          description: "Entry recorded successfully",
          duration: 5000,
        });

        // stop camera streams (video element id="video" from QrReader)
        const stopCamera = () => {
          try {
            const video = document.getElementById(
              "video"
            ) as HTMLVideoElement | null;
            let stream: MediaStream | null = null;

            if (video && video.srcObject instanceof MediaStream) {
              stream = video.srcObject as MediaStream;
              video.srcObject = null;
            } else {
              // fallback: find any active video element
              const vid = document.querySelector(
                "video"
              ) as HTMLVideoElement | null;
              if (vid && vid.srcObject instanceof MediaStream) {
                stream = vid.srcObject as MediaStream;
                vid.srcObject = null;
              }
            }

            if (stream) {
              stream.getTracks().forEach((t) => t.stop());
            }
          } catch (e) {
            console.warn("Failed to stop camera stream", e);
          }
        };

        stopCamera();
      } else {
        toast.error("❌ Entry Denied", {
          description: data.message,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Scan error:", error);
      toast.error("⚠️ Scan Failed", {
        description: "Please try again",
      });
    } finally {
      setProcessing(false);
      processingRef.current = false;

      // Resume scanning after 4 seconds
      setTimeout(() => {
        setScanning(true);
        setError(null);
      }, 4000);
    }
  };

  const handleError = (error: any) => {
    console.error("Scanner error:", error);

    // Only show error if we're actively scanning
    if (scanning && !processing) {
      setError(error?.message || "Camera error");
    }
  };

  const stopScanning = () => {
    setScanning(false);
    setError(null);
  };

  const startScanning = () => {
    setError(null);
    setScanning(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-purple-800 to-indigo-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-center mb-4">
          <Camera className="w-10 h-10 text-purple-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              The Conclave 2025
            </h1>
            <p className="text-gray-600">Entry Scanner</p>
          </div>
        </div>

        <div className="relative aspect-square bg-gray-900 rounded-xl overflow-hidden mb-6">
          {hasPermission === false ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
              <p className="text-white text-sm mb-4">Camera access denied</p>
              <Button
                onClick={requestCameraPermission}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Request Permission
              </Button>
            </div>
          ) : scanning && !processing && hasPermission ? (
            <QrReader
              key={scanning ? "active" : "paused"} // Force remount when state changes
              onResult={handleScan}
              constraints={{
                facingMode: { ideal: "environment" },
                width: { ideal: 1280 },
                height: { ideal: 720 },
              }}
              videoId="video"
              scanDelay={300}
              containerStyle={{ width: "100%", height: "100%" }}
              videoStyle={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              {processing ? (
                <div className="text-center">
                  <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
                  <p className="text-white text-sm">Verifying entry...</p>
                </div>
              ) : (
                <div className="text-center">
                  <XCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">Camera paused</p>
                </div>
              )}
            </div>
          )}
        </div>

        {error && scanning && !processing && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700">⚠️ {error}</p>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-gray-600 text-center font-medium">
            {processing
              ? "⏳ Verifying entry..."
              : hasPermission && scanning
                ? "📸 Position QR code within the frame"
                : hasPermission
                  ? "⏸️ Camera paused"
                  : "🔒 Camera permission required"}
          </p>

          <div className="flex gap-2">
            {scanning && !processing && hasPermission && (
              <Button
                onClick={stopScanning}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                Pause
              </Button>
            )}

            {!scanning && !processing && hasPermission && (
              <Button
                onClick={startScanning}
                className="flex-1 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                size="lg"
              >
                Resume Scanning
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Status:</span>
            <span className="flex items-center">
              {scanning && !processing && hasPermission ? (
                <>
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Active
                </>
              ) : processing ? (
                <>
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                  Processing
                </>
              ) : hasPermission === false ? (
                <>
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  No Permission
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                  Paused
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
