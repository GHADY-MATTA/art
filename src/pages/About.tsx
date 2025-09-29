import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useArtworks } from '@/hooks/useArtworks';
import siteData from '@/content/settings/site.json';

const About = () => {
  const { artworks } = useArtworks();
  const recentWork = artworks[0];
  
  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-main">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-6"
          >
            <h1 className="heading-lg">About {siteData.artistName}</h1>
            <p className="heading-sm text-muted-foreground max-w-3xl mx-auto font-light">
              {siteData.tagline}
            </p>
          </motion.div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="heading-md">Artist Statement</h2>
                <div className="space-y-4 body-lg text-muted-foreground leading-relaxed">
                  <p>
                    {siteData.about}
                  </p>
                  <p>
                    My work is an exploration of the spaces between the tangible and the ephemeral, 
                    where each stroke of ink or charcoal becomes a conversation with the medium itself. 
                    Through traditional techniques infused with contemporary sensibilities, I seek to 
                    capture moments of quiet revelation.
                  </p>
                  <p>
                    The interplay of light and shadow, presence and absence, guides my artistic practice. 
                    Whether working with the flowing spontaneity of ink or the controlled precision of 
                    mixed media, each piece emerges from a dialogue between intention and discovery.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="heading-md">Process & Philosophy</h2>
                <div className="space-y-4 body-lg text-muted-foreground leading-relaxed">
                  <p>
                    My studio practice begins in silence and observation. Before the first mark is made, 
                    I spend time with the blank surface, understanding its texture, its possibilities, 
                    its inherent character. This meditative approach influences every aspect of the creative process.
                  </p>
                  <p>
                    Working primarily with traditional materials—ink, charcoal, and natural papers—I believe 
                    in the authenticity that comes from direct engagement with time-tested mediums. 
                    Each material has its own voice, its own limitations, and its own gifts to offer.
                  </p>
                </div>
              </div>
              
              <div className="pt-6">
                <Link to="/contact" className="btn-primary">
                  Get in Touch
                </Link>
              </div>
            </motion.div>
            
            {/* Image Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Featured Artwork */}
              {recentWork && (
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                    <img
                      src={recentWork.cover}
                      alt={recentWork.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="heading-sm">{recentWork.title}</h3>
                    <p className="body-sm text-muted-foreground">
                      {recentWork.medium} • {recentWork.year}
                    </p>
                    <p className="body-sm text-muted-foreground">
                      {recentWork.description}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Artist Info */}
              <div className="bg-secondary/30 rounded-2xl p-8 space-y-6">
                <h3 className="heading-sm">Artist Details</h3>
                <div className="space-y-4 body-base">
                  <div>
                    <span className="font-medium text-foreground">Location:</span>
                    <span className="text-muted-foreground ml-2">{siteData.location}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Medium:</span>
                    <span className="text-muted-foreground ml-2">Ink, Charcoal, Mixed Media</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Style:</span>
                    <span className="text-muted-foreground ml-2">Contemporary, Minimalist</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Available for:</span>
                    <span className="text-muted-foreground ml-2">Commissions, Exhibitions</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <a 
                    href={`https://wa.me/${siteData.whatsAppNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(siteData.artistName)}%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20work`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full text-center"
                  >
                    Commission a Piece
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;