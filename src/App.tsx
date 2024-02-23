import { useApp } from "./provider/context-hooks";
import "./App.css";
import { useEffect } from "react";

function App() {
  const { activeUser, quoteList, userFavorites, loginActiveUser, createQuote } = useApp();
  const user = {
    username: "admin_andre",
    password: "Us3rB00k$",
  };

  const newQuote = {
    text: "a bird in the bush is better than a birs in the hand",
    author: "Andre",
    category: "funny",
  };

  useEffect(() => {
    createQuote(newQuote);
  }, []);

  console.log(activeUser);
  // console.log(quoteList);
  // console.log(userFavorites);

  return (
    <>
      <h1>Soul Quotes App</h1>
    </>
  );
}

export default App;
