import styles from './App.module.css';
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { About } from "./components/About/About";
import { Experience } from './components/Experience/Experience';
import { Projects } from './components/Projects/Projects';
import { Contact } from './components/Contact/Contact';
import { init } from '@emailjs/browser';
import React, { useEffect } from 'react';


function App() {
  useEffect(() => {
    init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  return (
    <div className={styles.App}>
      <Navbar />
      <Hero />
      <About />
      <Experience/>
      <Projects/>
      <Contact/>
      
    </div>
  );
}

export default App;