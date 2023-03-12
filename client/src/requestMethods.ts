import axios from "axios"

const BASE_URL = "http://localhost:3001/";


const user = JSON.parse(localStorage.getItem("persist:root") as string)?.user;

const currentUser = user && JSON.parse(user).currentUser;



const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzEzOTdkNjk0OTg0OWYzMTkxN2QzYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2ODM3MDk1NywiZXhwIjoxNjY4NjMwMTU3fQ.5cRHAItyN5X_zMr0skABxHV1vZiwCU82zefquJ7VkL8";


export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
  });