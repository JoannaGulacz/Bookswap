import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.interceptors.request.use(req => {
    const token = localStorage.getItem('token');
    if (token) req.headers['Authorization'] = `Bearer ${token}`;
    return req;
});

export default axios;
