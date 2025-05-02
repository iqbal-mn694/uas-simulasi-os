import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import ProcessManager from "./Pages/Process";
import MemoryManager from "./Pages/Memory";
import Footer from "./components/Footer";
import About from "./Pages/About";

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="mx-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/process" element={<ProcessManager />} />
                        <Route path="/memory" element={<MemoryManager />} />
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
};

export default App;
