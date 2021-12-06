import React, { useState } from "react";
import "./style.css";
// import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "./../reducers/login.js";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const state = useSelector((state) => {
    return {
      login: state,
    };
  });
  // console.log(state, "state");
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const logging = async () => {
    // e.preventDefault();

    const res = await axios.post(`${BASE_URL}/login`, {
      email: email,
      password: password,
    });

    // console.log(res);

    const data = {
      user: res.data.result,
      token: res.data.token,
    };

    // console.log(data, "data");
    dispatch(login(data));

    // console.log(res);
    // localStorage.setItem("user", JSON.stringify(res.data.token));
    // // localStorage.setItem("fullUser", JSON.stringify(res.data));
    // localStorage.setItem("id", JSON.stringify(res.data.result._id));
    // localStorage.setItem("email", JSON.stringify(res.data.result.email));
    // localStorage.setItem("role", JSON.stringify(res.data.result.role));

    navigate("/tasks");
  };

  return (
    <div className="logMainDiv">
      <h1> Log in</h1>

      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={logging}>Login</button>
    </div>
  );
};

export default Login;
