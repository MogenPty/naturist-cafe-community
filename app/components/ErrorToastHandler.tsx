"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const ERROR_MESSAGES: Record<string, string> = {
  forbidden: "You do not have permission to access that resource.",
  unauthorized: "You must be logged in to access that resource.",
};

export default function ErrorToastHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    console.log("ErrorToastHandler: Checking for error param:", error);
    if (error) {
      const message = ERROR_MESSAGES[error] || decodeURIComponent(error);
      console.log("ErrorToastHandler: Showing toast:", message);
      toast.error(message, {
        duration: 5000,
        position: "bottom-right",
      });

      // Clean the URL after a short delay
      const timer = setTimeout(() => {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("error");
        window.history.replaceState({}, "", newUrl.toString());
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return null; // This component renders nothing
}
