
import React from 'react';
import { LanguageProvider } from './components/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-950 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
        {/* Ambient background glows */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        </div>
        
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Products />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
