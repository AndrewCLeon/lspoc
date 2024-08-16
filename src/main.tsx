import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { OpenAIAgent } from "./clients/OpenAI/OpenAI.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./store/store.ts";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import "material-design-icons/iconfont/material-icons.css";
import "./index.scss";

(window as any).OpenAI = OpenAIAgent;
(window as any).store = store;

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

// TODO: [✅] - Configure materialize.css
// TODO: [  ] - Configure material icons (some icons package)
// TODO: [  ] - Add ability to upload a file (notes)
// TODO: [  ] - Keep track of uploaded files
// TODO: [  ] - Process uploaded files

/*
    Components
        Navbar (HoC)
            BreadCrumbs
            LoreSquire Book
            Hamburger
        Common
            Container? (For padding around content (to stay consistent with the rest of the app))
            "Add"/+ Button/Icon circle
            Button (Ok, Save, Cancel) (Primary, Secondary, Danger)
            
            Checkbox (Left and Right label)
            
            Input (Text, Number)

            DropDown
                Character Selector
            Adventure Card

            Entry ListItem Container
                Entry ListItem
            
            Modal Container
                Add Character Modal
                Add Adventure Modal
                Create Character Modal
        Pages
            Login
            Home
            Adventure

*/

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="lspoc">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
