import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {/* Animated gradient orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full animate-float-delayed" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-900/8 blur-[100px] rounded-full animate-float-slow" />

        {/* Moving particles */}
        <div className="absolute top-[20%] left-[60%] w-32 h-32 bg-indigo-500/20 blur-[60px] rounded-full animate-drift-1" />
        <div className="absolute top-[60%] left-[10%] w-24 h-24 bg-blue-500/20 blur-[50px] rounded-full animate-drift-2" />
        <div className="absolute top-[80%] left-[70%] w-28 h-28 bg-violet-500/15 blur-[55px] rounded-full animate-drift-3" />
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
  );
};

export default HomePage;
