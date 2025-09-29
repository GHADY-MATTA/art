import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-studio.jpg';
import siteData from '@/content/settings/site.json';

export const Hero = () => {
  const scrollToGallery = () => {
    document.getElementById('featured-works')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Artist studio with natural lighting and art supplies"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-main text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6 md:space-y-8"
        >
          {/* Artist Name with Parallax */}
          <motion.h1 
            className="heading-xl text-foreground parallax-element"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            whileInView={{ y: [-10, 10] }}
            viewport={{ once: false }}
            style={{
              transition: 'transform 0.1s ease-out',
            }}
          >
            {siteData.artistName}
          </motion.h1>
          
          {/* Tagline */}
          <motion.p 
            className="heading-sm text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            {siteData.tagline}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <Link 
              to="/gallery" 
              className="btn-primary min-w-[160px]"
            >
              View Gallery
            </Link>
            <a 
              href={`https://wa.me/${siteData.whatsAppNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(siteData.artistName)}%2C%20I%27m%20interested%20in%20your%20artwork`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary min-w-[160px]"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToGallery}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-background/80 border border-border hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to featured works"
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
};