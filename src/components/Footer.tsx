import { Link } from 'react-router-dom';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import siteData from '@/content/settings/site.json';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'Instagram',
      href: siteData.socials.instagram,
      icon: Instagram,
    },
    {
      name: 'Email',
      href: `mailto:${siteData.email}`,
      icon: Mail,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/${siteData.whatsAppNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(siteData.artistName)}%2C%20I%27m%20interested%20in%20your%20artwork`,
      icon: MessageCircle,
    },
  ];
  
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Artist Info */}
          <div className="space-y-4">
            <h3 className="heading-sm">{siteData.artistName}</h3>
            <p className="body-sm text-muted-foreground">
              {siteData.tagline}
            </p>
            <p className="body-sm text-muted-foreground">
              {siteData.location}
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="heading-sm">Explore</h3>
            <nav className="space-y-2">
              <Link 
                to="/gallery" 
                className="block body-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Gallery
              </Link>
              <Link 
                to="/about" 
                className="block body-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block body-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
          
          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="heading-sm">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background border border-border hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-200"
                  aria-label={link.name}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="body-sm text-muted-foreground">
              © {currentYear} {siteData.artistName}. All rights reserved.
            </p>
            <p className="body-sm text-muted-foreground">
              Built with care for the arts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};