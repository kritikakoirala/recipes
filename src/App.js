import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeDetail from "./pages/RecipeDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/detail" element={<RecipeDetail />} />
      </Routes>
    </>
  );
}

export default App;
