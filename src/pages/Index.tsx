import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { ArtGrid } from '@/components/ArtGrid';
import { useArtworks } from '@/hooks/useArtworks';
import siteData from '@/content/settings/site.json';

const Index = () => {
  const { artworks, loading } = useArtworks();
  const featuredWorks = artworks.slice(0, 3);
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-4 text-center">
            <div className="w-32 h-8 bg-muted rounded mx-auto"></div>
            <div className="w-48 h-4 bg-muted rounded mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Works Section */}
      <section id="featured-works" className="section-spacing">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 space-y-4"
          >
            <h2 className="heading-lg">Featured Works</h2>
            <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
              A curated selection of recent artworks showcasing the evolution of technique and creative vision.
            </p>
          </motion.div>
          
          <ArtGrid artworks={featuredWorks} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/gallery" className="btn-primary">
              View Full Gallery
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* About Preview Section */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="heading-lg">About the Artist</h2>
              <p className="body-lg text-muted-foreground leading-relaxed">
                {siteData.about}
              </p>
              <Link to="/about" className="btn-secondary inline-flex">
                Learn More
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src={featuredWorks[0]?.cover}
                  alt="Artist at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="heading-lg">Start a Conversation</h2>
            <p className="body-lg text-muted-foreground">
              Interested in commissioning a piece or learning more about available works? 
              Let's discuss your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`https://wa.me/${siteData.whatsAppNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(siteData.artistName)}%2C%20I%27m%20interested%20in%20your%20artwork`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Message on WhatsApp
              </a>
              <Link to="/contact" className="btn-secondary">
                Contact Form
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
