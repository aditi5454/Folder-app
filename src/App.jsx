import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import NewComp from "./components/newcomp/NewComp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:folderName" element={<NewComp />}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
