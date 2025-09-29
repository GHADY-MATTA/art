import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { ArtGrid } from '@/components/ArtGrid';
import { useArtworks } from '@/hooks/useArtworks';

const Gallery = () => {
  const { artworks, loading } = useArtworks();
  
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
      <div className="section-spacing">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 space-y-4"
          >
            <h1 className="heading-lg">Gallery</h1>
            <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the complete collection of artworks, each piece telling its own unique story through 
              careful composition and thoughtful execution.
            </p>
          </motion.div>
          
          <ArtGrid artworks={artworks} showFilters={true} />
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;