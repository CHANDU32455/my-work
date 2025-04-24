import React, { useState, useEffect } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: '👋 Hello! How can I assist you today? You can ask about appointments, hospital services, timings, location, departments, and more. Just type your question!' }
    ]);
    const [input, setInput] = useState('');
    const [appointmentStep, setAppointmentStep] = useState(0);
    const [appointmentData, setAppointmentData] = useState({});

    const toggleChat = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const chatWindow = document.getElementById('chatbot-window');
            const chatButton = document.getElementById('chatbot-btn');
            if (
                chatWindow && !chatWindow.contains(event.target) &&
                chatButton && !chatButton.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getBotResponse = (input) => {
        const msg = input.toLowerCase();

        // --- General Information ---
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
            return '👋 Hi there! How can I help you today?';
        }

        if (msg.includes('how are you') || msg.includes('how is it going')) {
            return 'I’m doing great, thank you for asking! 😊 What can I help you with?';
        }

        if (msg.includes('weather')) {
            return '☀️ I don’t have real-time weather updates. You can check a weather app for the latest forecast. What else can I assist you with?';
        }

        if (msg.includes('thank you') || msg.includes('thanks')) {
            return 'You’re welcome! 😊 Feel free to ask if you need anything else!';
        }

        if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you')) {
            return '👋 Goodbye! Have a healthy day!';
        }

        if (msg.includes('timing') || msg.includes('hours of operation') || msg.includes('when are you open')) {
            return '🕒 Our hospital is open from 9 AM to 5 PM, Monday to Saturday for most services. The Emergency Department is open 24/7. What else would you like to know?';
        }

        if (msg.includes('location') || msg.includes('address') || msg.includes('where are you')) {
            return '📍 We are located at NBKRIST Campus, Vidyanagar, Andhra Pradesh. Is there anything else I can help you with regarding our location or other topics?';
        }

        if (msg.includes('parking')) {
            return '🅿️ Yes, we have free parking available for patients and visitors near the main entrance. What else can I assist you with today?';
        }

        if (msg.includes('covid') || msg.includes('coronavirus') || msg.includes('safety protocols')) {
            return '😷 We have strict COVID-19 safety protocols in place, including mandatory mask-wearing, regular sanitization, and limiting one visitor per patient in most areas. What other questions do you have?';
        }

        if (msg.includes('insurance') || msg.includes('do you accept')) {
            return '📄 We accept most major insurance providers. For specific queries about your plan, please contact our billing department at [insert billing phone number here]. What else can I help you with?';
        }

        if (msg.includes('visiting hours') || msg.includes('when can i visit')) {
            return '🕰️ General visiting hours are from 4 PM to 6 PM daily. Please check with the specific ward or department for any special guidelines. What else would you like to know?';
        }

        // --- Hospital Services ---
        if (msg.includes('departments') || msg.includes('what services') || msg.includes('specialties')) {
            return '🏥 We offer a wide range of departments including Cardiology, Pediatrics, Neurology, Orthopedics, General Surgery, Emergency Care, Dermatology, and more. To know more about a specific department, just ask! For example, you can ask "Tell me about Cardiology." What service are you interested in?';
        }

        if (msg.includes('pediatrics') || msg.includes('child care')) {
            return '👶 Our Pediatrics department specializes in the health and medical care of infants, children, and adolescents. We provide services such as vaccinations, routine check-ups, and treatment for childhood illnesses. Located on the 2nd floor. What else can I tell you about our services?';
        }

        if (msg.includes('cardiology') || msg.includes('heart care')) {
            return '❤️ The Cardiology department focuses on the diagnosis and treatment of heart conditions. We offer services like ECG, echocardiography, and cardiac consultations. Located on the 2nd floor. What would you like to know next?';
        }

        if (msg.includes('neurology') || msg.includes('brain and nerve')) {
            return '🧠 Our Neurology department deals with disorders of the brain, spinal cord, and nervous system, offering diagnosis and treatment for conditions like stroke, epilepsy, and migraines. Located on the 2nd floor. What other information can I provide?';
        }

        if (msg.includes('orthopedics') || msg.includes('bone and joint')) {
            return '🦴 The Orthopedics department specializes in musculoskeletal issues, including fractures, joint replacements, and sports injuries. Consultations and treatments are available on the 1st floor. What else are you curious about?';
        }

        if (msg.includes('emergency') || msg.includes('casualty') || msg.includes('urgent care')) {
            return '🚨 Our 24/7 Emergency Department is equipped to handle all urgent medical needs. It is located on the ground floor, easily accessible from the main entrance. Do you have any other questions about our emergency services or anything else?';
        }

        if (msg.includes('dermatology') || msg.includes('skin care')) {
            return '🧴 The Dermatology department offers diagnosis and treatment for various skin conditions, hair, and nail disorders. Consultations are available on the 3rd floor. What else can I assist you with?';
        }

        if (msg.includes('general surgery')) {
            return '🔪 Our General Surgery department provides a wide range of surgical procedures. Consultations are available on the 1st floor. What else would you like to know?';
        }

        if (msg.includes('physiotherapy') || msg.includes('rehabilitation')) {
            return '💪 Yes, we have a Physiotherapy and Rehabilitation department to help with recovery and physical well-being. It is located on the ground floor. What other questions do you have?';
        }

        // --- Appointment Booking ---
        if (msg.includes('appointment') || msg.includes('book an appointment') || msg.includes('schedule')) {
            setAppointmentStep(1);
            return '📝 Sure! To book an appointment, please tell me which department you need. For example, you can say "I need an appointment with Cardiology."';
        }

        return '🤖 I’m here to help! You can ask about appointments, hospital services, timings, location, departments, and more. If I don’t have the answer, please try rephrasing your question.';
    };

    const handleAppointmentFlow = (input) => {
        const step = appointmentStep;
        const newData = { ...appointmentData };

        if (step === 1) {
            newData.department = input;
            setAppointmentStep(2);
            setAppointmentData(newData);
            return `Okay, you'd like to book an appointment with ${input}. Do you have a preferred doctor in this department? You can say the doctor's name or "No preference."`;
        }

        if (step === 2) {
            newData.doctor = input;
            setAppointmentStep(3);
            setAppointmentData(newData);
            return 'Please provide a preferred date and time for your appointment (e.g., April 25th, 10:00 AM).';
        }

        if (step === 3) {
            newData.datetime = input;
            setAppointmentStep(0);
            setAppointmentData({});
            return `✅ Appointment request submitted for:\nDepartment: ${newData.department}\nDoctor: ${newData.doctor || 'Any'}\nDate & Time: ${input}.\nWe will contact you to confirm the details. Is there anything else I can help you with?`;
        }

        return null;
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        let botReply;

        if (appointmentStep > 0) {
            botReply = handleAppointmentFlow(input);
        } else {
            botReply = getBotResponse(input);
        }

        const botMessage = { sender: 'bot', text: botReply };
        setMessages((prev) => [...prev, userMessage, botMessage]);
        setInput('');
    };

    const styles = {
        chatBtn: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 999,
        },
        chatWindow: {
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '320px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            zIndex: 999,
            padding: '12px',
        },
        messagesBox: {
            height: '260px',
            overflowY: 'auto',
            marginBottom: '10px',
            paddingRight: '5px',
        },
        message: {
            marginBottom: '8px',
            display: 'flex',
        },
        botMsg: {
            backgroundColor: '#f0f0f0',
            padding: '8px 12px',
            borderRadius: '12px',
            maxWidth: '80%',
            textAlign: 'left',
        },
        userMsg: {
            backgroundColor: '#c7d2fe',
            padding: '8px 12px',
            borderRadius: '12px',
            maxWidth: '80%',
            textAlign: 'right',
            marginLeft: 'auto',
        },
        inputBox: {
            display: 'flex',
            borderTop: '1px solid #eee',
            paddingTop: '8px',
        },
        input: {
            flex: 1,
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '8px 0 0 8px',
            outline: 'none',
        },
        sendBtn: {
            padding: '8px 16px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            cursor: 'pointer',
        },
    };

    return (
        <div>
            <button id="chatbot-btn" style={styles.chatBtn} onClick={toggleChat}>💬 Chat</button>

            {isOpen && (
                <div id="chatbot-window" style={styles.chatWindow}>
                    <div style={styles.messagesBox}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={styles.message}>
                                <div style={msg.sender === 'user' ? styles.userMsg : styles.botMsg}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={styles.inputBox}>
                        <input
                            type="text"
                            style={styles.input}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your question..."
                        />
                        <button style={styles.sendBtn} onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;