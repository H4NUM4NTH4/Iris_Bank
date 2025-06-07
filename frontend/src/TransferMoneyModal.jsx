import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TransferMoneyModal.css";

const TransferMoneyModal = ({ onClose, onTransfer }) => {
  const [formData, setFormData] = useState({
    receiverName: "",
    upiId: "", // Replacing phone number with upiId
    amount: "",
  });
  const [showCamera, setShowCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading screen
  const [isIrisVerified, setIsIrisVerified] = useState(false); // State to track verification status
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle iris verification
  const startCamera = () => {
    setShowCamera(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => console.error("Camera access denied", error));
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    const tracks = stream ? stream.getTracks() : [];
    tracks.forEach((track) => track.stop());
    setShowCamera(false);
  };

  let counter = 1; // Start with 1, and increase with each capture

  const captureImage = () => {
    if (
      !formData.receiverName ||
      !formData.amount ||
      isNaN(formData.amount) ||
      formData.amount <= 0
    ) {
      toast.error("Please provide a valid receiver and amount.");
      return;
    }

    setIsLoading(true); // Set loading state to true
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }

    context.putImageData(imageData, 0, 0);
    const imageDataUrl = canvas.toDataURL("image/png");

    const filename = `300_1_${counter}.jpg`;
    counter++;

    // Sending the captured image
    fetch(imageDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const formDataToSend = new FormData();
        formDataToSend.append("irisImage", blob, filename);

        fetch("http://localhost:5000/api/upload-iris", {
          method: "POST",
          body: formDataToSend,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Image saved:", data);
            toast.success("Image saved successfully!");
            stopCamera();

            // After image upload, proceed with iris verification
            fetch("http://localhost:5000/api/verify-iris", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ filename }),
            })
              .then((response) => response.json())
              .then((result) => {
                setIsLoading(false);

                // Check if verification is successful
                if (result.success) {
                  // Check if the iris verification is successful and match is found
                  if (result.match) {
                    // Verification successful, template is valid
                    setIsIrisVerified(true);
                    toast.success("Iris verification successful!");

                    // After successful iris verification, trigger the transfer
                    createRazorpayOrder(); // Create payment order
                    onTransfer(formData); // Save transaction on Dashboard
                    onClose(); // Close modal after transfer
                  } else {
                    // Verification failed due to no match found
                    toast.error("Iris verification failed: No match found.");
                  }
                } else {
                  // Iris verification failed (either error or no match)
                  toast.error("Iris verification failed.");
                }
              })
              .catch((error) => {
                console.error("Verification error:", error);
                toast.error("Verification failed.");
                setIsLoading(false);
              });
          })
          .catch((error) => {
            console.error("Error saving image:", error);
            toast.error("Failed to save image.");
            setIsLoading(false);
          });
      });
  };

  // Function to create Razorpay order after successful iris verification
  // Razorpay order creation function
  const createRazorpayOrder = () => {
    fetch("http://localhost:5000/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token from localStorage
      },
      body: JSON.stringify({
        amount: formData.amount, // Amount from form data
        currency: "INR",
      }),
    })
      .then((res) => res.json())
      .then((orderData) => {
        handleRazorpayPayment(orderData.id, orderData.amount);
      })
      .catch((error) => {
        console.error("Error creating Razorpay order:", error);
        toast.error("Payment creation failed.");
      });
  };

  // Razorpay payment handler
  const handleRazorpayPayment = () => {
    const rzpLink = "https://rzp.io/rzp/ksmH3GK"; // Your Razorpay payment URL

    window.location.href = rzpLink; // Redirect to the Razorpay URL
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (
      !formData.receiverName ||
      !formData.amount ||
      isNaN(formData.amount) ||
      formData.amount <= 0
    ) {
      toast.error("Please provide valid receiver name and amount.");
      return;
    }

    // Proceed with transfer
    if (isIrisVerified) {
      onTransfer(formData); // Transfer money if iris is verified
      onClose(); // Close the modal after transfer
    } else {
      toast.error("Iris verification is required.");
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-white mx-auto"></div>
            <h2 className="text-white text-base sm:text-lg">Processing...</h2>
          </div>
        </div>
      )}

      {/* Modal Overlay with shadcn Dialog */}
      <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
        {/* Black gradient background for landing page theme */}
        <div className="absolute inset-0 -z-10">
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              opacity: 0.96,
              filter: "blur(1.5px)",
            }}
          />
        </div>
        <div className="relative w-full max-w-xs sm:max-w-md mx-auto">
          <div className="rounded-2xl shadow-2xl border border-white/10 bg-black/60 backdrop-blur-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-4 sm:mb-6 tracking-wide">
              Send Money
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-white mb-1 font-medium text-sm sm:text-base">
                  Receiver's Name
                </label>
                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg px-3 py-2 text-sm sm:px-4 sm:py-2 bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/60"
                  placeholder="Enter receiver's name"
                />
              </div>
              <div>
                <label className="block text-white mb-1 font-medium text-sm sm:text-base">UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg px-3 py-2 text-sm sm:px-4 sm:py-2 bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/60"
                  placeholder="Enter UPI ID"
                />
              </div>
              <div>
                <label className="block text-white mb-1 font-medium text-sm sm:text-base">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  min="0.01"
                  step="0.01"
                  className="w-full rounded-lg px-3 py-2 text-sm sm:px-4 sm:py-2 bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/60"
                  placeholder="Enter amount"
                />
              </div>

              {!showCamera && (
                <button
                  type="button"
                  onClick={startCamera}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition text-sm sm:text-base"
                >
                  Verify Iris for Transfer
                </button>
              )}

              {showCamera && (
                <div className="flex flex-col items-center space-y-3">
                  <video
                    ref={videoRef}
                    width="100%"
                    height="auto"
                    autoPlay
                    className="rounded-lg border border-white/20"
                  ></video>
                  <canvas
                    ref={canvasRef}
                    width="640"
                    height="480"
                    style={{ display: "none" }}
                  ></canvas>
                  <button
                    type="button"
                    onClick={captureImage}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition text-sm sm:text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? "Capturing..." : "Capture Iris"}
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition text-sm sm:text-base"
                  >
                    Stop Camera
                  </button>
                </div>
              )}

              {isIrisVerified && (
                <button
                  type="submit"
                  className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
                  disabled={isLoading}
                >
                  Confirm Transfer
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-semibold py-2 rounded-lg transition text-sm sm:text-base"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default TransferMoneyModal;
