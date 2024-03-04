import axios from "axios";

const API_URL = "https://soul-quotes-api.fly.dev";

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
