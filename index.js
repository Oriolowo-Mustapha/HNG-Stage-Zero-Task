require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const requiredEnv = ['EMAIL', 'FULL_NAME', 'STACK', 'PORT'];
const missingEnv = requiredEnv.filter(envVar => !process.env[envVar]);

if (missingEnv.length > 0) {
  console.error(`Error: Missing required environment variables: ${missingEnv.join(', ')}`);
  process.exit(1); 
}

const getMe = async (req, res) => {
  try {
    const catFactResponse = await axios.get('https://catfact.ninja/fact', { timeout: 5000 });
    const catFact = catFactResponse.data.fact;

    const user = {
      email: process.env.EMAIL,
      name: process.env.FULL_NAME,
      stack: process.env.STACK
    };

    const response = {
      status: 'success',
      user: user,
      timestamp: new Date().toISOString(),
      fact: catFact
    };

    res.status(200).json(response);
  } catch (error) {
    // --- Improved Error Handling ---
    let errorMessage = 'Failed to fetch cat fact. Please try again later.';
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request to cat fact API timed out.';
        statusCode = 504; 
      } else if (error.response) {
        errorMessage = `Cat fact API returned an error: ${error.response.status} ${error.response.statusText}`;
        statusCode = 502; 
      }
    }

    console.error('Error fetching cat fact:', error.message);

    res.status(statusCode).json({
      status: 'error',
      message: errorMessage
    });
  }
};

app.use(cors());

app.get('/me', getMe);

const HOST = '0.0.0.0';
const PORT = process.env.PORT;

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
