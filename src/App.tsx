import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/auth/Register";
import GettingStartedPage from "./pages/GettingStarted";
import DocsPage from "./pages/Docs";
import ArticlePageSample from "./pages/ArticlePageSample";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center dark:bg-black dark:text-slate-200 antialiased">
      <div className="flex w-full md:p-12 p-4">
        <Navbar />
      </div>
      <main className="md:p-16 p-6 w-full text-center flex flex-col justify-center items-center grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/articles" element={<ArticlePageSample />} />
          <Route path="/about" element={<About />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/getting-started" element={<GettingStartedPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="p-10 text-base-content rounded text-center">
        <p>
          Copyright © 2024 - An Open source project made with ❤
          by Danilo Marchesani 🐱‍👤
        </p>
      </footer>
    </div>
  );
}

export default App;
