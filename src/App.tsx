import { loginUser } from "./api/api-users";
import { useEffect, useState } from "react";
import { UserLogin } from "./types";
import "./App.css";

function App() {
  // Set up for token use in other routes
  const [userToken, setUserToken] = useState<string>("");

  const user = {
    username: "Anicoder1",
    email: "anime1@anime.com",
    password: "password1",
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
