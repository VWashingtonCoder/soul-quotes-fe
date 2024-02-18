import axios from "axios";
import { API_URL } from "./api";

const quotesApiUrl = `${API_URL}/quotes`;

export async function fetchQuotes() {
  axios
    .get(quotesApiUrl)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}


