import React from "react";
import styles from "./ProjectCard.module.css";
import projectAImage from '../../../src/assets/projects/project.jpg';
import projectBImage from '../../../src/assets/projects/project.jpg';
import projectCImage from '../../../src/assets/projects/project.jpg';

import { getImageUrl } from "../../utils";

const imagesMap = {
  "projects/project.jpg": projectAImage,
};

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source },
}) => {
  return (
    <div className={styles.container}>
      <img
        src={imagesMap[imageSrc]}
        alt={`Image of ${title}`}
        className={styles.image}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => {
          return (
            <li key={id} className={styles.skill}>
              {skill}
            </li>
          );
        })}
      </ul>
      <div className={styles.links}>
        <a href={demo} className={styles.link}>
          Demo
        </a>
        <a href={source} className={styles.link}>
          Source
        </a>
      </div>
    </div>
  );
};