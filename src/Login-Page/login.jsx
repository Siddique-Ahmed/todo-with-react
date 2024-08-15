import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const user_email = e.target[0].value.trim();
    const user_password = e.target[1].value.trim();

    const userLogin = signInWithEmailAndPassword(
      auth,
      user_email,
      user_password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        if(user){
          navigate("/Todo-Page")
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="addUser">
      <h3>LogIn</h3>
      <form onSubmit={loginUser} className="addUserForm">
        <div className="inputGroup">
          <label htmlFor="user_email">Email :</label>
          <input
            type="email"
            autoComplete="off"
            id="user_email"
            placeholder="Enter your email"
          />
          <label htmlFor="user_password">Password :</label>
          <input
            type="password"
            autoComplete="off"
            id="user_password"
            placeholder="Password"
          />
        </div>
        <div className="button_box">
          <button type="Submit" id="login" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="Login_user">
        <p>don't have an account? </p>
        <Link to="/" type="submit" className="btn btn-success">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
