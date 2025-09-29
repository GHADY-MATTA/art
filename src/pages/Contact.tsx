import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, MessageCircle, Instagram, Send } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import siteData from '@/content/settings/site.json';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you'd send this to your backend
    console.log('Form submitted:', formData);
    
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };
  
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: siteData.email,
      href: `mailto:${siteData.email}`,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: siteData.whatsAppNumber,
      href: `https://wa.me/${siteData.whatsAppNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(siteData.artistName)}%2C%20I%27d%20like%20to%20get%20in%20touch`,
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@elenarivera.art',
      href: siteData.socials.instagram,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: siteData.location,
      href: null,
    },
  ];
  
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
            <h1 className="heading-lg">Get in Touch</h1>
            <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question about a piece, interested in commissioning work, or just want to say hello? 
              I'd love to hear from you.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="body-sm font-medium text-foreground">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="body-sm font-medium text-foreground">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="body-sm font-medium text-foreground">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="commission">Commission Inquiry</option>
                    <option value="purchase">Purchase Artwork</option>
                    <option value="exhibition">Exhibition Opportunity</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="press">Press Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="body-sm font-medium text-foreground">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send size={18} />
                      <span>Send Message</span>
                    </div>
                  )}
                </button>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="heading-md mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start space-x-4">
                      <div className="p-3 rounded-full bg-secondary border border-border">
                        <item.icon size={20} className="text-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="body-sm font-medium text-foreground">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="body-base text-muted-foreground hover:text-accent transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="body-base text-muted-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick WhatsApp CTA */}
              <div className="bg-secondary/30 rounded-2xl p-8 space-y-4">
                <h3 className="heading-sm">Prefer instant messaging?</h3>
                <p className="body-base text-muted-foreground">
                  For quick questions or to discuss a commission, feel free to reach out directly on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${siteData.whatsAppNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(siteData.artistName)}%2C%20I%27d%20like%20to%20get%20in%20touch`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full text-center"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Message on WhatsApp
                </a>
              </div>
              
              {/* Response Time */}
              <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 space-y-3">
                <h3 className="heading-sm text-accent">Response Time</h3>
                <p className="body-sm text-muted-foreground">
                  I typically respond to messages within 24-48 hours. For urgent inquiries, 
                  WhatsApp is the fastest way to reach me.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;