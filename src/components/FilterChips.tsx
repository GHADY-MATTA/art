import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface FilterChipsProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export const FilterChips = ({ tags, selectedTags, onTagToggle }: FilterChipsProps) => {
  const formatTag = (tag: string) => {
    return tag.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  
  return (
    <div className="space-y-4">
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="body-sm text-muted-foreground">Active filters:</span>
          {selectedTags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className="filter-chip active group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {formatTag(tag)}
              <X size={14} className="ml-1 group-hover:rotate-90 transition-transform duration-200" />
            </motion.button>
          ))}
          <button
            onClick={() => selectedTags.forEach(tag => onTagToggle(tag))}
            className="body-sm text-muted-foreground hover:text-foreground underline transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
      
      {/* All Tags */}
      <div className="space-y-2">
        <span className="body-sm text-muted-foreground">Filter by:</span>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`filter-chip ${selectedTags.includes(tag) ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {formatTag(tag)}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};