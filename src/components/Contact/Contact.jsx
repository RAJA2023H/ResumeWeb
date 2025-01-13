import React from "react";
import { ContactForm } from "./ContactForm";
import styles from "./Contact.module.css";
import emailIcon from '../../../src/assets/contact/emailIcon.png';
import linkedinIcon from '../../../src/assets/contact/linkedinIcon.png';
import githubIcon from '../../../src/assets/contact/githubIcon.png';


export const Contact = () => {
    console.log("Contact Component Rendering");
    return (
        <footer id="contact" className={styles.container}>
            <div className={styles.text}>
                <h2>Contact</h2>
                <p>Feel free to reach out for collaboration</p>
            </div>
            <div className={styles.formSection}>
                <ContactForm />
            </div>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <img src={emailIcon} alt="Email icon" />
                    <a href="mailto:hemmanyrajae@gmail.com">hemmanyrajae@gmail.com</a>
                </li>
                <li className={styles.link}>
                    <img
                        src={linkedinIcon}
                        alt="LinkedIn icon"
                    />
                    <a href="https://www.linkedin.com/in/rajae-hemmany-441869251">linkedin.com/rajae-hemmany</a>
                </li>
                <li className={styles.link}>
                    <img src={githubIcon} alt="Github icon" />
                    <a href="https://github.com/RAJA2023H">github.com/RAJA2023H</a>
                </li>
            </ul>
        </footer>
    );   
};