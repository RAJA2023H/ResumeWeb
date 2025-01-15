import React from "react";

import styles from "./Hero.module.css";
import heroImage from "../../../src/assets/hero/heroImage.jpg";
import emailIcon from '../../../src/assets/contact/emailIcon.png';
import linkedinIcon from '../../../src/assets/contact/linkedinIcon.png';
import githubIcon from '../../../src/assets/contact/githubIcon.png';


export const Hero = () => {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Hi, I'm Rajae</h1>
                <p className={styles.description}> Front-End Software Engineer Student at ALX | Lifelong learner | React passionate developer from Morocco </p>
                <a href="mailto:hemmanyrajae@gmail.com" className={styles.contactBtn}>
                    Contact Me
                </a>
            </div>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <a href="mailto:hemmanyrajae@gmail.com">
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
            <img
                src={heroImage}
                alt="Hero image of me"
                className={styles.heroImg}
            />
            <div className={styles.topBlur} />
            <div className={styles.bottomBlur} />
        </section>
    );
};