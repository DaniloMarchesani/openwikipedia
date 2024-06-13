import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import GettingStartedPage from "./pages/GettingStarted";
import DocsPage from "./pages/Docs";
import ArticlePageSample from "./pages/ArticlePageSample";
import RegisterPage from "./pages/auth/RegisterPage";
import { ToastContainer } from "react-toastify";
import { useTheme } from "./context/ThemeProvider";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Layout from "./components/Layout";
import { useEffect } from "react";
import axios from "axios";
import { TUser } from "./lib/types";
import { useAuth } from "./context/AuthContext";
import ArticleSpec from "./pages/dashboard/ArticleSpec";
import RenderArticle from "./pages/dashboard/RenderArticle";

const { VITE_BACKEND_URI } = import.meta.env;

function App() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();


  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if(!token) {
        navigate("/login", { replace: true });
    } else {
      axios.get<TUser>(`${VITE_BACKEND_URI}/api/user/`, { headers: { Authorization: `Bearer ${token}`}})
      .then(response => {
          login(response.data);
      })
      .catch(error => {
          console.log(error);
          navigate("/login", { replace: true });
      })
    }
    console.log("TOKEN: " + token);

}, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/articles" element={<ArticlePageSample />} />
          <Route path="/about" element={<About />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/getting-started" element={<GettingStartedPage />} />
          <Route index element={<Home />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoutes />}>
            <Route index element={<Dashboard />} />
            <Route path="articles" element={<p>articles here!!</p>} />
            <Route path="spec" element={<ArticleSpec />} />
            <Route path="*" element={<NotFound />} />
            <Route path="article/:title" element={<RenderArticle />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
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
    </>
  );
}

export default App;
