import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import irisBg from "./assets/iris-bg.jpg";
import { Link } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    const user = localStorage.getItem("user");
    if (!user) {
      console.error("No user found in localStorage");
      return;
    }

    const { email } = JSON.parse(user);
    localStorage.removeItem("user");

    try {
      const response = await fetch("http://localhost:5000/api/auth/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Account successfully deleted");
        navigate("/login");
      } else {
        console.error("Account deletion failed:", data.error);
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-black text-white font-poppins">
      {/* Background with iris image and gradient */}
      <div className="absolute inset-0 -z-10">
        <img
          src={irisBg}
          alt="background"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95" />
      </div>

      <Navbar onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-sm absolute top-0 left-0 w-full z-20 flex flex-col items-center py-8">
          {/* Mobile menu links - can be dynamically generated or hardcoded */}
          <Link
            to="/dashboard"
            className="text-white hover:text-gray-200 transition text-base font-normal py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="text-white hover:text-gray-200 transition text-base font-normal py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Profile
          </Link>
          {/* Add other navigation links as needed */}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 sm:py-16">
        <Card className="w-full max-w-lg mx-auto bg-black/40 backdrop-blur-md border-white/10 text-white shadow-2xl p-4 sm:p-6">
          <CardHeader className="text-center sm:text-left">
            <CardTitle className="text-xl sm:text-2xl font-bold">Settings</CardTitle>
            <CardDescription className="text-gray-400 text-sm sm:text-base">
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6">
            <div className="p-3 sm:p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-2">
                Danger Zone
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20 text-sm py-2"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-11/12 max-w-sm sm:max-w-md bg-black/95 border border-white/10 text-white p-4 sm:p-6">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-base sm:text-lg">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400 text-sm sm:text-base">
                      This action cannot be undone. This will permanently delete
                      your account and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-col-reverse sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                    <AlertDialogCancel className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 text-sm py-2">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="w-full sm:w-auto bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20 text-sm py-2"
                    >
                      {isDeleting ? "Deleting..." : "Delete Account"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
