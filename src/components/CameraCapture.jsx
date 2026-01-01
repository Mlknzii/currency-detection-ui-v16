"use client";

import { useRef, useState, useEffect } from "react";
import { IoCameraOutline } from "react-icons/io5";

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  /* ───────── Open camera ───────── */
  const openCamera = async () => {
    setError("");

    setOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
    } catch {
      setError("Camera not available");
    }
  };

  /* ───────── Close camera ───────── */
  const closeCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setOpen(false);
  };

  /* ───────── Capture image ───────── */
  const capture = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) onCapture(blob);
    }, "image/jpeg");

    closeCamera();
  };

  /* ───────── Cleanup on unmount ───────── */
  useEffect(() => {
    return () => closeCamera();
  }, []);

  return (
    <>
      {/* Open Camera Button */}
      <button
        type="button"
        onClick={openCamera}
        className="w-full cursor-pointer rounded bg-indigo-600 py-2 text-white grid place-items-center"
      >
        <IoCameraOutline size={50} />
      </button>

      {error && <p className="mt-2 text-center text-red-500">{error}</p>}

      {/* ───────── Popup ───────── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-xl bg-gray-900 p-4 text-white shadow-xl">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg bg-black"
            />

            <p className="mt-2 text-center text-sm text-gray-400">
              قم بوضع العملة داخل الأطار مع اضاءة جيدة
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={capture}
                className="flex-1 rounded bg-green-600 py-2"
              >
                Capture
              </button>

              <button
                type="button"
                onClick={closeCamera}
                className="flex-1 rounded bg-gray-600 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
