import { useApp } from "./provider/context-hooks";
import "./App.css";
import { useEffect } from "react";
import { Quote } from "./types";

function generateQuoteKey(quotes: Quote[], category: string) {
  console.log(quotes)
  const categoryQuotes = quotes.filter(
    (quote) => quote.category === category
  );

  if (categoryQuotes.length === 0) return "";

  const lastQuoteKey = categoryQuotes[categoryQuotes.length - 1].quoteKey;
  const lastQuoteKeyNum = Number(lastQuoteKey.replace(`${category}-`, ""));
  const newQuoteKey = `${category}-${lastQuoteKeyNum + 1}`;
  return newQuoteKey;
}


function App() {
  const { activeUser, quoteList, userFavorites, loginActiveUser, createQuote } = useApp();
  const user = {
    username: "admin_andre",
    password: "Us3rB00k$",
  };

 
  useEffect(() => {
    // loginActiveUser(user);
    
    console.log(activeUser);
    // console.log(quoteList);
    // console.log(userFavorites);
  }, []);



  return (
    <>
      <h1>Soul Quotes App</h1>
    </>
  );
}

export default App;
