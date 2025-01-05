import React from "react";

import styles from "./About.module.css";
import aboutImage from '../../../src/assets/About/aboutImage.png';
import cursorIcon from '../../../src/assets/About/cursorIcon.png';


export const About = () => {
    return (
        <section className={styles.container} id="about">
            <h2 className={styles.title}>About</h2>
            <div className={styles.content}>
                <img
                src={aboutImage}
                alt="Alx SE icon"
                className={styles.aboutImage}
                />
                <ul className={styles.aboutItems}>
                    <li className={styles.aboutItem}>
                        <img src={cursorIcon} alt="Cursor icon" />
                        <div className={styles.aboutItemText}>
                            <h3>Software Development</h3>
                            <p>
                                Developed proficiency in C and Python, mastering data structures, algorithms, and memory management.
                            </p>
                        </div>
                    </li>
                    <li className={styles.aboutItem}>
                        <img src={cursorIcon} alt="Server icon" />
                        <div className={styles.aboutItemText}>
                            <h3>Web Development and Deployment</h3>
                            <p>
                            Built and deployed web applications using HTML, CSS, Flask, JavaScript, Nginx, and Gunicorn.
                            </p>
                        </div>
                    </li>
                    <li className={styles.aboutItem}>
                        <img src={cursorIcon} alt="Server icon" />
                        <div className={styles.aboutItemText}>
                            <h3>Systems Engineering and DevOps</h3>
                            <p>
                                Gained expertise in systems engineering, databases (SQL/MySQL), and DevOps tools like Puppet.
                            </p>
                        </div>
                    </li>
                    <li className={styles.aboutItem}>
                        <img src={cursorIcon} alt="Server icon" />
                        <div className={styles.aboutItemText}>
                            <h3>Front-end specialization</h3>
                            <p>
                                Specialized in modern front-end development with expertise in JavaScript (ES6), TypeScript, React, and responsive design.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};