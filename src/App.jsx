import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./Home";
import Navbar from "./components/Navbar";
import Preloader from "./components/preloader";
import About from "./components/About";
import MTGSchedule from "./components/MTGSchedule";
import Menu from "./components/Menu";
import Feedback from "./components/Feedback.jsx";
import Press from "./components/Press";
import Reservation from "./components/Reservation.jsx";
import BoardGames from "./components/BoardGames.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Router>
      {loading ? (
        <Preloader />
      ) : (
        <section className="home">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mtgschedule" element={<MTGSchedule />} />
            <Route path="/press" element={<Press />} />
            <Route path="/menu" element={<Menu />} />
            {/* <Route path="/giftcards" element={<Giftcards />} /> */}
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/press" element={<Press />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/boardgames" element={<BoardGames />} />
          </Routes>

          {window.location.pathname !== "/menu" && <Footer />}
        </section>
      )}
    </Router>
  );
}

export default App;
