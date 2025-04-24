import { useState } from "react";
import Navbar from "../components/Navbar";
import { FiSend } from 'react-icons/fi'; // Import send icon from react-icons

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Corrected regex
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email.");
            return;
        }
        if (!name || !message || !email) {
            alert("All fields are required.");
            return;
        }
        setConfirmationMessage("✅ Message sent successfully! We'll get back to you soon.");
    };

    return (
        <>
            <Navbar />
            <div className="contact-page">
                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');

                    .contact-page {
                        display: flex;
                        min-height: 80vh; /* Ensure the page takes up at least the viewport height */
                        align-items: center;
                        justify-content: center;
                        padding: 40px;
                        font-family: 'Open Sans', sans-serif;
                        background: #f4f7f6;
                    }

                    .contact-info {
                        flex: 1;
                        padding-right: 40px;
                        text-align: left;
                    }

                    .contact-info h2 {
                        color: #333;
                        margin-bottom: 20px;
                    }

                    .contact-info p {
                        color: #666;
                        line-height: 1.6;
                        margin-bottom: 15px;
                    }

                    .contact-form-wrapper {
                        flex: 1;
                        background: #fff;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                        text-align: left;
                    }

                    .contact-form label {
                        font-weight: 600;
                        display: block;
                        margin-bottom: 8px;
                        color: #333;
                    }

                    .contact-form input,
                    .contact-form textarea,
                    .contact-form button {
                        width: 100%;
                        padding: 12px 15px;
                        margin-bottom: 20px;
                        border: 1px solid #ddd;
                        border-radius: 6px;
                        font-size: 1rem;
                        box-sizing: border-box;
                    }

                    .contact-form input:focus,
                    .contact-form textarea:focus {
                        outline: none;
                        border-color: #007bff; /* Accent color on focus */
                        box-shadow: 0 0 6px rgba(0, 123, 255, 0.25);
                    }

                    .contact-form textarea {
                        min-height: 120px;
                        resize: vertical;
                    }

                    .contact-form button {
                        background: #007bff;
                        color: white;
                        border: none;
                        cursor: pointer;
                        transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
                        padding: 12px 20px;
                        border-radius: 6px;
                        font-size: 1.05rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .contact-form button:hover {
                        background: #0056b3;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                        transform: translateY(-1px);
                    }

                    .confirmation-message {
                        margin-top: 20px;
                        padding: 15px;
                        background-color: #e6f7ff;
                        color: #0056b3;
                        border-left: 5px solid #007bff;
                        border-radius: 6px;
                        font-weight: 500;
                    }

                    .emergency-numbers {
                        margin-top: 30px;
                        color: #777;
                        font-size: 0.9rem;
                    }

                    .emergency-numbers h4 {
                        color: #007bff;
                        margin-bottom: 10px;
                    }
                `}</style>
                <div className="contact-info">
                    <h2>👋 Get in Touch!</h2>
                    <p>We're here to help and answer any questions you might have. Feel free to reach out to us through the form below or using the contact details provided.</p>
                    <p><strong>Email:</strong> support@nbkrist.org</p>
                    <p><strong>Phone:</strong> +91-9848012345</p>
                    {/* Add more contact info as needed */}
                    <div className="emergency-numbers">
                        <h4>📞 Emergency Contacts</h4>
                        <p>Emergency Helpline: 112</p>
                        <p>Medical Assistance: 123-456-7890</p>
                        <p>Ambulance: 987-654-3210</p>
                    </div>
                </div>
                <div className="contact-form-wrapper">
                    <h3>Send us a Message</h3>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name *</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label htmlFor="email">Email *</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label htmlFor="message">Message *</label>
                        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />

                        <button type="submit">
                            <FiSend style={{ marginRight: '8px' }} /> Send Message
                        </button>
                    </form>
                    {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
                </div>
            </div>
        </>
    );
}

export default Contact;