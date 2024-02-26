import { useApp } from "./provider/context-hooks";
import "./App.css";
import { useEffect } from "react";
import { Quote } from "./types";


function App() {
  const {
    activeUsername,
    userToken,
    quoteList,
    userFavorites,
    addFavorite,
  } = useApp();

  useEffect(() => {
    setTimeout(() => {
      console.log(`
        activeUsername: ${activeUsername}
        userToken: ${userToken}
      `)
      console.log("quoteList: ", quoteList);
      console.log("userFavorites: ", userFavorites);
    }, 1000);

    // addFavorite("funny-2")

    setTimeout(() => {
      // console.log("userFavorites: ", userFavorites);
    }, 2000);
  }, []);

  return (
    <>
      <h1>Soul Quotes App</h1>
    </>
  );
}

export default App;
