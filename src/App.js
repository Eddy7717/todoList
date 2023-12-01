import "./assets/styles/App.scss";
import Layout from "./components/Layout.js";
import Home from "./pages/Home.js";
import Contact from "./pages/Contact.js";
import Error from "./pages/Error.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <div className="content">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="contact" element={<Contact />} />

                {/* Error page */}
                <Route path="*" element={<Error />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
