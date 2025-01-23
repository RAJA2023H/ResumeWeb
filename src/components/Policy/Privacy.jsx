import React from 'react';
import styles from './Privacy.module.css';

const Privacy = () => {
  return (
    <div className={styles.policyContainer} id="Privacy">
      <h1>Privacy Policy</h1>
      <p>This is a temporary privacy policy for our application.</p>
      <p>We do not collect sensitive user data or use external tracking.</p>
      <p>We are working on adding more detailed privacy terms as our application evolves.</p>
    </div>
  );
};

export default Privacy;