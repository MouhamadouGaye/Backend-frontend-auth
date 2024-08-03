import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3005/api/";



interface User {
  username: string;
  email: string;
  password: string;
}


// register the user service
export const registerUser = async (user: User) => {

  try {
    const response = await axios.post(`${apiUrl}user/register`, user);
    return response.data;
  } catch (error) {
    return error;
  }
};

// login the user service   async (values: FormValues): Promise<LoginResponse>
export const loginUser = async (user: User)    => {
  try {
    const response = await axios.post(`${apiUrl}user/login`, user);
    return response.data;
   
  } catch (error) {
    return error;
  }
};
