import axios from 'axios';

/* Auth 체크 */
export function auth() {
    return axios.get('https://jsonplaceholder.typicode.com/posts/');
}

export function getComments(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
}