import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params:{
        api_key: 'bbbe834feff0f232e8d3df6f2298154c',
        language: 'es-ES'
    }
})

export default movieDB;
