import React from "react";

const EmergencyPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.alertBox}>
        <h1 style={styles.heading}>🚨 Emergency Alert</h1>
        <p style={styles.message}>
          Due to unforeseen circumstances, hospital services are currently
          limited. We are working to resolve the issue as quickly as possible.
        </p>
        <p style={styles.message}>
          For life-threatening emergencies, please call <strong>911</strong>.
        </p>
        <p style={styles.message}>
          For urgent inquiries, contact us at:{" "}
          <a href="tel:+1234567890" style={styles.phoneLink}>
            +1 (234) 567-890
          </a>
        </p>
        <div style={styles.footer}>
          Thank you for your patience and understanding.
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f8d7da",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  alertBox: {
    backgroundColor: "#fff",
    border: "2px solid #721c24",
    borderRadius: "10px",
    padding: "30px",
    maxWidth: "600px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  heading: {
    color: "#721c24",
    fontSize: "32px",
    marginBottom: "20px",
    textAlign: "center",
  },
  message: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "15px",
    lineHeight: "1.5",
  },
  phoneLink: {
    color: "#721c24",
    textDecoration: "none",
    fontWeight: "bold",
  },
  footer: {
    marginTop: "30px",
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
  },
};

export default EmergencyPage;
