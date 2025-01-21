import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Translator } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Translator />
  </StrictMode>
);
