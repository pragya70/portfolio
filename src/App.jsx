import Cursor from './components/Cursor';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();

  return (
    <>
      <Cursor />
      <Loader />
      <ScrollProgress />
      <ThreeBackground />
      <Navbar />
      <main className="relative z-10 pt-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
