import "./App.css";
import Signup from "./Signup-Page/Signup.jsx";
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Login from "./Login-Page/login.jsx";
import Todo from "./Todo-Page/Todo.jsx";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Signup/>
    },
    {
      path: "/Login-Page",
      element: <Login/>
    },
    {
      path: "/Todo-Page",
      element: <Todo/>
    }
  ])
  return <>
  <div className="App">
    <RouterProvider router={route}></RouterProvider>

  </div>
  </>;
}
export default App;
