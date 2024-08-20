import React from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  addDoc,
  collection,
  db,
} from "../firebase";

const Signup = () => {
  const navigate = useNavigate();

  const SignupUser = async (e) => {
    e.preventDefault();
    const user_profile = e.target[0].files[0];
    const user_name = e.target[1].value;
    const user_email = e.target[2].value;
    const user_password = e.target[3].value;
    const user_confirm_password = e.target[4].value;

    if (!CheckFile(user_profile)) return;
    if (user_password !== user_confirm_password) {
      Swal.fire("Passwords do not match!");
      return;
    }

    try {
      // Sign up the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user_email,
        user_password
      );
      const user = userCredential.user;
      const userSignupInfo = {
        user_name,
        user_email,
        user_password,
      };

      // Upload the user's profile picture
      const storage = getStorage();
      const userRef = ref(storage, `${user.uid}/${user_profile.name}`);

      try {
        const snapshot = await uploadBytes(userRef, user_profile);
        console.log("File uploaded!");

        // Get the download URL of the uploaded file
        const url = await getDownloadURL(userRef);
        console.log(url);
        userSignupInfo.user_profile = url;

        // Store the user info in Firestore
        const userCollection = collection(db, "users");
        const docRef = await addDoc(userCollection, userSignupInfo);
        console.log("Document written with ID: ", docRef.id);
        navigate("/Login-Page");
      } catch (storageError) {
        Swal.fire("Error uploading file: " + storageError.message);
      }
    } catch (authError) {
      Swal.fire("Error signing up: " + authError.message);
    }
  };

  return (
    <div className="addUser">
      <h3>Sign Up</h3>
      <form onSubmit={SignupUser} className="addUserForm">
        <div className="inputGroup">
          <label className="user_profile" htmlFor="user_profile"></label>
          <input type="file" autoComplete="off" id="user_profile" />
          <span>
            <i className="fa-solid fa-camera"></i>
          </span>
          <label htmlFor="user_name">Name :</label>
          <input
            type="text"
            autoComplete="off"
            id="user_name"
            placeholder="Enter your name"
            required
          />
          <label htmlFor="user_email">Email :</label>
          <input
            type="email"
            autoComplete="off"
            id="user_email"
            placeholder="Enter your email"
            required
          />
          <label htmlFor="user_password">Password :</label>
          <input
            type="password"
            autoComplete="off"
            id="user_password"
            placeholder="Password"
            required
          />
          <label htmlFor="user_confirm_password">Confirm Password :</label>
          <input
            type="password"
            autoComplete="off"
            id="user_confirm_password"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="button_box">
          <button type="submit" className="btn btn-success">
            SIGNUP
          </button>
        </div>
      </form>
      <div className="Login_user">
        <p>Have an account? </p>
        <Link to="/Login-Page" className="btn btn-primary">
          LOGIN
        </Link>
      </div>
    </div>
  );
};

function CheckFile(pic) {
  if (!pic) {
    Swal.fire("Please upload your profile picture.");
    return false;
  }
  return true;
}

export default Signup;
