import { Routes, Route } from "react-router-dom";
import CreatePostPopup from "./components/createPostPopup";

import Home from "./pages/home";
import Activate from "./pages/home/activate";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Reset from "./pages/reset";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";

//useReducer HOOK
function reducer(state, action) {
  switch (action.type) {
    case "POSTS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "POSTS_SUCCESS":
      return { ...state, loading: false, posts: action.payload, error: "" };
    case "POSTS_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function App() {
  //controlling the create post popup state visibility
  const [createPostVisible, setCreatePostVisible] = useState(false);

  //retrieving the user state from the redux store so we can pass it to other components that needs it
  const { user } = useSelector((state) => ({ ...state }));

  //controlling posts state using useReducer HOOK
  const initialState = {
    loading: false,
    posts: [],
    error: "",
  };
  const [{ loading, error, posts }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    getAllPosts();
  }, [user]);
  const getAllPosts = async () => {
    try {
      dispatch({ type: "POSTS_REQUEST" });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({ type: "POSTS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error?.response?.data?.message,
      });
    }
  };
  // console.log("posts : ", posts);
  return (
    <div>
      {createPostVisible && user && (
        <CreatePostPopup
          user={user}
          setCreatePostVisible={setCreatePostVisible}
        />
      )}
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/"
            element={
              <Home setCreatePostVisible={setCreatePostVisible} posts={posts} />
            }
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
          <Route path="/profile" element={<Profile />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} exect />
      </Routes>
    </div>
  );
}

export default App;
