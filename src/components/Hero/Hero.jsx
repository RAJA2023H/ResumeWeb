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
                <p className={styles.description}>I am an ALX student specializing in FrontEnd development, embarking on a structured and immersive journey to master essential skills</p>
                <a href="mailto:hemmanyrajae@gmail.com" className={styles.contactBtn}>
                    Contact Me
                </a>
            </div>
            <div>
                <p>Debugging Hero Section</p>
            </div>
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