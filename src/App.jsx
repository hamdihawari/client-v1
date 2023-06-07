import './App.css'
import Sidebar from './User/components/Sidenav/Sidebar'
import About from './User/pages/About/About'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Project from './User/pages/Project/Project'
import Photography from './User/pages/Photography/Photography'
import Portrait from './User/pages/Photography/Portrait/Portrait'
import Landscape from './User/pages/Photography/Landscape/Landscape'
import Contact from './User/pages/Contact/Contact'
import Error from './User/pages/Error/Error'
import Street from './User/pages/Photography/Street/Street'

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes >
         {/*  <Switch> */}
            <Route path="/" exact element={<About />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/project" element={< Project />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/portrait" element={<Portrait />} />
            <Route path="/street" element={<Street />} />
            <Route path="/landscape" element={<Landscape />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Error />} />
          {/* </Switch> */}
        </Routes>
      </Router>
    </div>
  );
}
export default App
