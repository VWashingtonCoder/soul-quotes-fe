import axios, { AxiosError } from "axios";
import { API_URL } from "./api";
import { Favorite } from "../types";

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
    throw (error as AxiosError).response;
  }
}

export async function postFavorite(favorite: Favorite, token: string) {
  try {
    const response = await axios.post(favoritesApiUrl, favorite, {
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

export async function deleteFavorite(favoriteId: number, token: string) {
  try {
    const response = await axios.delete(`${favoritesApiUrl}/${favoriteId}`, {
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
