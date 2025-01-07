import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.css';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setStatus('error');
      console.error('Failed to send email:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
            rows={4}
            className={styles.textarea}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className={styles.submitButton}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className={styles.successMessage}>Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className={styles.errorMessage}>Failed to send message. Please try again.</p>
        )}
      </form>
    </div>
  );
};