import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

function Signup() {
  const { signup } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const signUpUser = async (e) => {
    e.preventDefault();

    await signup(formData.email, formData.username, formData.password);
  };

  return (
    <div className="auth-form">
      <form onSubmit={signUpUser}>
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
              <td>Username:</td>
              <td>
                <input
                  type="text"
                  name="username"
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

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
