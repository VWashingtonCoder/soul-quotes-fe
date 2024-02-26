import { EffectCallback, useEffect } from "react";
import { Quote } from "./types";

export function generateQuoteKey(quotes: Quote[], category: string) {
    const categoryQuotes = quotes.filter(
      (quote) => quote.category === category
    );
  
    if (categoryQuotes.length === 0) return "";
  
    const lastQuoteKey = categoryQuotes[categoryQuotes.length - 1].quoteKey;
    const lastQuoteKeyNum = Number(lastQuoteKey.replace(`${category}-`, ""));
    const newQuoteKey = `${category}-${lastQuoteKeyNum + 1}`;
    return newQuoteKey;
  }

  export function useEffectOnce (effect: EffectCallback) {
     // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  }