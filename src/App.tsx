import { Navbar } from "./components/navbar/Navbar";
import { Routes } from "./pages";
import { FabCollection } from "./components/fabCollection/FabCollection";
import { AuthLoader } from "./loaders/authLoader";
import "./App.css";

function App() {
  // Migrate this to some kind of loader component

  return (
    <>
      <AuthLoader />
      <Navbar />
      <div className="container">
        <Routes />
      </div>
      <FabCollection />
    </>
  );
}

export default App;
