import React from "react";

import styles from "./Hero.module.css";
import heroImage from "../../../src/assets/hero/heroImage.jpg";


export const Hero = () => {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Hi, I'm Rajae Hemmany</h1>
                <p className={styles.description}> Student at ALX | Front-End Software Engineer | Lifelong learner | React passionate</p>
                <a href="mailto:rhemmany@gmail.com" className={styles.contactBtn}>
                    EMAIL ME DIRECTLY
                </a>
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