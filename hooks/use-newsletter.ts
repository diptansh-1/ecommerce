"use client";

import { useState } from "react";

export function useNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus("error");
      setMessage("Email is required");
      return;
    }
    
    try {
      setStatus("loading");
      
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }
      
      setStatus("success");
      setMessage("Successfully subscribed to newsletter!");
      setEmail("");
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        if (status === "success") {
          setStatus("idle");
          setMessage("");
        }
      }, 5000);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Failed to subscribe");
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        if (status === "error") {
          setStatus("idle");
          setMessage("");
        }
      }, 5000);
    }
  };
  
  return {
    email,
    setEmail,
    status,
    message,
    subscribe,
  };
}
