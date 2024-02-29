import { Link, useLocation } from "react-router-dom";
import { useApp } from "../../provider/context-hooks";
import { toast } from "react-hot-toast";

type HeaderLinkProps = {
  id: string;
  label: string;
  pathname: string;
};

const HeaderLink = (props: HeaderLinkProps) => {
  const { id, label, pathname } = props;
  const { activeUsername, logoutActiveUser } = useApp();
  const currentLocation = useLocation().pathname;
  const isHomeLink = id === "home";
  const isAccountLink = id === "account";

  const handleLogout = () => {
    logoutActiveUser();
    toast.success("Logged out successfully!");
  };

  return (
    <li className="header-link">
      {(isHomeLink ||
        (activeUsername && !isAccountLink) ||
        (!activeUsername && id === "account")) && (
        <Link
          to={pathname}
          className={`nav-link ${
            (currentLocation === pathname ||
              (isAccountLink && currentLocation.includes("accounts"))) &&
            "active"
          }`}
        >
          {label}
        </Link>
      )}

      {activeUsername && id === "account" && (
        <Link to="/" className="nav-link" onClick={handleLogout}>
          Logout
        </Link>
      )}

      {!activeUsername && !isHomeLink && !isAccountLink && (
        <Link
          to={currentLocation}
          className="nav-link"
          onClick={() => toast.error("Please login/join to access!")}
        >
          {label}
        </Link>
      )}
    </li>
  );
};

export default HeaderLink;
