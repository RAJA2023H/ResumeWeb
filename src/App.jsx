import styles from './App.module.css';
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { About } from "./components/About/About";
import { Experience } from './components/Experience/Experience';
import { Projects } from './components/Projects/Projects';
import { Contact } from './components/Contact/Contact';
import Blog from './components/Blog/Blog';
import Privacy from './components/Policy/Privacy'; 
import { init } from '@emailjs/browser';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {
  useEffect(() => {
    init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  return (
    <Router>
      <div className={styles.App}>
        <Navbar />
        <Routes>
          {/* Homepage route with Hero and other sections */}
          <Route path="/" element={
            <>
              <Hero />
              <About id="about" />
              <Experience id="experience" />
              <Projects id="projects" />
              <Contact id="contact" />
            </>
          } />
          {/* Separate routes for Blog and Privacy */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;