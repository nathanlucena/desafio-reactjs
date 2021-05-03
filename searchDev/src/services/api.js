import axios from 'axios';

export const apiProfile  = axios.create({
    baseURL:'https://api.github.com/users/devmozao'
})