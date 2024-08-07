import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Stages: PoC -> MVP -> v1
// PoC:
// - WebSite hosted
// - Can upload a file / paste notes
// - Can choose which model to use

// - Figure out how to process the notes
//   - Pass notes to model as instructions?
//   - Upload notes to data source and pull through (functions)
//   - Upload file to agent/model as knowledge base

// -

// TODO: [  ] - Configure materialize.css
// TODO: [  ] - Configure material icons (some icons package)
// TODO: [  ] - Add ability to upload a file (notes)
// TODO: [  ] - Keep track of uploaded files
// TODO: [  ] - Process uploaded files

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
