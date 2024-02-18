import { loginUser } from "./api/api-users";
import { useEffect, useState } from "react";
import { UserLogin } from "./types";
import "./App.css";

function App() {
  // Set up for token use in other routes
  const [userToken, setUserToken] = useState<string>("");

  const user = {
    username: "admin_andre",
    password: "Us3rB00k$"
  };

  const handleLogin = async (user: UserLogin) => {
    await loginUser(user).then((response) => {
      setUserToken(response.token);
    });
  };

  useEffect(() => {
    handleLogin(user);
    console.log(userToken);
  }, []);

  return (
    <>
      <h1>Soul Quotes App</h1>
    </>
  );
}

export default App;
