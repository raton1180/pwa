import axios from 'axios';

const backendPost = axios.create({
  baseURL: 'http://localhost:5000/', // Your API base URL
  timeout: 5000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default backendPost;