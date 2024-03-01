import { useState } from "react";
import { useApp } from "../../provider/context-hooks";
import { toast } from "react-hot-toast";
import TextInput from "../shared/TextInput";
import PasswordInput from "../shared/PasswordInput";
import { UserLogin } from "../../types";

function LoginForm() {
  const { userList, loginActiveUser, activeUsername } = useApp();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const disabled = !username || !password;

  function validateLoginInfo (user: UserLogin) {
    const { username, password } = user;
    let error = "";
  
    if (username.length < 2)
      error = "Username must be at least 3 characters!";
    else if (password.length < 5)
      error = "Password must be at least 5 characters!";

    return error;
  } 


  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginInfo = { username, password };
    const invalidLogin = validateLoginInfo(loginInfo);

    if (invalidLogin) {
      toast.error(invalidLogin);
      return;
    } else {
      const loggedIn = loginActiveUser(loginInfo);

      // figure out form reset parameters
    }


    // const user = users.find((user) => user.userId === userId);

    // if (!user) {
    //   toast.error("User not found!");
    //   return;
    // } else if (user.password !== password) {
    //   toast.error("Password is incorrect!");
    //   return;
    // } else {
    //   loginActiveUser(user);
    //   setUserId("");
    //   setPassword("");
    //   toast.success(`Welcome back, ${user.userId}!`);
    // }
  };

  return (
    <form 
      className="form login" 
      // onSubmit={handleSubmit}
    >
      <header>
        <h2 className="title">Welcome Back!</h2>
        <h3 className="subtitle">
          Sign in to your account to see all of your favorites and contribute to
          the community!
        </h3>
      </header>

      <div className="inputs-group">
        <TextInput
          label="Username"
          type="text"
          id="username"
          value={username}
          textChange={(e) => setUsername(e.target.value)}
        />

        <PasswordInput
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          setShowPassword={handleShowPassword}
        />
      </div>

      <button type="submit" className="submit-button" disabled={disabled}>
        Login
      </button>
    </form>
  );
}

export default LoginForm;
