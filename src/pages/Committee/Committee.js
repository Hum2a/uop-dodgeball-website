import React from 'react';
import { Link } from 'react-router-dom';
import './Committee.css'; // Reusing Home.css, ensure it contains all necessary styles.

const Committee = () => {
  return (
    <div className="home-container">
      <header>
        <h1>UoP Dodgeball</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/family-tree">Family Tree</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/committee">Committee</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h2>Meet Our Committee</h2>
            <p>Get to know the people behind UoP Dodgeball.</p>
          </div>
        </section>
        <section className="committee-section">
          <div className="role-container">
            <h3>President</h3>
            <p>Details about the President...</p>
          </div>
          <div className="role-container">
            <h3>Vice President</h3>
            <p>Details about the Vice President...</p>
          </div>
          <div className="role-container">
            <h3>Club Captain</h3>
            <p>Details about the Club Captain...</p>
          </div>
          <div className="captains">
            <div className="role-container">
              <h3>Mens Captain</h3>
              <p>Details about the Mens Captain...</p>
            </div>
            <div className="role-container">
              <h3>Womens Captain</h3>
              <p>Details about the Womens Captain...</p>
            </div>
          </div>
          <div className="role-container">
            <h3>Social Secretary</h3>
            <p>Details about the Social Secretary...</p>
          </div>
          <div className="role-container">
            <h3>Rag Secretary</h3>
            <p>Details about the Rag Secretary...</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 UoP Dodgeball. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Committee;
