import React from "react";

import styles from "./Experience.module.css";
import skills from "../../data/skills.json";
import history from "../../data/history.json";
import alxLogo from '../../../src/assets/history/alx.jpg';

import cIcon from '../../../src/assets/skills/c.svg';
import htmlIcon from '../../../src/assets/skills/html.png';
import cssIcon from '../../../src/assets/skills/css.png';
import reactIcon from '../../../src/assets/skills/react.png';
import nodeIcon from '../../../src/assets/skills/node.png';
import javascriptIcon from '../../../src/assets/skills/javascript.svg';
import typescriptIcon from '../../../src/assets/skills/typescript.svg';
import gitIcon from '../../../src/assets/skills/git.svg';
import pythonIcon from '../../../src/assets/skills/python.svg';
import mysqlIcon from '../../../src/assets/skills/mysql.svg';
import linuxIcon from '../../../src/assets/skills/linux.svg';

const imagesMap = {
    "skills/c.svg": cIcon,
    "skills/html.png": htmlIcon,
    "skills/css.png": cssIcon,
    "skills/react.png": reactIcon,
    "skills/node.png": nodeIcon,
    "skills/javascript.svg": javascriptIcon,
    "skills/typescript.svg": typescriptIcon,
    "skills/git.svg": gitIcon,
    "skills/python.svg": pythonIcon,
    "skills/mysql.svg": mysqlIcon,
    "skills/linux.svg": linuxIcon,
    "history/alx.jpg": alxLogo,
};

export const Experience = () => {
    return (
        <section className={styles.container} id="experience">
            <h2 className={styles.title}>Experience</h2>
            <div className={styles.content}>
                <div className={styles.skills}>
                    {skills.map((skill, id) => {
                        return (
                        <div key={id} className={styles.skill}>
                            <div className={styles.skillImageContainer}>
                                <img src={imagesMap[skill.imageSrc]} alt={skill.title} />
                            </div>
                                <p>{skill.title}</p>
                        </div>
                        );
                    })}
                </div>
                <ul className={styles.history}>
                    {history.map((historyItem, id) => {
                        return (
                        <li key={id} className={styles.historyItem}>
                            <img
                            src={imagesMap[historyItem.imageSrc]}
                            alt={`${historyItem.organisation} Logo`}
                            />
                            <div className={styles.historyItemDetails}>
                                <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                                <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                                <ul>
                                    {historyItem.experiences.map((experience, id) => {
                                        return <li key={id}>{experience}</li>;
                                    })}
                                </ul>
                            </div>
                        </li>
                    );
                })}
                </ul>
            </div>
        </section>
        
    );
};