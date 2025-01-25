import React from 'react';
import styles from './Privacy.module.css';
import { ContactForm } from "../Contact/ContactForm";

const Privacy = () => {
  return (
    <>
      <div className={styles.policyContainer} id="Privacy">
        <h1>Privacy Policy</h1>
        <p>This is a temporary privacy policy for our application.</p>
        <p>We do not collect sensitive user data or use external tracking.</p>
        <p>We are working on adding more detailed privacy terms as our application evolves.</p>
      </div>
      <footer className={styles.container}>
        <div className={styles.text}>
          <p>Feel free to reach out</p>
          <div className={styles.formSection}>
            <ContactForm />
          </div>
        </div>
        <div className={styles.projectNote}>
          <p>This web page is part of ALX Specializations Portfolio Project</p>
          <p>Project done in teams of 1 people : Rajae Hemmany</p>
        </div>
      </footer>
    </>
  );
};

export default Privacy;