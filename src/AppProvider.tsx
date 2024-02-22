import { ReactNode, createContext, useEffect, useState } from "react";
import {
  User,
  UserInput,
  UserLogin,
  UserToken,
  QuoteInfo,
  QuoteInput,
  Quote,
  Favorite,
} from "./types";
import { postNewUser, loginUser } from "./api/api-users";
import { fetchQuotes, postNewQuote, deleteQuote } from "./api/api-quotes";
import {
  fetchFavorites,
  postFavorite,
  deleteFavorite,
} from "./api/api-favorites";
import { toast } from "react-hot-toast";

export interface AppContextInterface {
  activeUser: UserToken | null;
  quoteList: Quote[];
  userFavorites: Favorite[];
  // userToken: string;
  // setUserToken: (token: string) => void;
  // createUser: (user: UserInput) => void;
  // handleLogin: (user: UserLogin) => void;
  // getQuotes: () => void;
  // createQuote: (quoteInfo: QuoteInfo, token: string) => void;
  // trashQuote: (quoteId: number, token: string) => void;
  // getFavorites: (token: string) => void;
  // createFavorite: (favorite: Favorite, token: string) => void;
  // trashFavorite: (favoriteId: number, token: string) => void;
}
export const AppContext = createContext({} as AppContextInterface);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeUser, setActiveUser] = useState<UserToken | null>(null);
  const [quoteList, setQuoteList] = useState<Quote[]>([]);
  const [userFavorites, setUserFavorites] = useState<Favorite[]>([]);

  // User api handlers
  const checkForLocalUser = () => {
    const localUser = localStorage.getItem("activeUser");
    if (localUser) {
      setActiveUser(JSON.parse(localUser));
    }
  };

  const loginActiveUser = async (user: UserLogin) => {
    await loginUser(user).then((response) => {
      const { username, token } = response;
      setActiveUser({ username, token });
      localStorage.setItem("activeUser", JSON.stringify(response));
    });
  }

  useEffect(() => {
    checkForLocalUser();
  }, []);

  const providerValue = {
    activeUser,
    quoteList,
    userFavorites,
    loginActiveUser,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
