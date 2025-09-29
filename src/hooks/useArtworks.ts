import { useState, useEffect } from 'react';

interface Artwork {
  slug: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  tags: string[];
  cover: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
  description: string;
  createdAt: string;
  price?: string;
  available?: boolean;
}

// Import artwork data
import inkSparrowData from '@/content/artworks/ink-sparrow-2025.json';
import urbanBotanicaData from '@/content/artworks/urban-botanica.json';
import etherealFormsData from '@/content/artworks/ethereal-forms.json';

// Import images
import inkSparrowImg from '@/assets/ink-sparrow.jpg';
import urbanBotanicaImg from '@/assets/urban-botanica.jpg';
import etherealFormsImg from '@/assets/ethereal-forms.jpg';

const artworkImages: Record<string, string> = {
  'ink-sparrow-2025': inkSparrowImg,
  'urban-botanica': urbanBotanicaImg,
  'ethereal-forms': etherealFormsImg,
};

const rawArtworks = [inkSparrowData, urbanBotanicaData, etherealFormsData];

export const useArtworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Process artworks and map to actual images
    const processedArtworks = rawArtworks.map(artwork => ({
      ...artwork,
      cover: artworkImages[artwork.slug] || artwork.cover,
      images: artwork.images.map(img => ({
        ...img,
        src: artworkImages[artwork.slug] || img.src,
      })),
    }));
    
    setArtworks(processedArtworks);
    setLoading(false);
  }, []);
  
  const getArtworkBySlug = (slug: string) => {
    return artworks.find(artwork => artwork.slug === slug);
  };
  
  const getArtworksByTag = (tag: string) => {
    return artworks.filter(artwork => artwork.tags.includes(tag));
  };
  
  const getFeaturedArtworks = (limit: number = 3) => {
    return artworks.slice(0, limit);
  };
  
  return {
    artworks,
    loading,
    getArtworkBySlug,
    getArtworksByTag,
    getFeaturedArtworks,
  };
};