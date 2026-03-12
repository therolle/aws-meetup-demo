import React from "react";
import ReactDOM from "react-dom/client";
import { Authenticator } from "@aws-amplify/ui-react";
import { RouterProvider } from "@tanstack/react-router";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { router } from "./router";
import "@aws-amplify/ui-react/styles.css";
import "./index.css";

Amplify.configure(outputs);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Authenticator>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </Authenticator>
    </ThemeProvider>
  </React.StrictMode>,
);
