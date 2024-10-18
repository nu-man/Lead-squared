import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Easy from "./components/Easy.js";
import Medium from "./components/Medium.js";
import Hard from "./components/Hard.js";

function App() {
  const [loading, setLoading] = useState(false);
  const showloading = (status) => {
    setLoading(status);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/easy"
            element={<Easy loading={loading} showloading={showloading} />}
          />
          <Route
            path="/medium"
            element={<Medium loading={loading} showloading={showloading} />}
          />
          <Route
            path="/hard"
            element={<Hard loading={loading} showloading={showloading} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
