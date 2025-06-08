# Iris Recognition-based Banking System

## Project Overview

This project implements a secure banking system utilizing iris recognition for user authentication and transaction verification. It comprises three main components: a frontend for user interaction, a Node.js backend for API handling and database management, and a Python-based machine learning (ML) service for iris recognition.

## Features

*   **Iris Recognition Authentication:** Secure user login and transaction verification using unique iris patterns.
*   **User Management:** Registration, login, and profile management.
*   **Banking Operations:** Secure handling of deposits, withdrawals, and transfers.
*   **Integrated ML Service:** Seamless integration of iris recognition capabilities into the banking workflow.
*   **Scalable Deployment:** Designed for deployment on cloud platforms like Render and Vercel.

## Technologies Used

### Frontend
*   **React** (or similar framework, e.g., Vue/Svelte based on project structure)
*   **Vite**: Fast development build tool.
*   **Tailwind CSS**: For styling and responsive design.

### Backend
*   **Node.js**: Runtime environment.
*   **Express.js**: Web application framework.
*   **Mongoose**: MongoDB object modeling for Node.js.
*   **MongoDB Atlas**: Cloud-hosted NoSQL database.
*   **`child_process` (Node.js)**: For executing Python scripts.
*   **CORS**: Cross-Origin Resource Sharing for frontend-backend communication.
*   **JWT**: JSON Web Tokens for authentication.
*   **Razorpay**: Payment gateway integration.

### Machine Learning
*   **Python**
*   **OpenCV**: For image processing and iris feature extraction.
*   **Scikit-learn**: For machine learning models (e.g., SVM for iris classification).
*   **NumPy**: For numerical operations.
*   **SciPy**: For scientific computing.
*   **`requirements.txt`**: Manages Python dependencies.

## Project Structure

The project is organized into the following top-level directories:

*   `Iris_Bank/`: The root directory of the project.
    *   `backend/`: Contains the Node.js backend application.
        *   `routes/`: API route definitions (e.g., `auth.js`, `pythonScriptRouter.js`, `verifyIrisRoute.js`, `imageUpload.js`, `SignupageUpload.js`, `forgotPassword.js`).
        *   `models/`: Mongoose schemas for MongoDB.
        *   `server.js`: Main backend entry point.
        *   `package.json`: Node.js dependencies and scripts.
    *   `frontend/`: Contains the React (Vite) frontend application.
        *   `src/`: Source code for the frontend.
            *   `api.js`: Contains functions for interacting with the backend API.
            *   `components/`: React components.
            *   `pages/`: React pages.
        *   `.env`: Environment variables for frontend (local development).
        *   `package.json`: Node.js dependencies and scripts.
        *   `vite.config.js`: Vite configuration.
    *   `IrisRecognition_ML/`: Contains the Python-based machine learning service.
        *   `CASIA1/`: Sample iris dataset.
        *   `src/`: Core ML scripts and `requirements.txt`.
            *   `CreateTemplate_DB.py`: Script for creating iris templates.
            *   `ML_code.py`: Main ML logic for training and prediction.
            *   `extractandenconding.py`: Feature extraction logic.
            *   `requirements.txt`: Python dependencies for the ML service.
        *   `README.md`: ML service specific documentation (if any).
    *   `README.md`: This comprehensive project README.

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js** (LTS version recommended)
*   **npm** (comes with Node.js)
*   **Python 3.x** (preferably 3.9 or higher, matching Render's default)
*   **pip** (Python package installer, comes with Python)
*   **Git**

### 1. Backend Setup (Local Development)

1.  **Navigate to the backend directory:**
    ```bash
    cd Iris_Bank/backend
    ```
2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:**
    In the `Iris_Bank/backend` directory, create a file named `.env`.
    ```
    PORT=5000
    MONGODB_URI="mongodb+srv://<your_username>:<your_password>@cluster0.k3ub2pl.mongodb.net/iris_bank?retryWrites=true&w=majority&appName=Cluster0"
    FRONTEND_URL="http://localhost:5173" # Or your local frontend dev URL
    JWT_SECRET="your_jwt_secret_key" # Choose a strong, random secret
    RAZORPAY_KEY_ID="rzp_test_YOUR_KEY_ID"
    RAZORPAY_KEY_SECRET="YOUR_RAZORPAY_SECRET"
    ```
    *   **Replace `<your_username>` and `<your_password>`** with your MongoDB Atlas credentials.
    *   **Replace `your_jwt_secret_key`** with a strong, random string.
    *   **Replace Razorpay keys** with your actual test/live keys.
4.  **Install Python dependencies for ML (optional for local backend, but recommended):**
    You'll need Python installed globally or in a virtual environment that your backend can access.
    ```bash
    cd ../IrisRecognition_ML/src
    pip install -r requirements.txt
    cd ../../backend # Go back to backend directory
    ```
5.  **Start the backend server:**
    ```bash
    npm start # Or `node server.js`
    ```
    The server will run on `http://localhost:5000`.

### 2. Frontend Setup (Local Development)

1.  **Navigate to the frontend directory:**
    ```bash
    cd Iris_Bank/frontend
    ```
2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:**
    In the `Iris_Bank/frontend` directory, create a file named `.env`.
    ```
    VITE_APP_BACKEND_URL="http://localhost:5000" # Your local backend URL
    ```
4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend will typically run on `http://localhost:5173`.

### 3. Machine Learning Service (Local Usage)

The ML scripts are designed to be run from the backend using `child_process`. However, you can run them locally for testing/development:

1.  **Navigate to the ML source directory:**
    ```bash
    cd Iris_Bank/IrisRecognition_ML/src
    ```
2.  **Install dependencies (if not already done):**
    ```bash
    pip install -r requirements.txt
    ```
3.  **Run `CreateTemplate_DB.py` (e.g., to generate templates):**
    ```bash
    python CreateTemplate_DB.py
    ```
4.  **Run `ML_code.py` (e.g., for verification, requires a model):**
    *   First, train the model:
        ```bash
        python ML_code.py --train --template_dir "./templates/CASIA1/"
        ```
    *   Then, you can use it to predict/verify an image:
        ```bash
        python ML_code.py --filename "path/to/your/image.jpg" --template_dir "./templates/CASIA1/"
        ```
    *   *Note*: The `CreateTemplate_DB.py` and `ML_code.py` scripts assume certain file paths within their `src` directory. Ensure any necessary input files (like iris images) are correctly placed or referenced.

## Deployment Guide

This project is designed for deployment with the frontend on Vercel and the backend (including ML execution) on Render.

### 1. MongoDB Atlas Setup

You need a MongoDB Atlas cluster for your database.
1.  **Create an account:** [MongoDB Atlas](https://cloud.mongodb.com/)
2.  **Set up a free tier cluster.**
3.  **Configure Network Access:** Add `0.0.0.0/0` to allow access from anywhere (for Render deployment). In production, narrow this down to specific IP addresses.
4.  **Create a Database User:** Create a user with a strong password that has read and write access to your database.
5.  **Obtain Connection String:** From your cluster, click "Connect" -> "Connect your application" and copy the `mongodb+srv` connection string. Remember to replace `<password>` with the database user's password.

### 2. Render Backend Deployment

1.  **Create a New Web Service on Render:**
    *   Go to [Render Dashboard](https://dashboard.render.com/).
    *   Click "New" -> "Web Service".
    *   Connect your Git repository (`https://github.com/H4NUM4NTH4/Iris_Bank`).
    *   **Root Directory**: Set to `backend` (this tells Render to build from your backend folder).
    *   **Runtime**: Node.js
    *   **Build Command**:
        ```bash
        npm install && pip install --upgrade pip && pip install -r ../IrisRecognition_ML/src/requirements.txt
        ```
        This command installs both Node.js and Python dependencies.
    *   **Start Command**:
        ```bash
        node server.js
        ```
    *   **Environment Variables**: Go to the "Environment" tab and add the following:
        *   `MONGODB_URI`: Your full MongoDB Atlas connection string (e.g., `mongodb+srv://iris_bank_admin:YOUR_PASSWORD@cluster0.k3ub2pl.mongodb.net/iris_bank?retryWrites=true&w=majority&appName=Cluster0`).
        *   `FRONTEND_URL`: The deployed URL of your Vercel frontend (e.g., `https://your-frontend-app.vercel.app`). This is crucial for CORS.
        *   `JWT_SECRET`: A strong, random secret key for JWT.
        *   `RAZORPAY_KEY_ID`: Your Razorpay Key ID.
        *   `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret.
2.  **Deploy**: Save changes and deploy the service. Render will automatically install Python and its dependencies, allowing your Node.js backend to execute the ML scripts.

### 3. Vercel Frontend Deployment

1.  **Create a New Project on Vercel:**
    *   Go to [Vercel Dashboard](https://vercel.com/).
    *   Click "Add New..." -> "Project".
    *   Connect your Git repository (`https://github.com/H4NUM4NTH4/Iris_Bank`).
    *   **Root Directory**: Set to `frontend`.
2.  **Environment Variables**:
    *   After connecting the repository, go to "Settings" for your Vercel project, then "Environment Variables".
    *   Add a new environment variable:
        *   **Name**: `VITE_APP_BACKEND_URL`
        *   **Value**: The public URL of your deployed Render backend service (e.g., `https://your-backend-service-name.onrender.com`).
3.  **Deploy**: Vercel will automatically detect that it's a Vite project and build/deploy it.

## Usage

Once both the frontend and backend are deployed:

1.  Access your frontend application via its Vercel URL.
2.  **Iris Registration:** Use the appropriate frontend functionality (e.g., a "Register Iris" button that calls `/api/run-template-creation`) to create iris templates which will be stored on your backend.
3.  **User Authentication/Verification:** Depending on your frontend implementation, users can log in or verify their identity using iris recognition, which will utilize the ML service via the backend.
4.  **Banking Operations:** Perform deposits, withdrawals, and transfers.

## Troubleshooting

*   **`MongooseServerSelectionError` / `ENOTFOUND _mongodb._tcp.mongodb42`**:
    *   Ensure your `MONGODB_URI` in Render's environment variables is correct and matches the format `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database_name?retryWrites=true&w=majority&appName=Cluster0`.
    *   Verify MongoDB Atlas network access (IP Access List allows `0.0.0.0/0` or Render's IP range).
    *   Check your database user credentials in MongoDB Atlas.
*   **Python Script Execution Errors (on Render logs)**:
    *   Ensure the `pip install` command in your Render build command is correct and `requirements.txt` is accessible (`../IrisRecognition_ML/src/requirements.txt`).
    *   Check Python script paths in `Iris_Bank/backend/routes/pythonScriptRouter.js` are correctly using relative paths (`path.join(__dirname, '..', '..', 'IrisRecognition_ML', 'src', scriptName)`).
    *   Review `requirements.txt` for any missing or incorrect dependencies.
*   **CORS Errors (Frontend can't connect to Backend)**:
    *   Verify `FRONTEND_URL` environment variable in Render backend is set to your exact Vercel frontend URL.
    *   Ensure the `cors` middleware in `backend/server.js` is correctly configured to use `process.env.FRONTEND_URL`.
*   **ML Model Errors**: If your ML script (e.g., `ML_code.py`) requires a pre-trained model (like `image_classifier.pkl`), ensure this model file is included in your Git repository and is accessible by the Python script when running on Render. You might need to add it to your repo if it's currently only generated locally.

## Contributing

Fork the repository, create a new branch, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details (if you have one, otherwise mention "No specific license"). 
