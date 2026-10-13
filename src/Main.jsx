import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { RouterProvider } from "react-router-dom";
import myRoutes from "./Routes/routes";
import AuthContextApi from "./Context/AuthContextApi";
import FetchUserContext from "./Context/FetchUserContext";
import AudioPlayerContext from "./Context/AudioPlayerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthContextApi>
      <FetchUserContext>
        <AudioPlayerContext>
          <RouterProvider router={myRoutes} />
        </AudioPlayerContext>
      </FetchUserContext>
    </AuthContextApi>
  </>
);
