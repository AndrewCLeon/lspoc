import { Navbar } from "./components/navbar/Navbar";
import { Routes } from "./pages";
import { AuthLoader } from "./loaders/authLoader";
import { CharacterLoader } from "./loaders/characterLoader";
import { FabCollection } from "./components/fabCollection/FabCollection";
import "./App.css";

function App() {
  return (
    <>
      <AuthLoader />
      <CharacterLoader />
      <Navbar />
      <div className="container">
        <Routes />
      </div>
      <FabCollection />
    </>
  );
}

export default App;
