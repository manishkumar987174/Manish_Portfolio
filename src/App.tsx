import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero, WhatsAppButton } from './components/Hero';
import { Skills, Projects } from './components/Projects';
import { ExperienceEducation, Contact, Footer, Loader } from './components/Experience';
import { PERSONAL_INFO } from './constants';

const About = () => (
  <section id="about" className="py-24 bg-zinc-50 dark:bg-zinc-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl h-250px">
            <img
              src="/About_img.png"
              alt="Workspace"
              className="w-full px p-0.5 h-full object-cover "
              referrerPolicy="no-referrer"
            />
          </div>
         
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-bold tracking-widest uppercase text-xs">About Me</span>
          <h2 className="text-4xl font-bold tracking-tighter dark:text-white mt-2 mb-6">
            Passionate Developer <br /> Crafting Digital Experiences
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 leading-relaxed">
            {PERSONAL_INFO.summary}
          </p>
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-3xl font-bold dark:text-white mb-1">15+</p>
              <p className="text-zinc-500 dark:text-zinc-500 text-sm uppercase tracking-widest">Projects Completed</p>
            </div>
         
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
          >
            Let's talk about your project <span className="text-xl">→</span>
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scroll during loading
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
    <div className="bg-white dark:bg-zinc-950 min-h-screen selection:bg-primary/30">
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
