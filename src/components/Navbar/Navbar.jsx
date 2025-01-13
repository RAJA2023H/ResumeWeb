import React, { useState } from "react";
import { useFullscreen } from "../../hooks/useFullscreen";
import { Maximize2, Minimize2 } from "lucide-react"
import styles from "./Navbar.module.css";
import closeMenu from '../../../src/assets/nav/closeMenu.png';
import openMenu from '../../../src/assets/nav/openMenu.png';


export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isFullscreen, toggleFullscreen } = useFullscreen();
    
    return (
        <nav className={styles.navbar}>
            <a className={styles.title} href="/">
                Portfolio
            </a>
            <div className={styles.menu}>
                <img
                    className={styles.menuBtn}
                    src={
                        menuOpen
                            ? closeMenu
                            : openMenu
                    }
                    alt="menu-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                />
                <ul
                    className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
                    onClick={() => setMenuOpen(false)}
                >
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#experience">Experience</a>
                    </li>
                    <li>
                        <a href="#projects">Projects</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                    <li>
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                toggleFullscreen();
                            }}
                            className={styles.fullscreenBtn}
                        >
                            {isFullscreen ? (
                                <Minimize2 className={styles.fullscreenIcon} />
                            ) : (
                                <Maximize2 className={styles.fullscreenIcon} />
                            )}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};