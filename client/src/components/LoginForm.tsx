import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function authenticateUser(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      return;
    }
    try {
      const result = await axios.post("/api/user/login", {
        username,
        password,
      });
      window.location.href = "/";
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <>
      <form className="form" onSubmit={authenticateUser}>
        <h2 className="form__title">Sign in</h2>

        <div className="form__group">
          <label htmlFor="username" className="form__label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="form__input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="form__input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="form__error">{error}</p>}

        <button className="form__btn" type="submit">
          Sign in
        </button>
      </form>
    </>
  );
}
