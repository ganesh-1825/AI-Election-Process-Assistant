import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import TimelinePage from "./pages/TimelinePage";
import GuidePage from "./pages/GuidePage";
import QuizPage from "./pages/QuizPage";
import FAQPage from "./pages/FAQPage";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App" data-testid="app-root">
      <BrowserRouter>
        <Navbar />
        <main className="min-h-[calc(100vh-160px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
