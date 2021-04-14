import _ from "lodash";
import React, { useState } from "react";
import { IFormRegister } from "../utils/forms";
import userSchema from "../../../shared/userSchema";
import axios from "axios";

interface ErrorRegister {
  email?: string;
  username?: string;
  password?: string;
  rpassword?: string;
}

interface IUser {
  email: string;
  username: string;
  password: string;
}

function validateUser(user: IUser): ErrorRegister {
  const errors: ErrorRegister = {};

  for (const property in user) {
    const prop = property as "email" | "username" | "password";
    const schemaProp = userSchema[prop];

    if (schemaProp.required && schemaProp.required[0]) {
      if (!user[prop]) {
        errors[prop] = schemaProp.required[1];
        continue;
      }
    }
    if (schemaProp.match) {
      if (!user[prop].match(schemaProp.match[0])) {
        errors[prop] = schemaProp.match[1];
        continue;
      }
    }
    if (schemaProp.minLength) {
      if (user[prop].length < schemaProp.minLength[0]) {
        errors[prop] = schemaProp.minLength[1];
        continue;
      }
    }
    if (schemaProp.maxLength) {
      if (user[prop].length < schemaProp.maxLength[0]) {
        errors[prop] = schemaProp.maxLength[1];
        continue;
      }
    }
  }

  return errors;
}

function validateForm(formData: IFormRegister): ErrorRegister {
  const user: IUser = {
    email: formData.email,
    username: formData.username,
    password: formData.password,
  };

  const errors = validateUser(user);

  if (formData.password !== formData.rpassword) {
    errors.rpassword = "Passwords do not match";
  }

  return errors;
}

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [errors, setErrors]: [
    ErrorRegister,
    React.Dispatch<React.SetStateAction<ErrorRegister>>
  ] = useState({});

  async function registerUser(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const formData: IFormRegister = {
      email: email.trim(),
      username: username.trim(),
      password,
      rpassword,
    };

    const errors = validateForm(formData);

    if (_.isEmpty(errors)) {
      try {
        await axios.post("/api/user/register", formData);
        window.location.href = "/";
      } catch (err) {
        setErrors(err.response.data);
      }
    } else {
      setErrors(errors);
    }
  }

  return (
    <>
      <form className="form" onSubmit={registerUser}>
        <h2 className="form__title">Create new account</h2>

        <div className="form__group">
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <input
            type="text" // TODO: Change to email
            name="email"
            id="email"
            placeholder="Email"
            className={`form__input${
              errors.email ? " form__input--error" : ""
            }`}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="form__error">{errors.email}</p>}
        </div>

        <div className="form__group">
          <label htmlFor="username" className="form__label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className={`form__input${
              errors.username ? " form__input--error" : ""
            }`}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="form__error">{errors.username}</p>}
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
            className={`form__input${
              errors.password ? " form__input--error" : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="form__error">{errors.password}</p>}
        </div>

        <div className="form__group">
          <label htmlFor="rpassword" className="form__label">
            Repeat password
          </label>
          <input
            type="password"
            name="rpassword"
            id="rpassword"
            placeholder="Repeat password"
            className={`form__input${
              errors.rpassword ? " form__input--error" : ""
            }`}
            onChange={(e) => setRPassword(e.target.value)}
          />
          {errors.rpassword && (
            <p className="form__error">{errors.rpassword}</p>
          )}
        </div>

        <div className="form__group form__group--row">
          <input type="checkbox" name="accept" id="accept" />
          <label htmlFor="accept" className="form__label">
            Accept terms
          </label>
        </div>

        <button type="submit" className="form__btn">
          Register
        </button>
      </form>
    </>
  );
}
