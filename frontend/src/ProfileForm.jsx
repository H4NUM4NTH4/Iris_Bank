import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import irisBg from "./assets/iris-bg.jpg";

export default function ProfileForm({ onSubmit, initialName = "" }) {
  const [name, setName] = useState(initialName);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <div className="min-h-screen relative bg-black text-white">
      {/* Background with iris image and gradient */}
      <div className="absolute inset-0 -z-10">
        <img
          src={irisBg}
          alt="background"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95" />
      </div>

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto backdrop-blur-md bg-black/40 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-white/10">
                  <User className="h-5 w-5 text-white/80" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Edit Profile
                </h2>
              </div>
              <p className="text-sm text-gray-400">
                Update your profile information below
              </p>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-300"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/20 focus:ring-white/20"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-white/90 transition-colors"
              >
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
