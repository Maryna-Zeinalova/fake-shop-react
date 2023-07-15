import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Details from "./Details";

const root = ReactDOM.createRoot(document.getElementById("root"));
const currency = "USD";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App currency={currency} />,
  },
  {
    path: "/Details/:id",
    element: <Details />,
  },
]);
root.render(
  <React.StrictMode>
    <header>SH</header>
    <RouterProvider router={router} />
    <footer>HM</footer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
