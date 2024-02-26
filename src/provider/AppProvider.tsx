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
import { useEffectOnce } from "../helpers";

export interface AppContextInterface {
  activeUsername: string;
  userToken: string;
  quoteList: Quote[];
  userFavorites: Favorite[];
  loginActiveUser: (user: UserLogin) => void;
  createUser: (user: UserInput) => void;
  getQuotes: () => void;
  createQuote: (quote: Quote) => void;
  trashQuote: (quoteId: number) => void;
  // getFavorites: (token: string) => void;
  // createFavorite: (favorite: Favorite, token: string) => void;
  // trashFavorite: (favoriteId: number, token: string) => void;
}
export const AppContext = createContext({} as AppContextInterface);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeUsername, setActiveUsername] = useState<string>("");
  const [userToken, setUserToken] = useState<string>("");
  const [quoteList, setQuoteList] = useState<Quote[]>([]);
  const [userFavorites, setUserFavorites] = useState<Favorite[]>([]);

  const checkForLocalUser = () => {
    const localUser = localStorage.getItem("activeUser");

    if (localUser) {
      const activeUser: UserToken = JSON.parse(localUser);
      setActiveUsername(activeUser.username);
      setUserToken(activeUser.token);
      getUserFavorites(activeUser.token);
    }
  };

  const loginActiveUser = async (user: UserLogin) => {
    await loginUser(user)
      .then((response) => {
        const loggedInUser: UserToken = {
          username: response.user.username,
          token: response.token,
        };
        const { username, token } = loggedInUser;

        setActiveUsername(username);
        setUserToken(token);
        getUserFavorites(token);
        localStorage.setItem("activeUser", JSON.stringify(loggedInUser));

        toast.success(`Welcome back ${username}!`);
      })
      .catch((err) => {
        let errorResponse = err.data.error;

        if (errorResponse === undefined)
          errorResponse = "Error fetching quotes";
        else if (err.status === 401) errorResponse = "Unauthorized";

        console.error(err);
        toast.error(errorResponse);
      });
  };

  const createUser = async (user: UserInput) => {
    await postNewUser(user)
      .then(() => {
        toast.success("User created successfully");
      })
      .catch((err) => {
        let errorResponse = err.data.error;

        if (errorResponse === undefined)
          errorResponse = "Error fetching quotes";
        else if (err.status === 401) errorResponse = "Unauthorized";

        console.error(err);
        toast.error(errorResponse);
      });
  };

  // Quote api handlers
  const getQuotes = async () => {
    await fetchQuotes()
      .then((response) => {
        setQuoteList(response.quotes);
      })
      .catch((err) => {
        let errorResponse = err.data.error;

        if (errorResponse === undefined)
          errorResponse = "Error fetching quotes";
        else if (err.status === 401) errorResponse = "Unauthorized";

        console.error(err);
        toast.error(errorResponse);
      });
  };

  const createQuote = async (quote: Quote) => {
    await postNewQuote(quote, userToken)
      .then(() => {
        getQuotes();
        toast.success("Created quote successfully!");
      })
      .catch((err) => {
        let errorMessage = err.status === 401 ? "Unauthorized" : err.data.error;

        if (errorMessage === undefined) errorMessage = "Error creating quote";

        console.error(err);
        toast.error(errorMessage);
      });
  };

  const trashQuote = async (quoteId: number) => {
    await deleteQuote(quoteId, userToken)
      .then(() => {
        getQuotes();
        toast.success("Deleted quote successfully!");
      })
      .catch((err) => {
        console.error(err);
        let errorResponse = err.data.error;

        if (errorResponse === undefined) errorResponse = "Error deleting quote";
        else if (err.status === 401) errorResponse = "Unauthorized";

        toast.error(errorResponse);
      });
  };

  // favorites api handlers
  const getUserFavorites = async (token: string) => {
    await fetchFavorites(token)
      .then((response) => {
        setUserFavorites(response.favorites);
      })
      .catch((err) => {
        console.error(err);
        let errorResponse = err.data.error;

        if (errorResponse === undefined)
          errorResponse = "Error getting favorites";
        else if (err.status === 401) errorResponse = "Unauthorized";

        toast.error(errorResponse);
      });
  };

  /* STILL NEED WORK
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
*/

useEffect(() => {
  checkForLocalUser();
  getQuotes();
}, []);

  const providerValue = {
    activeUsername,
    userToken,
    quoteList,
    userFavorites,
    loginActiveUser,
    createUser,
    getQuotes,
    createQuote,
    trashQuote,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
