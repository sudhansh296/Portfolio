import React from 'react';
import Navbar from '../components/Navbar';
import MusiqFlowSection from '../components/MusiqFlowSection';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';

export default function MobileApps() {
  return (
    <div>
      <Cursor />
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <MusiqFlowSection />
      </div>
      <Footer />
    </div>
  );
}