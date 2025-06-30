import { useRef } from 'react';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Portfolio } from '@/components/Portfolio';
import { About } from '@/components/About';
import { Partners } from '@/components/Partners';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  const footerRef = useRef<HTMLElement>(null); // Step 1: Create the ref

  return (
    <div className="min-h-screen">
      <Hero footerRef={footerRef} /> {/* Step 2: Pass it to Hero */}
      <Services />
      <Portfolio />
      <About />
      <Partners />
      <Contact />
      <footer ref={footerRef}> {/* Step 3: Attach ref to Footer wrapper */}
        <Footer />
      </footer>
    </div>
  );
};

export default Index;
