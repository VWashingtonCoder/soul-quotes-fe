import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AccountNav from "./components/Accounts/AccountNav";
import JoinForm from "./components/Accounts/JoinForm";
import LoginForm from "./components/Accounts/LoginForm";
import Favorites from "./components/Favorites/Favorites";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts" element={<AccountNav />}>
          <Route path="join" element={<JoinForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
