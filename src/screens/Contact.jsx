import React, { useState } from "react";
import "../styles/Contact.css"
const Contact = () => {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageData = { subject, email, message };

    try {
      await fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });
      alert("Message sent successfully!");
      setSubject("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="contact-page">
    <div className="contact-container">
    <h1 className="title">Contact Us</h1>

    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        placeholder="Subject"
        className="form-input"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <textarea
        placeholder="Message"
        className="form-textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      ></textarea>

      <button type="submit" className="submit-button">Send Message</button>
    </form>
    </div>
    </div>
  );
};

export default Contact;