import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
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
            <h2>Welcome to UoP Dodgeball</h2>
            <p>Join us for an exciting experience!</p>
            <Link to="/learn-more" className="btn">Learn More</Link> {/* Assuming you have a route for Learn More */}
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 UoP Dodgeball. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
