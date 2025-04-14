import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">HobbyNet</div>
        <div className="nav-links">
          <button className="nav-btn">Explore</button>
          <button className="nav-btn">About Us</button>
          <button
            className="nav-btn-outline"
            onClick={() => navigate('/login')} // Navigate to Login.js
          >
            Login
          </button>
          <button
            className="nav-btn-filled"
            onClick={() => navigate('/signup')} // Navigate to Signup.js
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Discover Your Passion. Connect. Learn. Grow.</h1>
        <p>Join a thriving community of hobby enthusiasts and find your perfect mentor today!</p>
        <button className="cta-btn" onClick={() => navigate('/signup')}>Join Now</button>
        <div className="hobby-collage">
          <div className="hobby-img" style={{ backgroundImage: 'url(/images/painting.jpg)' }}></div>
          <div className="hobby-img" style={{ backgroundImage: 'url(/images/music.jpg)' }}></div>
          <div className="hobby-img" style={{ backgroundImage: 'url(/images/cooking.jpg)' }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why HobbyNet?</h2>
        <div className="feature-cards">
          <div className="feature">
            <h3>🎯 Connect with Mentors</h3>
            <p>Find experienced mentors to guide you in your hobby journey.</p>
          </div>
          <div className="feature">
            <h3>🤝 Join Hobby Groups</h3>
            <p>Meet like-minded people and build your own community.</p>
          </div>
          <div className="feature">
            <h3>📚 Learn & Grow</h3>
            <p>Access resources, workshops, and more to enhance your skills.</p>
          </div>
        </div>
      </section>

      {/* Testimonials / Stats */}
      <section className="testimonials">
        <h2>Loved by Hobbyists Everywhere</h2>
        <div className="stats">
          <div>
            <p className="stat-number">10K+</p>
            <p>Active Users</p>
          </div>
          <div>
            <p className="stat-number">1K+</p>
            <p>Verified Mentors</p>
          </div>
          <div>
            <p className="stat-number">500+</p>
            <p>Hobby Groups</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 HobbyNet. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Contact</a>
          <a href="#">Terms</a>
          <a href="#">Socials</a>
        </div>
      </footer>
    </div>
  );
}