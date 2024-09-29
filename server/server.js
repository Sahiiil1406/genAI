const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const multer = require('multer'); // Import multer for handling file uploads

const app = express();
app.use(cors());
app.use(express.json());

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files

app.post('/generate', (req, res) => {
  const { message } = req.body;

  // Update the path to the virtual environment's Python executable
  exec(`./venv/bin/python3 /Users/nikhilkottoli/Desktop/pokedex/server/generate.py "${message}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      console.error(`stderr: ${stderr}`); // Log stderr to see the error
      return res.status(500).json({ error: 'Failed to execute Python script.' });
    }
    try {
      const result = JSON.parse(stdout);
      return res.json(result);
    } catch (parseError) {
      console.error(`Parse Error: ${parseError}`);
      return res.status(500).json({ error: 'Failed to parse response.' });
    }
  });
});

// New endpoint for image upload
app.post('/image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded.' });
  }

  // Update the path to the virtual environment's Python executable
  exec(`./venv/bin/python3 /Users/nikhilkottoli/Desktop/pokedex/server/image.py "${req.file.path}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      console.error(`stderr: ${stderr}`); // Log stderr to see the error
      return res.status(500).json({ error: 'Failed to execute Python script.' });
    }
    try {
      const result = JSON.parse(stdout);
      return res.json(result);
    } catch (parseError) {
      console.error(`Parse Error: ${parseError}`);
      return res.status(500).json({ error: 'Failed to parse response.' });
    }
  });
});

const PORT = 8080; // Ensure this matches your curl command
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
