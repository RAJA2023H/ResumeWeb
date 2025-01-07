import React, { useRef } from "react";
import emailjs from "emailjs-com";
import styles from "./ContactForm.module.css";

export const ContactForm = () => {
    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
                "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
                form.current,
                "YOUR_USER_ID" // Replace with your EmailJS User ID
            )
            .then(
                (result) => {
                    alert("Message sent successfully!");
                    form.current.reset();
                },
                (error) => {
                    alert("Failed to send message. Please try again.");
                }
            );
    };
    return (
        <div className={styles.formContainer}>
            <h3>Send a Message</h3>
            <form ref={form} onSubmit={sendEmail} className={styles.contactForm}>
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Message:
                    <textarea name="message" rows="4" required></textarea>
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};
