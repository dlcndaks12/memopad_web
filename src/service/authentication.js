import axios from 'axios';

/* Auth Check */
export function auth() {
  return axios.post('api/auth');
}

/* Login */
export function login(id, password) {
  return axios.post('api/auth/login', {
    id: id,
    password: password
  });
}

/* Signup */
export function signup(id, nickname, password) {
  return axios.post('api/user', {
    id: id,
    nickname: nickname,
    password: password,
  });
}