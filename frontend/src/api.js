import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export function generateResume(data) {
  return api.post('/resume/generate', data);
}

export function login(data) {
  return api.post('/auth/login', data);
}

export function register(data) {
  return api.post('/auth/register', data);
}
