import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link as ScrollLink } from "react-scroll"; // For scrolling to sections on the same page
import { Link as RouterLink, useLocation } from "react-router-dom"; // For navigation between pages
import closeMenu from '../../../src/assets/nav/closeMenu.png';
import openMenu from '../../../src/assets/nav/openMenu.png';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // To get the current route
  
  // Check if we are on the home page or not
  const isHomePage = location.pathname === '/';

  return (
    <nav className={styles.navbar}>
      {/* Link to Home Page */}
      {isHomePage ? (
        <ScrollLink className={styles.title} to="hero" smooth={true} duration={500}>
          Home
        </ScrollLink>
      ) : (
        <RouterLink className={styles.title} to="/">
          Home
        </RouterLink>
      )}
      
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={menuOpen ? closeMenu : openMenu}
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          {/* Conditional rendering for scrolling or linking */}
          <li>
            {isHomePage ? (
              <ScrollLink to="about" smooth={true} duration={500}>
                About
              </ScrollLink>
            ) : (
              <RouterLink to="/">About</RouterLink>
            )}
          </li>
          <li>
            {isHomePage ? (
              <ScrollLink to="experience" smooth={true} duration={500}>
                Experience
              </ScrollLink>
            ) : (
              <RouterLink to="/">Experience</RouterLink>
            )}
          </li>
          <li>
            {isHomePage ? (
              <ScrollLink to="projects" smooth={true} duration={500}>
                Projects
              </ScrollLink>
            ) : (
              <RouterLink to="/">Projects</RouterLink>
            )}
          </li>
          <li>
            {isHomePage ? (
              <ScrollLink to="contact" smooth={true} duration={500}>
                Contact
              </ScrollLink>
            ) : (
              <RouterLink to="/">Contact</RouterLink>
            )}
          </li>
          {/* Standard RouterLink for Blog and Privacy */}
          <li>
            <RouterLink to="/blog">Blog</RouterLink>
          </li>
          <li>
            <RouterLink to="/privacy">Privacy</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};