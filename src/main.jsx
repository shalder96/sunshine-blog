import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import { AuthLayout, Login} from "./components/index.js";
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Home  */}
      <Route index element={<Home />} />
      {/* Auth routes - login not required */}
      <Route element={<AuthLayout authentication={false} />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      {/* login required */}
      <Route element={<AuthLayout authentication={true} />}>
        <Route path="all-posts" element={<AllPosts />} />
        <Route path="add-post" element={<AddPost />} />
        <Route path="edit-post/:slug" element={<EditPost />} />
      </Route>
      <Route path="post/:slug" element={<Post />} />
    </Route>,
  ),
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
