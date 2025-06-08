// Iris_Bank/frontend/src/api.js

// Access the backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

if (!BACKEND_URL) {
  console.error("VITE_APP_BACKEND_URL is not defined. Please check your .env file.");
}

// Function to run the template creation script on the backend
export async function runTemplateCreation() {
  if (!BACKEND_URL) {
    throw new Error("Backend URL is not configured.");
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/run-template-creation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // If you have authentication (like JWT), you might need to add a token here:
        // "Authorization": `Bearer ${yourAuthToken}`, // e.g., localStorage.getItem('token')
      },
      body: JSON.stringify({}), // Send an empty body as the backend doesn't expect input for this endpoint
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("Template creation script response:", data);
    return data;
  } catch (error) {
    console.error("Error running template creation script:", error);
    throw error;
  }
}

// You can add other API functions here as needed

// Example of another potential API call:
/*
export async function verifyIris(imageData) {
  if (!BACKEND_URL) {
    throw new Error("Backend URL is not configured.");
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/verify-iris`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("Iris verification response:", data);
    return data;
  } catch (error) {
    console.error("Error during iris verification:", error);
    throw error;
  }
}
*/ 
