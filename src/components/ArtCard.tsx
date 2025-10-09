import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Heart } from 'lucide-react';

import { useState } from "react";                 // NEW
import Lightbox from "@/components/Lightbox";      // NEW
import { useFavorites } from "@/hooks/useFavorites"; // NEW


interface ArtCardProps {
  artwork: {
    slug: string;
    title: string;
    year: number;
    medium: string;
    cover: string;
    tags: string[];
    price?: string;
    available?: boolean;
  };
  index: number;
}

export const ArtCard = ({ artwork, index }: ArtCardProps) => {
  const [open, setOpen] = useState(false);
  const { isFav, toggle } = useFavorites();

  const imgSrc = artwork.cover; // or artwork.images?.[0]?.src ?? artwork.cover
  const liked = isFav(artwork.slug);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/art/${artwork.slug}`} className="block">
        <div className="art-card group-hover:shadow-hover transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
            <img
              src={artwork.cover}
              alt={artwork.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Overlay with Actions */}
            <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex space-x-3">
                {/* Eye → open lightbox */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(true);
                  }}
                  aria-label="View full image"
                  className="p-3 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
                >
                  <Eye size={20} className="text-foreground" />
                </button>

                {/* Heart → toggle favorite */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggle(artwork.slug);
                  }}
                  aria-label={
                    liked ? "Remove from favorites" : "Add to favorites"
                  }
                  className={`p-3 rounded-full backdrop-blur-sm ${
                    liked
                      ? "bg-red-600 text-white"
                      : "bg-background/90 hover:bg-background text-foreground"
                  }`}
                >
                  <Heart size={20} className={liked ? "fill-current" : ""} />
                </button>
              </div>
            </div>

            {/* Availability Badge */}
            {artwork.available !== undefined && (
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    artwork.available
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {artwork.available ? "Available" : "Sold"}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-3">
            <div className="space-y-1">
              <h3 className="heading-sm group-hover:text-accent transition-colors">
                {artwork.title}
              </h3>
              <p className="body-sm text-muted-foreground">
                {artwork.medium} • {artwork.year}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {artwork.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
              {artwork.tags.length > 3 && (
                <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                  +{artwork.tags.length - 3}
                </span>
              )}
            </div>

            {/* Price */}
            {artwork.price && (
              <p className="body-sm font-medium text-accent">{artwork.price}</p>
            )}
          </div>
        </div>
        <Lightbox
          open={open}
          onOpenChange={setOpen}
          src={imgSrc}
          alt={artwork.title}
        />
      </Link>
    </motion.div>
  );
};