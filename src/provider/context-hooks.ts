import { useContext } from "react";
import { AppContext, AppContextInterface } from "./AppProvider";

export const useApp = (): AppContextInterface => {
  return useContext(AppContext);
};
