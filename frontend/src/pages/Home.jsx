import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';

function Home() {
  return (
    <div>
      <Navbar/>
      <div className="home-container" style={{ padding: '20px' }}>
        <h1>Welcome to GreenCycle</h1>
        <p className="subtitle">
          Your AI-powered sustainable material advisor for smarter waste management!
        </p>

        <section className="features-section" style={{ marginTop: '40px' }}>
          <h2>Why Choose GreenCycle?</h2>
          <ul className="features-list">
            <li>♻️ Accurate material classification for efficient recycling</li>
            <li>🌱 Real-time sustainability guidance through intelligent chatbot</li>
            <li>📊 Visual trash detection to empower waste sorting</li>
            <li>🌍 Support circular economy & reduce environmental impact</li>
          </ul>
        </section>

        <section className="about-section" style={{ marginTop: '40px' }}>
          <h2>For Environment Enthusiasts & Communities</h2>
          <p>
            GreenCycle helps you make eco-friendly decisions effortlessly,
            creating a positive impact for your community and planet.
          </p>
          <p>
            Whether you're a student, professional, or local organizer,
            manage waste smarter and promote sustainability.
          </p>
        </section>

        <section className="cta-section" style={{ marginTop: '40px' }}>
          <h2>Get Started with GreenCycle</h2>
          <p>Try the chatbot, test trash detection, or learn more about sustainability today.</p>
          <div className="cta-buttons" style={{ marginTop: '20px' }}>
            <Link to="/chatbot"><button style={{ marginRight: '10px' }}>Chat with Advisor</button></Link>
            <Link to="/detectiontrash"><button>Trash Detection</button></Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
