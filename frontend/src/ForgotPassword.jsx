import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import irisBackground from "./assets/iris-bg.jpg";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enhanced email validation (regex)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Start loading state
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link sent successfully.");
      } else {
        setMessage(data.message || "Password reset failed.");
      }
    } catch (error) {
      setMessage("Network error. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black font-poppins"
      style={{
        backgroundImage: `url(${irisBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <Card className="w-[400px] bg-black/30 backdrop-blur-sm border-gray-800/50 shadow-2xl relative z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-semibold text-white">
            Forgot Password
          </CardTitle>
          <p className="text-center text-gray-300/90 text-sm">
            Enter your email to receive a password reset link
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500"
                required
              />
            </div>

            <Button
              className="w-full bg-white text-black hover:bg-gray-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            {message && (
              <p
                className={`text-sm ${
                  message.includes("successfully")
                    ? "text-green-400"
                    : "text-red-400"
                } text-center`}
              >
                {message}
              </p>
            )}

            <div className="text-center">
              <p className="text-gray-300/90 text-sm">
                Remember your password?{" "}
                <Link to="/login" className="text-white hover:underline">
                  Back to login
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;
