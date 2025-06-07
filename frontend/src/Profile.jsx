import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building,
  CreditCard,
} from "lucide-react";
import irisBg from "./assets/iris-bg.jpg";
import NavBar from "./Navbar";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to retrieve user data from localStorage
  const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    setUser(getUserFromLocalStorage());
    setLoading(false);
  }, []);

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 space-x-0 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-gray-900/50 border-gray-700/50">
      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
      <div className="flex-1">
        <p className="text-xs sm:text-sm font-medium text-gray-200">{label}</p>
        <p className="text-sm sm:text-base font-semibold text-white">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col relative bg-black font-poppins"
      style={{
        backgroundImage: `url(${irisBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <NavBar onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

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

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-8 px-4">
        <Card className="w-11/12 max-w-[400px] bg-black/30 backdrop-blur-sm border-gray-800/50 shadow-2xl relative z-10">
          <CardHeader className="space-y-1 flex flex-col items-center pb-6 sm:pb-8">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-3 sm:border-4 border-gray-700/50">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-gray-800/50 text-xl sm:text-2xl text-white">
                {user?.name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl sm:text-2xl font-semibold text-white">
              {user?.name || "User Profile"}
            </CardTitle>
            <CardDescription className="text-center text-gray-300/90 text-xs sm:text-sm">
              View and manage your profile information
            </CardDescription>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="text-center py-6 sm:py-8 text-gray-400 text-sm sm:text-base">Loading...</div>
            ) : user ? (
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <InfoItem icon={User} label="Full Name" value={user.name} />
                <InfoItem icon={Mail} label="Email" value={user.email} />
                <InfoItem icon={Phone} label="Phone" value={user.phone} />
                <InfoItem
                  icon={Calendar}
                  label="Date of Birth"
                  value={user.dob}
                />
                <InfoItem
                  icon={Building}
                  label="Bank Name"
                  value={user.bankName}
                />
                <InfoItem
                  icon={CreditCard}
                  label="IFSC Code"
                  value={user.ifscCode}
                />
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8 text-gray-400 text-sm sm:text-base">
                No user data available.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
