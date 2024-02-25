import { ReactNode, createContext, useEffect, useState } from "react";
import {
  User,
  UserInput,
  UserLogin,
  UserToken,
  QuoteInfo,
  Quote,
  Favorite,
} from "../types";
import { postNewUser, loginUser } from "../api/api-users";
import { fetchQuotes, postNewQuote, deleteQuote } from "../api/api-quotes";
import {
  fetchFavorites,
  postFavorite,
  deleteFavorite,
} from "../api/api-favorites";
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

  const checkForLocalUser = () => {
    const localUser = localStorage.getItem("activeUser");
    if (localUser) setActiveUser(JSON.parse(localUser));
  };

  const loginActiveUser = async (user: UserLogin) => {
    await loginUser(user)
      .then((response) => {
        const loggedInUser = {
          username: response.user.username,
          token: response.token,
        };
        setActiveUser(loggedInUser);
        localStorage.setItem("activeUser", JSON.stringify(loggedInUser));
        toast.success(`Welcome back ${loggedInUser.username}!`);
      })
      .catch((err) => {
        const errorResponse = err.response.data.error;
        toast.error(errorResponse);
      });
  };

  const createUser = async (user: UserInput) => {
    await postNewUser(user)
      .then(() => {
        toast.success("User created successfully");
      })
      .catch((err) => {
        const errorResponse = err.response.data.error;
        toast.error(errorResponse);
      });
  };

  // Quote api handlers
  const getQuotes = async () => {
    await fetchQuotes()
      .then((response) => {
        setQuoteList(response.quotes);
      })
      .catch(() => {
        toast.error("Failed to fetch quotes");
      });
  };

  const createQuote = async (quote: Quote) => {
    const token = activeUser?.token || "";

    console.log(quote)

    await postNewQuote(quote, token)
      .then(() => {
        getQuotes();
        toast.success("Created quote successfully!")
      })
      .catch((err) => {
        console.log(err);
        const errorResponse = err.response.data.error;
        console.log(errorResponse)
        toast.error("Error creating quote")
      });
  };

  // STILL NEED WORK
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

  useEffect(() => {
    checkForLocalUser();
    getQuotes();
  }, []);

  const providerValue = {
    activeUser,
    quoteList,
    userFavorites,
    loginActiveUser,
    createUser,
    getQuotes,
    createQuote,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
