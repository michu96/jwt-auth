import { NavLink } from "react-router-dom";

interface IUser {
  _id?: string;
  username?: string;
}

interface NavbarProps {
  user: IUser;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <>
      <nav className="navbar">
        <ul className="navbar__link-list">
          <li>
            <NavLink
              exact
              to="/"
              className="navbar__link"
              activeClassName="navbar__link--active"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/message"
              className="navbar__link"
              activeClassName="navbar__link--active"
            >
              Message
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/register"
              className="navbar__link"
              activeClassName="navbar__link--active"
            >
              Register
            </NavLink>
          </li>
          {user._id ? (
            <>
              <NavLink
                exact
                to="/user"
                className="navbar__link"
                activeClassName="navbar__link--active"
              >
                {user.username}
              </NavLink>
              <NavLink
                exact
                to="#"
                className="navbar__link"
                onClick={() => {
                  document.cookie =
                    "authToken=;path=/;expires = Thu, 01 Jan 1970 00:00:00 GMT";
                  window.location.href = "/login";
                }}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <li>
              <NavLink
                exact
                to="/login"
                className="navbar__link"
                activeClassName="navbar__link--active"
              >
                Sign in
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
