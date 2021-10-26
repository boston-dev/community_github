const axios = require('axios');
const http = axios.create({
    timeout: 60000,
    baseURL:'http://localhost:30092/api',
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
})
http.interceptors.response.use(res => {
    return res.data
})
http.post('/articles/create',{title:'title123','cont':'cont123'}).then(res =>{
    console.log(res)
})