const API_BASE_URL =
  import.meta.env.VITE_MODE === 'development' ? 'http://localhost:5000' : 'https://api.aiexploria.com';

export default API_BASE_URL;
