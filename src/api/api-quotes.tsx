import axios, { AxiosError } from "axios";
import { API_URL } from "./api";
import { Quote } from "../types";

const quotesApiUrl = `${API_URL}/quotes`;

export async function fetchQuotes() {
  try {
    const response = await axios.get(quotesApiUrl);
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response;
  }
}

export async function postNewQuote(quote: Quote, token: string) {
  try {
    const response = await axios.post(quotesApiUrl, quote, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response;
  }
}

export async function deleteQuote(quoteId: number, token: string) {
  try {
    const response = await axios.delete(`${quotesApiUrl}/${quoteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response;
  }
}
