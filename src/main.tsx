import React from "react";
import ReactDOM from "react-dom/client";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import "@aws-amplify/ui-react/styles.css";
import "./index.css";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Authenticator>
        <App />
      </Authenticator>
    </ThemeProvider>
  </React.StrictMode>
);
