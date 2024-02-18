import axios from "axios";
import { API_URL } from "./api";
import { UserInput, UserLogin } from "../types"

const usersApiUrl = `${API_URL}/users`;

export async function fetchUsers() {
  try {
    const response = await axios.get(usersApiUrl);
    return response.data;
  } catch (error) { 
    console.log(error);
    throw error;
  }
}

export async function postNewUser(user: UserInput) {
  try {
    const response = await axios.post(`${usersApiUrl}/create`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function loginUser(user: UserLogin) {
  try {
    const response = await axios.post(`${usersApiUrl}/login`, user);
    return response.data;
  } catch (error) { 
    console.log(error);
    throw error;
  }
}
