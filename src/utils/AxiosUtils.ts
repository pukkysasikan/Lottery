import axios from 'axios';

const http = axios.create({
  baseURL: 'https://lotto-backend.vercel.app/api/v1',
});

export default http;