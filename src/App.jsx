import './App.css';
import './fonts/fonts.css';
import Sidebar from './User/components/Sidenav/Sidebar';
import About from './User/pages/About/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portrait from './User/pages/Photography/Portrait/Portrait';
import Landscape from './User/pages/Photography/Landscape/Landscape';
import Contact from './User/pages/Contact/Contact';
import Error from './User/pages/Error/Error';
import Street from './User/pages/Photography/Street/Street';
import { Footer } from './User/pages/Footer/Footer';
import { Header } from './User/components/Header/Header';
import Gallery from './User/components/Gallery/Gallery/Gallery';
import ProjectList from "./User/pages/Project/ProjectCardList/ProjectCardList.jsx";
import ProjectDetails from './User/pages/Project/ProjectDetails/ProjectDetails.jsx'; // Import the ProjectDetails component

function App() {
  return (
      <div className="App">
        <Router>
          <Header />
          <Sidebar />
          <div className='app-container'>
            <Routes>
              <Route path="/" exact element={<About />} />
              <Route path="/about" exact element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/project" element={<ProjectList />} />
              <Route path="/project/:id" element={<ProjectDetails />} /> {/* Add this route */}
              <Route path="/portrait" element={<Portrait />} />
              <Route path="/street" element={<Street />} />
              <Route path="/landscape" element={<Landscape />} />
              <Route path="/landscape/:_gallery/:index?" element={<Gallery />} />
              <Route path="/street/:_gallery/:index?" element={<Gallery />} />
              <Route path="/portrait/:_gallery/:index?" element={<Gallery />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
  );
}

export default App;

/*
import './App.css';
import './fonts/fonts.css';
import Sidebar from './User/components/Sidenav/Sidebar';
import About from './User/pages/About/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portrait from './User/pages/Photography/Portrait/Portrait';
import Landscape from './User/pages/Photography/Landscape/Landscape';
import Contact from './User/pages/Contact/Contact';
import Error from './User/pages/Error/Error';
import Street from './User/pages/Photography/Street/Street';
import { Footer } from './User/pages/Footer/Footer';
import { Header } from './User/components/Header/Header';
import Gallery from './User/components/Gallery/Gallery/Gallery';
import Project from './User/pages/Project/Project/Project.jsx';
import ProjectDetails from './User/pages/Project/ProjectDetails/ProjectDetails';
import ProjectItem from "./User/pages/Project/ProjectItem/ProjectItem.jsx";

function App() {
  return (
      <div className="App">
        <Router>
          <Header />
          <Sidebar />
          <div className='app-container'>
            <Routes>
              <Route path="/" exact element={<About />} />
              <Route path="about" exact element={<About />} />
              <Route path="project" element={<Project />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="portrait" element={<Portrait />} />
              <Route path="street" element={<Street />} />
              <Route path="landscape" element={<Landscape />} />
              <Route path="/landscape/:_gallery/:index?" element={<Gallery />} />
              <Route path="/street/:_gallery/:index?" element={<Gallery />} />
              <Route path="/portrait/:_gallery/:index?" element={<Gallery />} />
              <Route path="/project/:id" component={<ProjectItem />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
  );
}

export default App;
*/
