import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { Link, useNavigate } from "react-router-dom";
import irisBackground from "./assets/iris-bg.jpg";
import { Button } from "./components/ui/button";

import "@fontsource/poppins/300.css"; // Light
import "@fontsource/poppins/400.css"; // Regular
import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/600.css"; // Semi-bold
import "@fontsource/poppins/700.css"; // Bold

const HowItWorks = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col relative bg-black font-poppins"
      style={{
        backgroundImage: `url(${irisBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Centered Navbar with adjusted spacing */}
      <nav className="flex items-center justify-between max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 z-10 font-poppins">
        {/* Logo Section - Centered */}
        <div className="flex items-center gap-2">
          <span className="text-white text-lg sm:text-xl flex items-center gap-2 font-medium">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 sm:w-5 sm:h-5"
              stroke="currentColor"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            irisBank
          </span>
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links - Hidden on Mobile, visible on Medium screens and up */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className="text-white hover:text-gray-200 transition text-sm font-normal"
          >
            Home
          </Link>
          <Link
            to="/service"
            className="text-gray-400 hover:text-white transition text-sm"
          >
            Service
          </Link>
          <Link
            to="/contact"
            className="text-gray-400 hover:text-white transition text-sm"
          >
            Contact us
          </Link>
        </div>

        {/* Auth Buttons - Updated with navigation */}
        <div className="hidden md:flex items-center bg-white rounded-full">
          <Button
            variant="ghost"
            className="text-black hover:text-gray-700 px-4 py-2 text-sm rounded-l-full font-medium"
            onClick={() => navigate("/login")}
          >
            Sign in
          </Button>
          <div className="w-px h-5 bg-gray-200" />
          <Button
            variant="ghost"
            className="text-black hover:text-gray-700 px-4 py-2 text-sm rounded-r-full"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-sm absolute top-0 left-0 w-full z-20 flex flex-col items-center py-8">
          <Link
            to="/"
            className="text-white hover:text-gray-200 transition text-base font-normal py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/service"
            className="text-gray-400 hover:text-white transition text-base py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Service
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-200 transition text-base font-normal py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact us
          </Link>
          <div className="flex flex-col gap-4 mt-6">
            <Button
              className="bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 w-48"
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
            >
              Sign in
            </Button>
            <Button
              variant="outline"
              className="bg-black border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-black w-48"
              onClick={() => {
                navigate("/signup");
                setIsMobileMenuOpen(false);
              }}
            >
              Sign up
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8 sm:mb-12">How the Iris Recognition System Works</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
            <Card className="bg-white bg-opacity-10 text-white border-white border-opacity-20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl">Overview</CardTitle>
                <CardDescription className="text-gray-200 text-sm sm:text-base">A high-level understanding of the system architecture.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base sm:text-lg leading-relaxed text-left">
                  Our biometric system for iris recognition is built upon a modular architecture, integrating a robust machine learning backend with a user-friendly web interface. The system processes eye images, extracts unique iris features, and compares them against a database for identification or verification.
                </p>
                <p className="text-base sm:text-lg leading-relaxed mt-4 text-left">
                  The core of the system lies in its advanced image processing and pattern recognition algorithms, ensuring high accuracy and security for various applications, particularly secure transactions.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white bg-opacity-10 text-white border-white border-opacity-20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl">System Components</CardTitle>
                <CardDescription className="text-gray-200 text-sm sm:text-base">The main layers that make up our solution.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed text-left">
                  <li><strong>IrisRecognition_ML:</strong> The Python-based machine learning core for iris feature extraction and matching.</li>
                  <li><strong>Backend:</strong> A Node.js/Express API that handles frontend requests, communicates with the ML component, and manages data.</li>
                  <li><strong>Frontend:</strong> A React-based web application providing the user interface.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 sm:mb-8">Detailed Working Process</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-white border-opacity-20 shadow-lg mb-4">
              <AccordionTrigger className="text-white hover:text-gray-200 text-base sm:text-lg">1. Image Acquisition & Preprocessing</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white bg-opacity-10 text-white border-white border-opacity-20">
                  <CardContent className="pt-4 sm:pt-6">
                    <p className="text-base sm:text-lg leading-relaxed text-left">
                      The process begins with capturing an image of the eye. This raw image then undergoes initial preprocessing to prepare it for feature extraction. This may involve steps like resizing, converting to grayscale, and basic noise reduction.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed mt-2 text-left">
                      *Our system uses the CASIA1 dataset for training and verification.*
                    </p>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-white border-opacity-20 shadow-lg mb-4">
              <AccordionTrigger className="text-white hover:text-gray-200 text-base sm:text-lg">2. Iris and Pupil Localization</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white bg-opacity-10 text-white border-white border-opacity-20">
                  <CardContent className="pt-4 sm:pt-6">
                    <p className="text-base sm:text-lg leading-relaxed text-left">
                      Accurate localization of the iris and pupil boundaries is crucial. We employ a combination of established computer vision techniques:
                    </p>
                    <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed mt-2 text-left">
                      <li>
                        <strong>Daugman's Integro-differential Operator:</strong> This operator searches for circular paths with maximum pixel intensity changes to precisely locate the iris and pupil boundaries, as well as eyelid arcs.
                      </li>
                      <li>
                        <strong>Hough Transform:</strong> Used to further refine the detection of circular shapes (pupil and iris) within the eye image.
                      </li>
                    </ul>
                    <p className="text-base sm:text-lg leading-relaxed mt-2 text-left">
                      *This step isolates the relevant iris region, removing unwanted parts like the sclera and eyelashes.* 
                    </p>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-white border-opacity-20 shadow-lg mb-4">
              <AccordionTrigger className="text-white hover:text-gray-200 text-base sm:text-lg">3. Iris Normalization</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white bg-opacity-10 text-white border-white border-opacity-20">
                  <CardContent className="pt-4 sm:pt-6">
                    <p className="text-base sm:text-lg leading-relaxed text-left">
                      To enable accurate comparison between different iris images, the extracted iris region must be normalized. This involves transforming the circular iris into a rectangular block with fixed dimensions, compensating for variations in pupil dilation, camera distance, and iris rotation.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed mt-2 text-left">
                      *We utilize the <strong>Wildes method with registers</strong> for this normalization, which deforms and aligns the iris region consistently.*
                    </p>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-white border-opacity-20 shadow-lg mb-4">
              <AccordionTrigger className="text-white hover:text-gray-200 text-base sm:text-lg">4. Feature Encoding</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white bg-opacity-10 text-white border-white border-opacity-20">
                  <CardContent className="pt-4 sm:pt-6">
                    <p className="text-base sm:text-lg leading-relaxed text-left">
                      Once normalized, the iris image is subjected to feature extraction to create a unique biometric template. This involves applying filters to capture the intricate patterns of the iris.
                    </p>
                    <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed mt-2 text-left">
                      <li>
                        <strong>Log Gabor Filters:</strong> These filters are applied to the normalized iris image to extract discriminative features. The output is a highly unique "iris code" – a compact, binary representation of the iris pattern.
                      </li>
                    </ul>
                    <p className="text-base sm:text-lg leading-relaxed mt-2 text-left">
                      *The template also includes a <strong>noise mask</strong> to identify and ignore corrupted areas due to eyelids or eyelashes.*
                    </p>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-white border-opacity-20 shadow-lg mb-4">
              <AccordionTrigger className="text-white hover:text-gray-200 text-base sm:text-lg">5. Template Matching & Verification</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white bg-opacity-10 text-white border-white border-opacity-20">
                  <CardContent className="pt-4 sm:pt-6">
                    <p className="text-base sm:text-lg leading-relaxed text-left">
                      The final step involves comparing the generated iris code with existing templates in a database. This comparison determines if the iris belongs to a registered individual.
                    </p>
                    <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed mt-2 text-left">
                      <li>
                        <strong>Hamming Distance:</strong> This metric is used to quantify the dissimilarity between two iris codes. A lower Hamming distance indicates a higher similarity. Our system also accounts for rotational inconsistencies by performing bit-wise shifts and calculating multiple Hamming distances.
                      </li>
                    </ul>
                    <p className="text-base sm:text-lg leading-relaxed mt-2 text-left">
                      *Multiprocessing is employed to accelerate the matching process, especially for large databases.* 
                    </p>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {/* Footer */}
      <footer className="absolute bottom-2 w-full text-center text-gray-400 text-xs sm:text-sm z-10 px-4">
        © 2025 irisBank. All rights reserved.
      </footer>

      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black opacity-70 pointer-events-none z-0"></div>
    </div>
  );
};

export default HowItWorks; 