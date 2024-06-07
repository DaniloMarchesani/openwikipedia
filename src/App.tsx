import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar";
import GettingStartedPage from "./pages/GettingStarted";
import DocsPage from "./pages/Docs";
import ArticlePageSample from "./pages/ArticlePageSample";
import RegisterPage from "./pages/auth/RegisterPage";
import { ToastContainer } from "react-toastify";
import { useTheme } from "./context/ThemeProvider";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {  

  const { theme }= useTheme();

  return (
    <div className="min-h-screen flex flex-col justify-between items-center dark:bg-black dark:text-slate-200 antialiased">
      <div className="flex w-full md:p-12 p-4">
        <Navbar />
      </div>
      <main className="md:p-16 p-6 w-full text-center flex flex-col justify-center items-center grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/articles" element={<ArticlePageSample />} />
          <Route path="/about" element={<About />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/getting-started" element={<GettingStartedPage />} />
          <Route path="/dashboard" element={<ProtectedRoutes />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="p-10 text-base-content rounded text-center">
        <p>
          Copyright © 2024 - An Open source project made with 💖 by <Link to={"https://github.com/DaniloMarchesani"} className="underline italic">Danilo
          Marchesani</Link> 🐱‍👤
        </p>
      </footer>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"} 
      />
    </div>
  );
}

export default App;
