import axios from "axios";
import { API_URL } from "./api";
import { Favorite } from "../types"

const favoritesApiUrl = `${API_URL}/favorites`;

export async function fetchFavorites(token: string) {
  try {
    const response = await axios.get(favoritesApiUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
  } catch (error) { 
    console.log(error);
    throw error;
  }
}