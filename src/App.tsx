import {  Routes, Route, HashRouter } from "react-router-dom";
import Second from "./pages/second";
import Main from "./pages/main";
import MainAdmin from "./pages/main/admin";
import SecondAdmin from "./pages/second/admin";
import Search from "./pages/search";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"  element={<Search />} />
        <Route path="/main/admin" element={<MainAdmin />} />
        <Route path="/second" element={<Second />} />
        <Route path="/main" element={<Main />} />
        <Route path="/second/admin" element={<SecondAdmin />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
