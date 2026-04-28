import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

function Login() {
  const { login } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();

    await login(formData.email, formData.password);
  };

  return (
    <div className="auth-form">
      <form onSubmit={loginUser}>
        <table>
          <tbody>
            <tr>
              <td>Email:</td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Password:</td>
              <td>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
