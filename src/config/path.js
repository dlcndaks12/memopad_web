// export const apiUrl = 'http://localhost:8080';
// export const apiUrl = 'https://api.almondbongbong.com';

export const apiUrl = process.env.NODE_ENV === 'production' ? 'https://api.almondbongbong.com' : 'http://localhost:8080';