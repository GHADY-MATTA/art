import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, MessageCircle, Calendar, Palette, Ruler } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { useArtworks } from '@/hooks/useArtworks';
import { useToast } from '@/hooks/use-toast';
import siteData from '@/content/settings/site.json';

const ArtworkDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getArtworkBySlug, artworks } = useArtworks();
  const { toast } = useToast();
  
  if (!slug) {
    return <Navigate to="/gallery" replace />;
  }
  
  const artwork = getArtworkBySlug(slug);
  
  if (!artwork) {
    return <Navigate to="/gallery" replace />;
  }
  
  const handleShare = async () => {
    const url = window.location.href;
    const title = `${artwork.title} by ${siteData.artistName}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        // Fallback to clipboard
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Link copied!",
        description: "The artwork link has been copied to your clipboard.",
      });
    });
  };
  
  const relatedArtworks = artworks
    .filter(art => art.slug !== artwork.slug && 
            art.tags.some(tag => artwork.tags.includes(tag)))
    .slice(0, 3);
  
  const inquiryMessage = `Hello ${siteData.artistName}, I'm interested in "${artwork.title}" (${artwork.year}). Could you tell me more about this piece?`;
  
  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-main">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link 
              to="/gallery" 
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="body-base">Back to Gallery</span>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary/20">
                <img
                  src={artwork.cover}
                  alt={artwork.images[0]?.alt || artwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleShare}
                  className="flex-1 btn-secondary"
                >
                  <Share2 size={18} className="mr-2" />
                  Share
                </button>
                <button className="p-3 rounded-2xl border border-border hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-200">
                  <Heart size={20} />
                </button>
              </div>
            </motion.div>
            
            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Title & Basic Info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h1 className="heading-lg">{artwork.title}</h1>
                  {artwork.available !== undefined && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      artwork.available 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {artwork.available ? 'Available' : 'Sold'}
                    </span>
                  )}
                </div>
                
                <p className="body-lg text-muted-foreground">
                  {artwork.medium} • {artwork.year}
                </p>
                
                {artwork.price && (
                  <p className="heading-sm text-accent">
                    {artwork.price}
                  </p>
                )}
              </div>
              
              {/* Description */}
              <div className="space-y-4">
                <h2 className="heading-sm">About this piece</h2>
                <p className="body-lg text-muted-foreground leading-relaxed">
                  {artwork.description}
                </p>
              </div>
              
              {/* Technical Details */}
              <div className="space-y-4">
                <h2 className="heading-sm">Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Ruler size={18} className="text-muted-foreground" />
                    <div>
                      <p className="body-sm font-medium">Dimensions</p>
                      <p className="body-sm text-muted-foreground">{artwork.dimensions}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Palette size={18} className="text-muted-foreground" />
                    <div>
                      <p className="body-sm font-medium">Medium</p>
                      <p className="body-sm text-muted-foreground">{artwork.medium}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar size={18} className="text-muted-foreground" />
                    <div>
                      <p className="body-sm font-medium">Year</p>
                      <p className="body-sm text-muted-foreground">{artwork.year}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="space-y-4">
                <h2 className="heading-sm">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/gallery?tags=${tag}`}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {tag.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Inquiry CTA */}
              <div className="bg-secondary/30 rounded-2xl p-6 space-y-4">
                <h3 className="heading-sm">Interested in this piece?</h3>
                <p className="body-base text-muted-foreground">
                  {artwork.available 
                    ? "This artwork is available for purchase. Get in touch to discuss pricing and shipping."
                    : "While this piece has found its home, I'd be happy to discuss similar works or commission a custom piece."
                  }
                </p>
                <a
                  href={`https://wa.me/${siteData.whatsAppNumber.replace('+', '')}?text=${encodeURIComponent(inquiryMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Inquire About This Piece
                </a>
              </div>
            </motion.div>
          </div>
          
          {/* Related Artworks */}
          {relatedArtworks.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-20 pt-12 border-t border-border"
            >
              <div className="mb-8">
                <h2 className="heading-md">Related Works</h2>
                <p className="body-base text-muted-foreground mt-2">
                  Other pieces that share similar themes or techniques
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArtworks.map((relatedArt, index) => (
                  <motion.div
                    key={relatedArt.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link to={`/art/${relatedArt.slug}`} className="group block">
                      <div className="art-card">
                        <div className="aspect-[3/4] rounded-t-2xl overflow-hidden">
                          <img
                            src={relatedArt.cover}
                            alt={relatedArt.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 className="body-base font-medium group-hover:text-accent transition-colors">
                            {relatedArt.title}
                          </h3>
                          <p className="body-sm text-muted-foreground">
                            {relatedArt.medium} • {relatedArt.year}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ArtworkDetail;