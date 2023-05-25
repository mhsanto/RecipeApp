import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./navbar.css";
const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        <Link to="/saved-recipe">Saved Recipe</Link>
        {cookies.access_token ? (
          <button onClick={logout} className="btn">
            Logout
          </button>
        ) : (
          <Link to="/auth">Login/Register</Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
