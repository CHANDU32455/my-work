import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

function Home() {
    useEffect(() => {
        // Animation for elements
        const animateElements = () => {
            const elements = document.querySelectorAll('.fade-in, .slide-up');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top <= window.innerHeight - 100) {
                    el.classList.add('animate');
                }
            });
        };

        window.addEventListener('scroll', animateElements);
        animateElements(); // Run once on load

        return () => window.removeEventListener('scroll', animateElements);
    }, []);

    return (
        <>
            <Navbar />
            <div className="home-container">
                <style>{`
                    :root {
                        --primary: #005f73;
                        --secondary: #0a9396;
                        --accent: #ee9b00;
                        --light: #e9d8a6;
                        --dark: #001219;
                        --white: #ffffff;
                        --gray: #f8f9fa;
                    }
                    
                    .home-container {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        color: var(--dark);
                        line-height: 1.6;
                        overflow-x: hidden;
                    }
                    
                    /* Hero Section */
                    .hero {
                        background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                        padding: 100px 20px;
                        text-align: center;
                        color: var(--white);
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .hero::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==');
                        opacity: 0.5;
                    }
                    
                    .hero-content {
                        max-width: 1200px;
                        margin: 0 auto;
                        position: relative;
                        z-index: 1;
                    }
                    
                    .hero h1 {
                        font-size: 3.5rem;
                        margin-bottom: 20px;
                        font-weight: 700;
                        opacity: 0;
                        transform: translateY(20px);
                        transition: opacity 0.8s ease, transform 0.8s ease;
                    }
                    
                    .hero h1.animate {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    .hero p {
                        font-size: 1.5rem;
                        max-width: 800px;
                        margin: 0 auto 40px;
                        opacity: 0;
                        transform: translateY(20px);
                        transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
                    }
                    
                    .hero p.animate {
                        opacity: 0.9;
                        transform: translateY(0);
                    }
                    
                    .hero-buttons {
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        flex-wrap: wrap;
                        opacity: 0;
                        transform: translateY(20px);
                        transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
                    }
                    
                    .hero-buttons.animate {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    /* Stats Section */
                    .stats {
                        background: var(--white);
                        padding: 80px 20px;
                        text-align: center;
                    }
                    
                    .stats-container {
                        display: flex;
                        justify-content: space-around;
                        flex-wrap: wrap;
                        max-width: 1200px;
                        margin: 0 auto;
                        gap: 30px;
                    }
                    
                    .stat-card {
                        flex: 1;
                        min-width: 200px;
                        background: var(--gray);
                        padding: 30px;
                        border-radius: 12px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    
                    .stat-card:hover {
                        transform: translateY(-10px);
                        box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                    }
                    
                    .stat-number {
                        font-size: 3rem;
                        font-weight: 700;
                        color: var(--primary);
                        margin-bottom: 10px;
                    }
                    
                    .stat-label {
                        font-size: 1.2rem;
                        color: var(--dark);
                    }
                    
                    /* Quick Access */
                    .quick-access {
                        background: var(--gray);
                        padding: 80px 20px;
                        text-align: center;
                    }
                    
                    .quick-access h2 {
                        font-size: 2.5rem;
                        margin-bottom: 20px;
                        color: var(--primary);
                    }
                    
                    .quick-access p {
                        max-width: 700px;
                        margin: 0 auto 40px;
                        font-size: 1.2rem;
                        color: var(--dark);
                    }
                    
                    .quick-links {
                        display: flex;
                        justify-content: center;
                        gap: 30px;
                        flex-wrap: wrap;
                        max-width: 1000px;
                        margin: 0 auto;
                    }
                    
                    .quick-button, .chatbot-button {
                        padding: 16px 32px;
                        font-size: 1.1rem;
                        border: none;
                        border-radius: 50px;
                        background-color: var(--primary);
                        color: white;
                        text-decoration: none;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    
                    .quick-button:hover, .chatbot-button:hover {
                        background-color: var(--secondary);
                        transform: translateY(-3px);
                        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                    }
                    
                    .quick-button:active, .chatbot-button:active {
                        transform: translateY(1px);
                    }
                    
                    .chatbot-button {
                        background-color: var(--accent);
                    }
                    
                    .chatbot-button:hover {
                        background-color: #ca6702;
                    }
                    
                    /* Features */
                    .features {
                        padding: 80px 20px;
                        max-width: 1200px;
                        margin: 0 auto;
                    }
                    
                    .features h2 {
                        text-align: center;
                        font-size: 2.5rem;
                        margin-bottom: 60px;
                        color: var(--primary);
                    }
                    
                    .feature-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 40px;
                    }
                    
                    .feature-card {
                        background: var(--white);
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                        transition: transform 0.3s ease;
                    }
                    
                    .feature-card:hover {
                        transform: translateY(-10px);
                    }
                    
                    .feature-icon {
                        background: var(--light);
                        padding: 30px;
                        text-align: center;
                        font-size: 2.5rem;
                        color: var(--primary);
                    }
                    
                    .feature-content {
                        padding: 30px;
                    }
                    
                    .feature-content h3 {
                        font-size: 1.5rem;
                        margin-bottom: 15px;
                        color: var(--primary);
                    }
                    
                    /* Testimonials */
                    .testimonials {
                        background: var(--primary);
                        padding: 80px 20px;
                        color: var(--white);
                        text-align: center;
                    }
                    
                    .testimonials h2 {
                        font-size: 2.5rem;
                        margin-bottom: 60px;
                    }
                    
                    .testimonial-slider {
                        max-width: 1000px;
                        margin: 0 auto;
                        position: relative;
                    }
                    
                    .testimonial {
                        background: rgba(255,255,255,0.1);
                        padding: 40px;
                        border-radius: 12px;
                        margin: 0 20px;
                    }
                    
                    .testimonial-text {
                        font-size: 1.2rem;
                        font-style: italic;
                        margin-bottom: 20px;
                    }
                    
                    .testimonial-author {
                        font-weight: 700;
                    }
                    
                    /* Emergency Banner */
                    .emergency-banner {
                        background: #d90429;
                        color: white;
                        padding: 20px;
                        text-align: center;
                        font-weight: 700;
                        font-size: 1.2rem;
                    }
                    
                    .emergency-banner a {
                        color: white;
                        text-decoration: underline;
                    }
                    
                    /* Animations */
                    .fade-in {
                        opacity: 0;
                        transition: opacity 0.8s ease;
                    }
                    
                    .fade-in.animate {
                        opacity: 1;
                    }
                    
                    .slide-up {
                        opacity: 0;
                        transform: translateY(30px);
                        transition: opacity 0.8s ease, transform 0.8s ease;
                    }
                    
                    .slide-up.animate {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    @media (max-width: 768px) {
                        .hero h1 {
                            font-size: 2.5rem;
                        }
                        
                        .hero p {
                            font-size: 1.2rem;
                        }
                        
                        .quick-links {
                            flex-direction: column;
                            align-items: center;
                        }
                        
                        .stat-card {
                            min-width: 150px;
                        }
                    }
                `}</style>

                {/* Emergency Banner */}
                <div className="emergency-banner slide-up">
                    <span>Emergency? Call <a href="tel:+911234567890">+91 12345 67890</a> or </span>
                    <Link to="/emergency" style={{marginLeft: '10px'}}>Get Emergency Help</Link>
                </div>

                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-content">
                        <h1 className="slide-up">Advanced Healthcare at NBKR Hospital</h1>
                        <p className="slide-up">Where compassion meets cutting-edge technology for your complete wellbeing</p>
                        <div className="hero-buttons slide-up">
                            <Link to="/appointments" className="quick-button">Book Appointment</Link>
                            <Link to="/services" className="quick-button">Our Services</Link>
                            <button className="chatbot-button" onClick={() => alert("AI Health Assistant launching...")}>
                                <span>🤖 AI Health Assistant</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="stats">
                    <div className="stats-container">
                        <div className="stat-card fade-in">
                            <div className="stat-number">250+</div>
                            <div className="stat-label">Expert Doctors</div>
                        </div>
                        <div className="stat-card fade-in">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Specialities</div>
                        </div>
                        <div className="stat-card fade-in">
                            <div className="stat-number">10K+</div>
                            <div className="stat-label">Patients Monthly</div>
                        </div>
                        <div className="stat-card fade-in">
                            <div className="stat-number">99%</div>
                            <div className="stat-label">Patient Satisfaction</div>
                        </div>
                    </div>
                </section>

                {/* Quick Access Section */}
                <section className="quick-access">
                    <h2 className="slide-up">Quick Patient Access</h2>
                    <p className="slide-up">Access our services quickly and conveniently through our digital platforms</p>
                    <div className="quick-links">
                        <Link to="/find-doctor" className="quick-button slide-up">
                            <span>👨‍⚕️ Find a Doctor</span>
                        </Link>
                        <Link to="/online-prescription" className="quick-button slide-up">
                            <span>💊 Online Prescription</span>
                        </Link>
                        <Link to="/telemedicine" className="quick-button slide-up">
                            <span>📱 Telemedicine</span>
                        </Link>
                        <Link to="/health-records" className="quick-button slide-up">
                            <span>📁 Health Records</span>
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features">
                    <h2 className="slide-up">Why Choose NBKR Hospital?</h2>
                    <div className="feature-grid">
                        <div className="feature-card fade-in">
                            <div className="feature-icon">🏥</div>
                            <div className="feature-content">
                                <h3>Advanced Technology</h3>
                                <p>State-of-the-art medical equipment and cutting-edge treatment protocols for accurate diagnosis and effective treatment.</p>
                            </div>
                        </div>
                        <div className="feature-card fade-in">
                            <div className="feature-icon">👨‍⚕️</div>
                            <div className="feature-content">
                                <h3>Expert Specialists</h3>
                                <p>Our team includes nationally recognized specialists with extensive experience in their respective fields.</p>
                            </div>
                        </div>
                        <div className="feature-card fade-in">
                            <div className="feature-icon">❤️</div>
                            <div className="feature-content">
                                <h3>Patient-Centered Care</h3>
                                <p>Personalized treatment plans tailored to your unique needs, with compassionate support throughout your journey.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="testimonials">
                    <h2 className="slide-up">Patient Stories</h2>
                    <div className="testimonial-slider">
                        <div className="testimonial fade-in">
                            <p className="testimonial-text">"The care I received at NBKR Hospital was exceptional. The doctors took time to explain everything and made me feel comfortable throughout my treatment."</p>
                            <div className="testimonial-author">- Ramesh K., Heart Patient</div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;