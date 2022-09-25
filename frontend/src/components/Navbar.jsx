import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="p-4 flex justify-between">
        <Link to="/">
          <div className="text-2xl">yuna</div>
        </Link>
        <nav className="">
          {user && (
            <div className="text-base">
              <Link className="font-bold" to={`/user/${user.id}`}>
                {user.name}
              </Link>
              <button className="mx-2" onClick={handleClick}>
                Log out
              </button>
            </div>
          )}
          {!user && (
            <div className="nav-links">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
