import axios from "axios";

const PROD_API_URL = "https://soul-quotes-api.fly.dev";
const DEV_API_URL = "http://localhost:5000";
export const API_URL = DEV_API_URL;

export async function serverTest() {
  axios
    .get(`${API_URL}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}
