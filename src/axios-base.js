import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jules-app.firebaseio.com/'
});

export default instance;