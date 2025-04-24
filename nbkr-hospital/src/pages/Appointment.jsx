import { useState } from "react";
import Navbar from "../components/Navbar";

function Appointment() {
    const [patientName, setPatientName] = useState("");
    const [department, setDepartment] = useState("");
    const [doctor, setDoctor] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [contactDetails, setContactDetails] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");

    const nameRegex = /^[A-Za-z\s]+$/; // Allow only letters and spaces for patient name
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // Format: 123-456-7890

    const handleSubmit = (e) => {
        e.preventDefault();

        // Patient name validation
        if (!nameRegex.test(patientName)) {
            alert("Please enter a valid name (letters and spaces only).");
            return;
        }

        // Contact details (phone number) validation
        if (!phoneRegex.test(contactDetails)) {
            alert("Please enter a valid contact number (e.g., 123-456-7890).");
            return;
        }

        // Appointment date validation (should be in the future)
        const currentDate = new Date();
        const appointmentDateObj = new Date(appointmentDate);
        if (appointmentDateObj <= currentDate) {
            alert("Please select a future date and time.");
            return;
        }

        // Proceed with form submission if all validations pass
        if (!patientName || !department || !appointmentDate || !contactDetails) {
            alert("Please fill out all mandatory fields.");
            return;
        }

        setConfirmationMessage("✅ Appointment submitted successfully! We will reach out to you shortly.");
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: "40px", fontFamily: "'Segoe UI', sans-serif", background: "#e9ecef", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <style jsx>{`
    .appointment-container {
      background: #fff;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      width: 100%;
      max-width: 600px;
      text-align: left;
    }

    h2 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }

    label {
      font-weight: 500;
      display: block;
      margin-bottom: 8px;
      color: #333;
    }

    input[type="text"],
    input[type="datetime-local"],
    select {
      width: 100%;
      padding: 12px 15px;
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      box-sizing: border-box;
    }

    input:focus,
    select:focus {
      outline: none;
      border-color: #28a745; /* A different accent color */
      box-shadow: 0 0 6px rgba(40, 167, 69, 0.25);
    }

    select option {
      font-size: 1rem;
    }

    button[type="submit"] {
      background: #28a745;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 1.05rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button[type="submit"]:hover {
      background: #1e7e34;
    }

    .confirmation-message {
      margin-top: 25px;
      padding: 15px;
      background-color: #d4edda;
      color: #155724;
      border-left: 5px solid #28a745;
      border-radius: 6px;
      font-weight: 500;
      text-align: center;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.9rem;
      margin-top: -15px;
      margin-bottom: 10px;
    }
  `}</style>
                <Navbar />
                <div className="appointment-container">
                    <h2>📅 Book Your Appointment</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="patientName">Patient Name *</label>
                        <input type="text" id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
                        {!nameRegex.test(patientName) && patientName.length > 0 && <div className="error-message">Please enter a valid name.</div>}

                        <label htmlFor="department">Department *</label>
                        <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                            <option value="">Select Department</option>
                            <option>Cardiology</option>
                            <option>Pediatrics</option>
                            <option>Orthopedics</option>
                            <option>General Surgery</option>
                            <option>Emergency Care</option>
                            <option>Dermatology</option>
                            <option>Neurology</option>
                        </select>

                        <label htmlFor="doctor">Doctor Preference (Optional)</label>
                        <input type="text" id="doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)} />

                        <label htmlFor="appointmentDate">Date & Time *</label>
                        <input type="datetime-local" id="appointmentDate" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
                        {new Date(appointmentDate) <= new Date() && appointmentDate && <div className="error-message">Please select a future date and time.</div>}

                        <label htmlFor="contactDetails">Contact Details * (e.g., 123-456-7890)</label>
                        <input type="text" id="contactDetails" value={contactDetails} onChange={(e) => setContactDetails(e.target.value)} required />
                        {!phoneRegex.test(contactDetails) && contactDetails.length > 0 && <div className="error-message">Please enter a valid phone number (e.g., 123-456-7890).</div>}

                        <button type="submit">Submit Appointment</button>
                    </form>
                    {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
                </div>
            </div>
        </>
    );
}

export default Appointment;
