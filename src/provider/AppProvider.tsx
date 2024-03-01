import { ReactNode, createContext, useEffect, useState } from "react";
import {
  User,
  UserCheck,
  UserInput,
  UserLogin,
  UserToken,
  Quote,
  Favorite,
  FavoriteQuote,
} from "../types";
import { fetchUsers, postNewUser, loginUser } from "../api/api-users";
import { fetchQuotes, postNewQuote, deleteQuote } from "../api/api-quotes";
import {
  fetchFavorites,
  postFavorite,
  deleteFavorite,
} from "../api/api-favorites";
import { toast } from "react-hot-toast";

export interface AppContextInterface {
  activeUsername: string;
  userToken: string;
  userList: UserCheck[];
  quoteList: Quote[];
  userFavorites: FavoriteQuote[];
  loginActiveUser: (user: UserLogin) => void;
  logoutActiveUser: () => void;
  createUser: (user: UserInput) => void;
  getQuotes: () => void;
  createQuote: (quote: Quote) => void;
  trashQuote: (quoteId: number) => void;
  addFavorite: (quoteKey: string) => void;
  removeFavorite: (favoriteId: number) => void;
}
export const AppContext = createContext({} as AppContextInterface);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeUsername, setActiveUsername] = useState<string>("");
  const [userToken, setUserToken] = useState<string>("");
  const [userList, setUserList] = useState<UserCheck[]>([]);
  const [quoteList, setQuoteList] = useState<Quote[]>([]);
  const [userFavorites, setUserFavorites] = useState<FavoriteQuote[]>([]);

  const getUserList = async () => {
    await fetchUsers()
      .then((response) => {
        const list = [] as UserCheck[];
        response.users.forEach((user: User) => {
          const { username, email } = user;
          list.push({ username, email });
        });
        setUserList(list);
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

  const logoutActiveUser = () => {
    setActiveUsername("");
    setUserToken("");
    setUserFavorites([]);
    localStorage.removeItem("activeUser");
  };

  const createUser = async (user: UserInput) => {
    await postNewUser(user)
      .then(() => {
        toast.success("User created successfully");
        getUserList();
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
        const favoriteQuote = response.favorites.map((favorite: Favorite) => {
          return { id: favorite.id, quoteId: favorite.quoteId };
        });
        setUserFavorites(favoriteQuote);
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

  const addFavorite = async (quoteKey: string) => {
    const favorite = {
      quoteId: quoteKey,
      userId: activeUsername,
    };

    await postFavorite(favorite, userToken)
      .then(() => {
        getUserFavorites(userToken);
        toast.success("Added to favorites!");
      })
      .catch((err) => {
        console.error(err);
        let errorResponse = err.data.error;

        if (errorResponse === undefined)
          errorResponse = "Error adding to favorites";
        else if (err.status === 401) errorResponse = "Unauthorized";

        toast.error(errorResponse);
      });
  };

  const removeFavorite = async (favoriteId: number) => {
    await deleteFavorite(favoriteId, userToken)
      .then(() => {
        getUserFavorites(userToken);
        toast.success("Removed from favorites!");
      })
      .catch((err) => {
        console.error(err);

        let errorResponse = err.data.error;

        if (errorResponse === undefined)
          errorResponse = "Error adding to favorites";
        else if (err.status === 401) errorResponse = "Unauthorized";

        toast.error(errorResponse);
      });
  };

  useEffect(() => {
    checkForLocalUser();
    getQuotes();
    getUserList();
  }, []);

  const providerValue = {
    activeUsername,
    userToken,
    userList,
    quoteList,
    userFavorites,
    loginActiveUser,
    logoutActiveUser,
    createUser,
    getQuotes,
    createQuote,
    trashQuote,
    addFavorite,
    removeFavorite,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
