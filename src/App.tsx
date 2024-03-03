import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AccountNav from "./components/Accounts/AccountNav";
import JoinForm from "./components/Accounts/JoinForm";
import LoginForm from "./components/Accounts/LoginForm";
import Favorites from "./components/Favorites/Favorites";
import CreateQuote from "./components/Create/CreateQuote";
import CreateForm from "./components/Create/CreateForm";

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
        <Route path="/create-quote" element={<CreateQuote />}>
          <Route path="/create-quote/form" element={<CreateForm />} />
          {/* 
          <Route path="/create-quote/list" element={<CreateList />} /> 
          */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
