import Navbar from "../components/Navbar";
import { FaHeart, FaChild, FaBrain, FaFirstAid, FaBandAid } from 'react-icons/fa'; // Example icons (install react-icons)
import { useEffect, useState } from 'react';

// Array of potential search terms for doctor images on Unsplash
const doctorKeywords = ["doctor portrait", "medical professional", "healthcare worker", "physician"];

// Function to get a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

function About() {
    const [doctorImages, setDoctorImages] = useState([]);
    const numberOfDoctors = 3; // Adjust as needed

    useEffect(() => {
        const fetchRandomDoctorImages = async () => {
            const images = [];
            for (let i = 0; i < numberOfDoctors; i++) {
                const keyword = getRandomItem(doctorKeywords);
                // Using a simple Unsplash source URL for a random image based on a keyword
                const imageUrl = `https://source.unsplash.com/random?sig=${i}&${keyword}`;
                images.push(imageUrl);
            }
            setDoctorImages(images);
        };

        fetchRandomDoctorImages();
    }, []);

    const teamMembers = [
        { name: "Dr. Latha", title: "Cardiologist", credentials: "MD, DM Cardiology", specialty: "Specializes in interventional cardiology and heart failure." },
        { name: "Dr. Swapna", title: "Pediatrician", credentials: "MD, DCH", specialty: "Passionate about child health and development." },
        { name: "Dr. Chandu", title: "Orthopedic Surgeon", credentials: "MS, DNB Orthopedics", specialty: "Expertise in joint replacements and sports injuries." },
        // Add more team members here
    ];

    return (
        <>
            <Navbar />
            <div className="about-page">
                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

                    .about-page {
                        font-family: 'Poppins', sans-serif;
                        color: #333;
                        line-height: 1.8;
                    }

                    .full-width-section {
                        padding: 60px 20px;
                        text-align: center;
                    }

                    .mission-vision-section {
                        background: linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%);
                    }

                    .team-section {
                        background-color: #fff;
                    }

                    .departments-section {
                        background: #f9f9f9;
                    }

                    .journey-section {
                        background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
                        color: #004d40;
                    }

                    .section-title {
                        font-size: 2.5rem;
                        margin-bottom: 30px;
                        position: relative;
                        display: inline-block;
                        color: #2c3e50;
                    }

                    .section-title::after {
                        content: '';
                        position: absolute;
                        bottom: -10px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 80px;
                        height: 4px;
                        background: linear-gradient(90deg, #3498db, #9b59b6);
                        border-radius: 2px;
                    }

                    .mission-vision-content, .journey-content {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 0 20px;
                    }

                    .team-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 30px;
                        max-width: 1100px;
                        margin: 30px auto;
                        padding: 0 20px;
                    }

                    .team-card {
                        background: white;
                        padding: 25px;
                        border-radius: 12px;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.08);
                        transition: all 0.3s ease;
                        border-top: 5px solid #3498db; /* Example accent color */
                        text-align: center;
                    }

                    .team-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 15px 30px rgba(0,0,0,0.12);
                    }

                    .team-card img {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        object-fit: cover;
                        margin-bottom: 15px;
                    }

                    .team-card h4 {
                        font-size: 1.5rem;
                        margin-bottom: 5px;
                        color: #2c3e50;
                    }

                    .team-card p {
                        color: #7f8c8d;
                        font-weight: 500;
                        margin-bottom: 10px;
                    }

                    .departments-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                        max-width: 900px;
                        margin: 30px auto;
                        padding: 0 20px;
                    }

                    .department-card {
                        background: #e3f2fd; /* Light blue */
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 5px 10px rgba(0,0,0,0.05);
                        text-align: center;
                        color: #1e88e5; /* Darker blue */
                        font-weight: 600;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }

                    .department-card svg {
                        font-size: 2rem;
                        margin-bottom: 10px;
                    }

                    .journey-timeline {
                        max-width: 800px;
                        margin: 30px auto;
                        padding: 0 20px;
                        position: relative;
                    }

                    // Add styling for the timeline elements here
                `}</style>

                <section className="full-width-section mission-vision-section">
                    <h2 className="section-title">Our Mission & Vision</h2>
                    <div className="mission-vision-content">
                        <p>At NBKR Hospital, our mission is to deliver compassionate, accessible, and affordable healthcare with a commitment to excellence. We strive to be a beacon of hope and healing for our community, ensuring that every patient receives the highest quality of care with dignity and respect.</p>
                        <p>We envision a future where advanced medical care and patient well-being go hand in hand. We aim to be a leading healthcare institution, recognized for our innovation, patient-centered approach, and positive impact on the health and wellness of the people we serve.</p>
                    </div>
                </section>

                <section className="full-width-section team-section">
                    <h2 className="section-title">Meet Our Dedicated Team</h2>
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div className="team-card" key={index}>
                                <img src={doctorImages[index % doctorImages.length]} alt={member.name} />
                                <h4>{member.name}</h4>
                                <p>{member.title}</p>
                                <p>{member.credentials}</p>
                                <p>{member.specialty}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="full-width-section departments-section">
                    <h2 className="section-title">Our Specialized Departments</h2>
                    <div className="departments-grid">
                        <div className="department-card">
                            <FaHeart />
                            Cardiology
                        </div>
                        <div className="department-card">
                            <FaChild />
                            Pediatrics
                        </div>
                        <div className="department-card">
                            <FaBrain />
                            Neurology
                        </div>
                        <div className="department-card">
                            <FaFirstAid />
                            Emergency Care
                        </div>
                        <div className="department-card">
                            <FaBandAid />
                            Dermatology
                        </div>
                        {/* Add more departments with relevant icons */}
                    </div>
                </section>

                <section className="full-width-section journey-section">
                    <h2 className="section-title">Our Journey Through the Years</h2>
                    <div className="journey-content">
                        <p>Established in 2005 with a vision to provide quality healthcare, NBKR Hospital began as a modest 20-bed clinic. Over the years, through dedication and a commitment to our patients, we have grown into a 200-bed multi-specialty healthcare center, serving over 1,00,000 patients across Andhra Pradesh.</p>
                        <p>We have continuously invested in state-of-the-art technology and expanded our team of expert medical professionals to offer a comprehensive range of services. Our journey is marked by milestones of growth, innovation, and an unwavering focus on patient well-being.</p>
                        {/* Consider adding a visual timeline here */}
                    </div>
                </section>
            </div>
        </>
    );
}

export default About;