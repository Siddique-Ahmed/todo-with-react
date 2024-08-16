import React, { useState, useEffect } from "react";
import "./Todo.css";
import { useNavigate } from "react-router-dom";
import {
  auth,
  onAuthStateChanged,
  signOut,
  getDocs,
  addDoc,
  collection,
  db,
  query,
  where,
  orderBy,
} from "../firebase";

const Todo = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([]);
  const [initial, setInitial] = useState("");

  // on auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/Todo-Page");
      } else {
        navigate("/Login-page");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // fetch user data and tasks from firebase
  useEffect(() => {
    const fetchUserData = async () => {
      const userCollection = collection(db, "users");
      const querySnapshot = await getDocs(userCollection);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (auth.currentUser && data.user_email === auth.currentUser.email) {
          setUserData(data);
        }
      });

      if (auth.currentUser) {
        const tasksCollection = collection(db, "tasks");
        const tasksQuery = query(
          tasksCollection,
          where("userId", "==", auth.currentUser.uid),
          orderBy("timestamp", "asc")
        );
        const tasksSnapshot = await getDocs(tasksQuery);
        const userTasks = [];
        tasksSnapshot.forEach((doc) => {
          userTasks.push(doc.data().task);
        });
        setData(userTasks);
      }
    };

    fetchUserData();
  }, []);

  // Logout user
  const logoutUser = () => {
    signOut(auth);
  };

  // Handle input change
  const getInput = (e) => {
    setInitial(e.target.value);
  };

  // Add task and save to Firestore
  const getData = async () => {
    let storeData = [...data, initial];
    setData(storeData);
    setInitial("");

    try {
      const tasksCollection = collection(db, "tasks");
      await addDoc(tasksCollection, {
        task: initial,
        userId: auth.currentUser.uid, 
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  // Delete task (currently only deletes from UI, not from Firestore)
  const deleteTask = (ind) => {
    let filterData = data.filter((curEle, id) => {
      return id !== ind;
    });
    setData(filterData);
  };

  return (
    <div className="userTodo">
      <nav className="navbar">
        <div className="logo">
          <h1>{userData ? userData.user_name : "Loading..."}</h1>
        </div>
        <div className="user_detail">
          <div className="user_profile">
            <img
              src={userData ? userData.user_profile : ""}
              alt={userData ? userData.user_name : "User"}
            />
          </div>
          <div className="logout_user">
            <button
              onClick={logoutUser}
              type="submit"
              className="logout_btn btn btn-dark"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="todo_task">
          <div className="input_task">
            <input
              type="text"
              placeholder="Add Your Task..."
              value={initial}
              onChange={getInput}
            />
            <button onClick={getData}>Add</button>
          </div>
          {data.map((curVal, index) => {
            return (
              <div className="task_list" key={index}>
                <p>{curVal}</p>
                <i
                  id="deleteIcon"
                  onClick={() => deleteTask(index)}
                  className="fa-solid fa-trash"
                ></i>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todo;
