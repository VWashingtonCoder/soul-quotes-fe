import axios from "axios";
import { API_URL } from "./api";
import { QuoteInput } from "../types";

const quotesApiUrl = `${API_URL}/quotes`;

export async function fetchQuotes() {
  try {
    const response = await axios.get(quotesApiUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching quotes");
  }
}

export async function postNewQuote(quote: QuoteInput, token: string) {
  try {
    const response = await axios.post(quotesApiUrl, quote, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error posting new quote");
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
    console.error(error);
    throw new Error("Error deleting quote");
  }
}
