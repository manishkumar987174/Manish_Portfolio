import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero, WhatsAppButton } from './components/Hero';
import { Skills, Projects } from './components/Projects';
import { ExperienceEducation, Contact, Footer, Loader } from './components/Experience';
import { PERSONAL_INFO } from './constants';

const About = () => (
  <section id="about" className="section">
    <div className="container about-grid">
      <div className="about-img">
        <img src="/About_img.png" alt="Workspace" />
      </div>

      <div>
        <span className="tag">About Me</span>
        <h2 className="title">
          Passionate Developer <br /> Crafting Digital Experiences
        </h2>
        <p className="desc">{PERSONAL_INFO.summary}</p>

        <div className="stats">
          <div>
            <p className="stat-number">15+</p>
            <p className="stat-label">Projects Completed</p>
          </div>
        </div>

        <a href="#contact" className="link">
          Let's talk about your project →
        </a>
      </div>
    </div>
  </section>
);

export default function App() {
const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="app">
      {loading && <Loader />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ExperienceEducation />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}