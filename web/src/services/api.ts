import axios from 'axios';//Fazer reqquisições pega do back end
//Pega o padrão das paginas html'
const api = axios.create({
    baseURL : 'http://localhost:3333/'
});

export default api;
