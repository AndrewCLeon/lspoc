import { Navbar } from "./components/navbar/Navbar";
import { Routes } from "./pages";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes />
      </div>
    </>
  );
}

export default App;
