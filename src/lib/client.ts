import axios from 'axios';

const endpoint = 'https://pokeapi.co/api/v2/';

const api = axios.create({
  baseURL: endpoint,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
