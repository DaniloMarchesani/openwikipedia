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
import RenderArticle from "./pages/dashboard/RenderArticle";
import Article from "./pages/dashboard/Article";
import { Toaster } from "./components/ui/toaster";
import AdvancedSearchPage from "./pages/dashboard/AdvancedSearchPage";
import Explorer from "./pages/dashboard/Explorer";
import ProfilePage from "./pages/dashboard/ProfilePage";


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
    <div>
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
            <Route path="explorer" element={<Explorer />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="advanced-search" element={<AdvancedSearchPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="article/:title" element={<RenderArticle />} />
            <Route path="saved-article/:title" element={<Article />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
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
