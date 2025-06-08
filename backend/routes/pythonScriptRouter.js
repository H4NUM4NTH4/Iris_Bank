// this  code is for template creating
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const router = express.Router();

// Function to run the Python script dynamically
function runPythonScript(scriptName, args = []) {
  const scriptPath = path.join(__dirname, '..', '..', 'IrisRecognition_ML', 'src', scriptName);
  const scriptDirectory = path.join(__dirname, '..', '..', 'IrisRecognition_ML', 'src');

  console.log(`Running Python script: ${scriptName} at ${scriptPath}`);
  console.log(`With arguments: ${args.join(' ')}`);

  const pythonProcess = spawn('python', [scriptPath, ...args], {
    cwd: scriptDirectory,
  });

  return pythonProcess;
}

// Define the POST endpoint to trigger the CreateTemplate_DB.py script
router.post('/run-template-creation', (req, res) => {
  console.log('Triggered endpoint: /run-template-creation');

  const pythonProcess = runPythonScript('CreateTemplate_DB.py');

  pythonProcess.stdout.on('data', (data) => {
    process.stdout.write(`Python stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    process.stderr.write(`Python stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Python script (CreateTemplate_DB.py) executed successfully!');
      res.status(200).json({ status: 'success', message: 'Iris registration complete----- \n' });
    } else {
      console.log(`Python script (CreateTemplate_DB.py) failed with exit code ${code}`);
      res.status(500).json({ status: 'error', message: `Python script failed with exit code ${code} ----- \n` });
    }
  });

  pythonProcess.on('error', (err) => {
    console.error(`Error starting Python process: ${err.message}`);
    res.status(500).json({ status: 'error', message: `Error starting Python process: ${err.message} ----- \n` });
  });
});

// Example of how to add an endpoint for ML_code.py (if needed for prediction/verification)
/*
router.post('/run-ml-prediction', (req, res) => {
  console.log('Triggered endpoint: /run-ml-prediction');
  const { filename } = req.body; // Expect the filename in the request body

  if (!filename) {
    return res.status(400).json({ status: 'error', message: 'Filename is required in the request body.' });
  }

  // You might also need to pass --template_dir and --threshold if ML_code.py expects them
  const pythonProcess = runPythonScript('ML_code.py', ['--filename', filename]);

  pythonProcess.stdout.on('data', (data) => {
    process.stdout.write(`ML Python stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    process.stderr.write(`ML Python stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Python ML script executed successfully!');
      res.status(200).json({ status: 'success', message: 'ML prediction complete.' });
    } else {
      console.log(`Python ML script failed with exit code ${code}`);
      res.status(500).json({ status: 'error', message: `ML Python script failed with exit code ${code}` });
    }
  });

  pythonProcess.on('error', (err) => {
    console.error(`Error starting ML Python process: ${err.message}`);
    res.status(500).json({ status: 'error', message: `Error starting ML Python process: ${err.message}` });
  });
});
*/

module.exports = router;
