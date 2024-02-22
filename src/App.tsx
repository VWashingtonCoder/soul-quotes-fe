import { useEffect, useState } from "react";
import { postNewUser, loginUser } from "./api/api-users";
import { fetchQuotes, postNewQuote, deleteQuote } from "./api/api-quotes";
import {
  fetchFavorites,
  postFavorite,
  deleteFavorite,
} from "./api/api-favorites";
import { UserInput, UserLogin, QuoteInfo, QuoteInput, Quote } from "./types";
import "./App.css";

function App() {
  // Set up for token use in other routes
  const [userToken, setUserToken] = useState<string>("");

  const user = {
    username: "admin_andre",
    password: "Us3rB00k$",
  };
  const newQuote = {
    text: "a bird in the bush is better than a birs in the hand",
    author: "admin_andre",
    category: "funny",
  };

  const loginActiveUser = async (user: UserLogin) => {
    await loginUser(user)
      .then((response) => {
        const loggedInUser = {
          username: response.user.username,
          token: response.token,
        };

        setUserToken(loggedInUser.token);
      })
      .catch((err) => {
        const errorResponse = err.response.data.error;
        console.error(errorResponse);
      });
  };

  // Quote api handlers
  const createQuote = async (quoteInfo: QuoteInfo, token: string) => {
    const quote: QuoteInput = {
      ...quoteInfo,
      quoteKey: "funny-37",
    };

    await postNewQuote(quote, token).then((response) => {
      console.log(response);
    });
  };

  const trashQuote = async (quoteId: number, token: string) => {
    await deleteQuote(quoteId, token).then((response) => {
      console.log(response);
    });
  };

  // favorites api handlers
  const getUserFavorites = async (token: string) => {
    await fetchFavorites(token).then((response) => {
      console.log(response);
    });
  };

  const addFavorite = async (
    quoteKey: string,
    username: string,
    token: string
  ) => {
    const favorite = {
      quoteId: quoteKey,
      userId: username,
    };

    await postFavorite(favorite, token).then((response) => {
      console.log(response);
    });
  };

  const removeFavorite = async (favoriteId: number, token: string) => {
    await deleteFavorite(favoriteId, token).then((response) => {
      console.log(response);
    });
  };

  // function tests
  useEffect(() => {
    loginActiveUser(user);
    // createQuote(newQuote, userToken);
    // trashQuote(1, userToken);
    // getUserFavorites(userToken);
    // addFavorite("love-4", "admin_andre", userToken);
    // removeFavorite(9, userToken);
    console.log(`userToken: ${userToken}`);
  }, []);

  return (
    <>
      <h1>Soul Quotes App</h1>
    </>
  );
}

export default App;
