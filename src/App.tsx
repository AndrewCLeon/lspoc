import { Routes } from "./pages";
import { AuthLoader } from "./loaders/authLoader";
import { CharacterLoader } from "./loaders/characterLoader";
import "./App.css";

function App() {
  return (
    <>
      <AuthLoader />
      <CharacterLoader />
      <Routes />
    </>
  );
}

export default App;
