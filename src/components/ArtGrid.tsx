import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArtCard } from './ArtCard';
import { FilterChips } from './FilterChips';

interface Artwork {
  slug: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  tags: string[];
  cover: string;
  description: string;
  createdAt: string;
  price?: string;
  available?: boolean;
}

interface ArtGridProps {
  artworks: Artwork[];
  showFilters?: boolean;
  limit?: number;
}

export const ArtGrid = ({ artworks, showFilters = false, limit }: ArtGridProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = artworks.flatMap(artwork => artwork.tags);
    return Array.from(new Set(tags)).sort();
  }, [artworks]);
  
  // Filter artworks based on selected tags
  const filteredArtworks = useMemo(() => {
    let filtered = artworks;
    
    if (selectedTags.length > 0) {
      filtered = artworks.filter(artwork =>
        selectedTags.every(tag => artwork.tags.includes(tag))
      );
    }
    
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    
    return filtered;
  }, [artworks, selectedTags, limit]);
  
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  return (
    <div className="space-y-8">
      {/* Filters */}
      {showFilters && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="heading-md">
              {selectedTags.length > 0 ? 'Filtered Artworks' : 'All Artworks'}
            </h2>
            <p className="body-sm text-muted-foreground">
              {filteredArtworks.length} {filteredArtworks.length === 1 ? 'artwork' : 'artworks'}
            </p>
          </div>
          
          <FilterChips
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
        </div>
      )}
      
      {/* Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ArtCard artwork={artwork} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* Empty State */}
      {filteredArtworks.length === 0 && selectedTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="body-lg text-muted-foreground mb-4">
            No artworks found with the selected filters.
          </p>
          <button
            onClick={() => setSelectedTags([])}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
};