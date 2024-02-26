import { useApp } from "./provider/context-hooks";
import "./App.css";
import { useEffect } from "react";
import { Quote } from "./types";
import { generateQuoteKey } from "./helpers";

function App() {
  const {
    activeUsername,
    userToken,
    quoteList,
    userFavorites,
    getUserFavorites,
  } = useApp();

  useEffect(() => {
    setTimeout(() => {
      console.log(`
      activeUsername: ${activeUsername}
      userToken: ${userToken}
    `);
      console.log(userFavorites);
      console.log(quoteList);
    }, 2500);
  }, []);

  return (
    <>
      <h1>Soul Quotes App</h1>
    </>
  );
}

export default App;
