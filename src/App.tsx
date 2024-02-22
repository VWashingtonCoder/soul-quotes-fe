import { useEffect, useState } from "react";
import { postNewUser, loginUser } from "./api/api-users";
import { fetchQuotes, postNewQuote, deleteQuote } from "./api/api-quotes";
import { UserInput, UserLogin, QuoteInfo, QuoteInput } from "./types";
import { fetchFavorites } from "./api/api-favorites";
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

  // User api handlers
  const createUser = async (user: UserInput) => {
    await postNewUser(user).then((response) => {
      console.log(response);
    });
  };

  const handleLogin = async (user: UserLogin) => {
    await loginUser(user).then((response) => {
      setUserToken(response.token);
    });
  };

  // Quote api handlers
  const getQuotes = async () => {
    await fetchQuotes().then((response) => {
      console.log(response);
    });
  };

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


  // function tests
  useEffect(() => {
    // createUser(user);
    // handleLogin(user);
    console.log(`userToken: ${userToken}`);
    // getQuotes();
    // createQuote(newQuote, userToken);
    // trashQuote(1, userToken);
    // getUserFavorites(userToken);
  }, []);


  return (
    <>
      <h1>Soul Quotes App</h1>
    </>
  );
}

export default App;
