const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const router = express.Router();

// Endpoint for iris verification
router.post('/verify-iris', (req, res) => {
  const { filename } = req.body;

  // Correct template directory path
  const templateDir = 'C:/Users/HP/Desktop/AIML/FYP/MAJOR_PROJECT/IrisRecognition_ML/src/templates/CASIA1';
  const filePath = path.join('C:/Users/HP/Desktop/AIML/FYP/MAJOR_PROJECT/IrisRecognition_ML/src', filename); // Path to the image file to verify

  console.log(`Starting verification for file: ${filePath}`);

  // Command to run the Python script
  const command = `python ""C:/Users/HP/Desktop/AIML/FYP/MAJOR_PROJECT/IrisRecognition_ML/src/verifyDB_casia1.py"" --template_dir "${templateDir}" --mode verify --filename "${filePath}"`;



  // Execute the Python script
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      // Attempt to delete the file even if verification fails
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error(`Error deleting file after failure: ${unlinkErr}`);
          } else {
            console.log('File deleted successfully after failure.');
          }
        });
      }
      return res.status(500).json({ success: false, message: 'Verification failed due to server error' });
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    // Parse the output for "Verification result: True" or "Verification result: False"
    const successPattern = /Verification result: True/;
    const failurePattern = /Verification result: False/;

    let response;
    if (successPattern.test(stdout)) {
      response = { success: true, match: true };
    } else if (failurePattern.test(stdout)) {
      response = { success: true, match: false };
    } else {
      console.error('Unexpected output from Python script.');
      response = { success: false, message: 'Unexpected output from verification process' };
    }

    // Delete the image after verification
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Error deleting file: ${unlinkErr}`);
        } else {
          console.log('File deleted successfully.');
        }
      });
    } else {
      console.error('File does not exist, could not delete.');
    }

    // Send the response
    res.json(response);
  });
});

module.exports = router;
