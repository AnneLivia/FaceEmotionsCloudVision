import axios from 'axios';

const baseAxios = axios.create({
    baseURL: 'http://localhost:4000/api/useCloudVisionAPI'
});

export default baseAxios;