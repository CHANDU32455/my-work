import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Services() {
  const departments = [
    { name: "Cardiology", description: "Advanced heart care, including diagnostics, treatments, and surgeries." },
    { name: "Pediatrics", description: "Comprehensive medical care for children from birth to adolescence." },
    { name: "Orthopedics", description: "Treatment of bone, joint, and musculoskeletal disorders." },
    { name: "General Surgery", description: "Surgical treatments for various conditions and injuries." },
    { name: "Emergency Care", description: "Immediate treatment for acute conditions and life-threatening situations." },
    { name: "Dermatology", description: "Skin care, diagnosis, and treatment of skin disorders." },
    { name: "Neurology", description: "Diagnosis and treatment of nervous system disorders, including brain and spinal cord." },
  ];

  return (
    <>
      <Navbar />
      <div className="services-container">
        <style>{`
          :root {
            --primary: #2563eb;
            --primary-hover: #1d4ed8;
            --secondary: #f0f9ff;
            --text: #1e293b;
            --text-light: #64748b;
          }
          
          .services-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .services-title {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--text);
            position: relative;
            display: inline-block;
          }

          .services-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: var(--primary);
            border-radius: 2px;
          }

          .services-subtitle {
            font-size: 1.1rem;
            color: var(--text-light);
            margin-bottom: 3rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.6;
          }

          .services-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
          }

          .service-item {
            padding: 2rem;
            border-radius: 12px;
            background: white;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            border: 1px solid #e2e8f0;
            position: relative;
            overflow: hidden;
          }

          .service-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          .service-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: var(--primary);
          }

          .service-item h4 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--text);
            position: relative;
            padding-left: 1rem;
          }

          .service-item h4::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--primary);
          }

          .service-item p {
            font-size: 1rem;
            color: var(--text-light);
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          .service-item a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            background: var(--primary);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: 2px solid transparent;
          }

          .service-item a:hover {
            background: white;
            color: var(--primary);
            border-color: var(--primary);
          }

          @media (max-width: 768px) {
            .services-list {
              grid-template-columns: 1fr;
            }
            
            .services-title {
              font-size: 2rem;
            }
          }
        `}</style>

        <h2 className="services-title">Our Medical Services</h2>
        <p className="services-subtitle">
          We offer comprehensive healthcare services across various specialties. 
          Our expert teams provide personalized care using the latest medical technologies.
        </p>
        <div className="services-list">
          {departments.map((department, index) => (
            <div key={index} className="service-item">
              <h4>{department.name}</h4>
              <p>{department.description}</p>
              <Link to={`/appointments?department=${department.name}`}>
                Book an Appointment
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;