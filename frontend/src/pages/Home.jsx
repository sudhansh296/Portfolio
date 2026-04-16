import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import MusiqFlowSection from '../components/MusiqFlowSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';

export default function Home() {
  return (
    <div>
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <MusiqFlowSection />
      <Contact />
      <Footer />
    </div>
  );
}
