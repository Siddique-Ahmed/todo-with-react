import React from "react";
import "./Todo.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  auth,
  onAuthStateChanged,
} from "../firebase";


const Todo = ()=>{
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      navigate("/Todo-Page");
    } else {
      navigate("/Login-page")
    }
  });

return (
  <div className="userTodo">
    <nav className="navbar">
      <div className="logo">
        <h1>TODO</h1>
      </div>
      <div className="user_detail">
      <div className="user_profile">
        <img src="data:image/jpeg;base64,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" alt="" />
      </div>
      <div className="logout_user">
        <button type="submit" className="logout_btn btn btn-dark">Logout</button>
      </div>
      </div>
    </nav>
    <section className="todo_app">
      <div className="todo_box">
        <div className="input_box">
          <input type="text" placeholder="Enter Task..." id="todo_add"/>
          <button id="add_item" className="btn btn-primary">Add</button>
        </div>
        <div className="todo_item">
          <div> <p contentEditable="false">habibi come to dubai</p> <span><i className="fa-solid fa-edit"></i> <i className="fa-solid fa-trash"></i></span></div>
        </div>
      </div>
    </section>
  </div>
)
}

export default Todo;