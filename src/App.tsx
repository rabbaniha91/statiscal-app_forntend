import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Toaster } from "./components/ui/toaster";
import BasicStatiscalContent from "./pages/BasicStatiscalPage";

function App() {
  return (
    <section className=" bg-slate-50 dark:bg-slate-950">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Auth />}
          />
          <Route
            path="/tools"
            element={<BasicStatiscalContent />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </section>
  );
}

export default App;
