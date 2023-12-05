import axios from 'axios';

const natureInstance = axios.create({
  baseURL: 'https://nature-image-api.vercel.app/', // Your API base URL
  timeout: 5000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default natureInstance;