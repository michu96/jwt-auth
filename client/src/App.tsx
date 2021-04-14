import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";

interface IUser {
  _id?: string;
  username?: string;
}

export default function App() {
  const [msg, setMsg] = useState("");
  const [user, setUser]: [
    IUser,
    React.Dispatch<React.SetStateAction<IUser>>
  ] = useState({});

  useEffect(() => {
    (async () => {
      const result = await axios.get("/api/user");
      setUser(result.data);
    })();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar user={user} />
        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route exact path="/message">
            <h1>Message</h1>
            <h2>{user.username}</h2>
          </Route>
          <Route exact path="/register">
            <RegisterForm />
          </Route>
          <Route exact path="/login">
            {user._id ? <Redirect to="/" /> : <LoginForm />}
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
