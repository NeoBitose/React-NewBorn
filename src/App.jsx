import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import ClickSpark from './components/ClickSpark';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import { useTheme } from "./hooks/useTheme";
import About from "./pages/About";
import Blog from "./pages/Blog";
import DetailBlog from "./pages/DetailBlog";
import DetailPortfolio from "./pages/DetailPortfolio";
import DetailProgramKerja from "./pages/DetailProgramKerja";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import ProgramKerja from "./pages/ProgramKerja";
import Staf from "./pages/Staf";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 menit
      gcTime: 1000 * 60 * 10, // 10 menit (cache time)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

function AppContent() {
  const location = useLocation();

  const validPaths = ["/", "/proker", "/about", "/blog", "/staf", "/portfolio"];
  const is404Page = !validPaths.some(path => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  });

  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={100}
    >
      {!is404Page && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proker" element={<ProgramKerja />} />
        <Route path="/proker/:slug" element={<DetailProgramKerja />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<DetailBlog />} />
        <Route path="/staf" element={<Staf />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<DetailPortfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!is404Page && <Footer />}
    </ClickSpark>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(false);
  const isDark = useTheme();

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      setShowSplash(true);
      sessionStorage.setItem("hasSeenSplash", "true");
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, [isDark]);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: localStoragePersister,
        maxAge: 1000 * 60 * 10, // 10 menit
      }}
    >
      <Router>
        <AppContent />
      </Router>
    </PersistQueryClientProvider>
  );
}

export default App;
