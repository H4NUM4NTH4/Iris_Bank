import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import irisBackground from "./assets/iris-bg.jpg";

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [bankName, setBankName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [irisRegistered, setIrisRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu|org|net)$/;
  const phoneRegex = /^[0-9]{10}$/;

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) {
      return;
    }
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!irisRegistered) {
      toast.error('Please register your iris before signing up.');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address with .com, .edu, etc.');
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error('Please enter a valid 10-digit phone number. Only digits are allowed.');
      return;
    }

    try {
      setIsLoading(true);
      setIsProcessing(true);

      const pythonResponse = await fetch('http://localhost:5000/api/run-python-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const pythonData = await pythonResponse.json();

      if (pythonResponse.ok) {
        setIrisRegistered(true);

        const userData = { email, password, name, phone, dob, bankName, ifscCode };

        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
          setError('');
          localStorage.setItem('user', JSON.stringify(userData));
          navigate('/Dashboard');
        } else {
          setError(data.error);
          toast.error(data.error || 'Signup failed.');
        }
      } else {
        toast.error(pythonData.message || 'Failed to process iris image with Python script.');
      }
    } catch (error) {
      toast.error('An error occurred during signup.');
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  const handleRegisterIris = async () => {
    try {
      setIsLoading(true);

      const captureResponse = await fetch('http://localhost:5000/api/auth/capture-iris-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const captureData = await captureResponse.json();

      if (!captureResponse.ok) {
        toast.error(captureData.message || 'Failed to capture iris image.');
        return;
      }

      setIrisRegistered(true);
      toast.success('Iris registration complete!');
    } catch (error) {
      toast.error('An error occurred while processing the iris image.');
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

      <Card className="w-11/12 max-w-[500px] bg-black/30 backdrop-blur-sm border-gray-800/50 shadow-2xl relative z-10">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold text-white">Create Account</CardTitle>
          <CardDescription className="text-gray-300/90 text-sm">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500 text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-200">Phone Number</Label>
                <Input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500 text-sm"
                  placeholder="10-digit number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-gray-200">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  required
                  className="bg-gray-900/50 border-gray-700/50 text-white text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500 text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-gray-200">Bank Name</Label>
                <Input
                  id="bankName"
                  type="text"
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  required
                  className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500 text-sm"
                  placeholder="Enter bank name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ifscCode" className="text-gray-200">IFSC Code</Label>
                <Input
                  id="ifscCode"
                  type="text"
                  value={ifscCode}
                  onChange={e => setIfscCode(e.target.value)}
                  required
                  className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500 text-sm"
                  placeholder="Enter IFSC code"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500 text-sm"
                placeholder="Create a strong password"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className="border-gray-600/50 data-[state=checked]:bg-white data-[state=checked]:text-black"
                required
              />
              <label
                htmlFor="terms"
                className="text-xs sm:text-sm text-gray-300/90 leading-none"
              >
                I agree to the terms and conditions
              </label>
            </div>

            <Button
              type="button"
              onClick={handleRegisterIris}
              className={`w-full py-2 rounded-lg font-semibold transition text-sm mb-2 ${
                irisRegistered
                  ? "bg-green-600 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white"
              }`}
              disabled={isLoading || isProcessing || irisRegistered}
            >
              {irisRegistered ? 'Iris Registered ✓' : 'Register Iris'}
            </Button>

            <Button
              type="submit"
              className={`w-full py-2 rounded-lg font-semibold transition text-sm ${
                !irisRegistered || isLoading || isProcessing
                  ? "bg-gray-600 text-white cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
              disabled={!irisRegistered || isLoading || isProcessing}
            >
              {isLoading || isProcessing ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="mt-4 text-center">
              <p className="text-gray-300/90 text-xs sm:text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-white hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
