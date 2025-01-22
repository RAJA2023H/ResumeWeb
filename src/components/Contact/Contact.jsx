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
                <p>Feel free to reach out for collaboration</p>
                <div className={styles.formSection}>
                    <ContactForm />
                </div>
                <ul className={styles.links}>
                    <li className={styles.link}>
                        <a href="mailto:rhemmany@gmail.com">
                            <img src={emailIcon} alt="Email icon" />
                         </a>
                    </li>
                    <li className={styles.link}>
                        <a href="https://www.linkedin.com/in/rajae-hemmany-441869251" target="_blank" rel="noopener noreferrer">
                            <img src={linkedinIcon} alt="LinkedIn icon" />
                        </a>
                    </li>
                    <li className={styles.link}>
                        <a href="https://github.com/RAJA2023H" target="_blank" rel="noopener noreferrer">
                            <img src={githubIcon} alt="Github icon" />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );   
};