import { Navbar } from "./components/navbar/Navbar";
import { Routes } from "./pages";
import { FabCollection } from "./components/fabCollection/FabCollection";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes />
      </div>
      <FabCollection />
    </>
  );
}

export default App;
