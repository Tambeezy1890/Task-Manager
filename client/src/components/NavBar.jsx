import { useAuthContext } from "../contexts/AuthContext";

function NavBar({ onLoginClick, onSignupClick }) {
  const { isAuthenticated, logout } = useAuthContext();

  return (
    <nav>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <div className="auth-btns">
          {" "}
          <button onClick={onLoginClick}>Login</button>
          <button onClick={onSignupClick}>Signup</button>
        </div>
      )}
    </nav>
  );
}
export default NavBar;
