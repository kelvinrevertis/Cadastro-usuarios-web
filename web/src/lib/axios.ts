import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333'
})

// export const useApi = () =>({
//     validateToken: async (token: string)=>{
//         const response = await api.post ('/vakudade', {token});
//         return response.data;

//     },
//     signinWithEmail: async (email: string, password: string)=>{
//         const response = await api.post('/signin',{ email, password});
//         return response.data;
//     },
//     logout: async () =>{
//         const response = await api.post('/logout');
//         return response.data;
//     }
// })