import axios from 'axios';

const api = axios.create({
    baseURL: 'https://equipes.herokuapp.com/',
});

export default api;