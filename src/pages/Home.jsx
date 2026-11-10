import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Projects from '../components/Projects.jsx';
import Writing from '../components/Writing.jsx';
import Experience from '../components/Experience.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  const { hash } = useLocation();

  // Scroll to a section when arriving from another page (e.g. /#contact).
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <Hero />
      <Projects />
      <Writing />
      <Experience />
      <Contact />
    </>
  );
}
