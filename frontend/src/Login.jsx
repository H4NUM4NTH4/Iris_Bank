import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import irisBackground from "./assets/iris-bg.jpg";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setError("");
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        setError(data.error);
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black font-poppins px-4 py-8"
      style={{
        backgroundImage: `url(${irisBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <Card className="w-11/12 max-w-[400px] bg-black/30 backdrop-blur-sm border-gray-800/50 shadow-2xl relative z-10">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-300/90 text-sm">
            Sign in to your account to continue
          </CardDescription>
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
                className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500 text-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs sm:text-sm text-gray-300/90 hover:text-white transition"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500 text-sm"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="border-gray-600/50 data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <label
                htmlFor="remember"
                className="text-xs sm:text-sm text-gray-300/90 leading-none"
              >
                Remember me
              </label>
            </div>

            <Button
              className="w-full bg-white text-black hover:bg-gray-100 text-sm py-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="mt-4 text-center">
              <p className="text-gray-300/90 text-xs sm:text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-white hover:underline">
                  Create account
                </Link>
              </p>

              <div className="mt-4 relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-800/50"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black/30 px-2 text-gray-300/90">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent text-white border-gray-700/50 hover:bg-gray-900/50 text-sm py-2"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-4 h-4 mr-2 sm:w-5 sm:h-5"
                  alt="Google logo"
                />
                Sign in with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
