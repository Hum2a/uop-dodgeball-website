import React from 'react';
import { Link } from 'react-router-dom';
import './History.css'; // Assuming Home.css contains the necessary base styles.

const History = () => {
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
            <h2>History of the club</h2>
            <p>Explore the milestones and achievements of UoP Dodgeball.</p>
          </div>
        </section>
        <section className="history-section">
          <div className="history-container">
            <h3>BUCS</h3>
            <p>Details about our participation in BUCS events...</p>
          </div>
          <div className="history-container">
            <h3>Varsity</h3>
            <p>Information on our Varsity matches and achievements...</p>
          </div>
          <div className="history-container">
            <h3>Generations</h3>
            <p>Winners of the Generations Tournament Every Year</p>
          </div>
          <div className="history-container">
            <h3>Sports Awards</h3>
            <p>Accolades awarded to the club at the yearly Team UoP Sport Awards</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 UoP Dodgeball. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default History;
