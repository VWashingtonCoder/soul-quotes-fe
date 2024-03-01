import { Outlet } from "react-router-dom";
import { useApp } from "../../provider/context-hooks";
import Navbar from "../shared/Navbar";
import "./Account.scss";

function AccountNav() {
  const { activeUsername } = useApp();

  return (
    <section className="page account">
      {activeUsername ? (
        <h2 className="loading-message">Taking You Home Now! Please wait...</h2>
      ) : (
        <>
          <Navbar
            navList={[
              { path: "/accounts/login", label: "Login" },
              { path: "/accounts/join", label: "Join" },
            ]}
          />

          <Outlet />
        </>
      )}
    </section>
  );
}

export default AccountNav;
