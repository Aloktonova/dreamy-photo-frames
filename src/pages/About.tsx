import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Users, 
  Globe, 
  Award, 
  Shield, 
  Zap,
  Heart,
  ArrowRight,
  Mail,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/SeoHead';

const About = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Create stunning images and videos using advanced AI models with state-of-the-art quality."
    },
    {
      icon: Shield,
      title: "Smart Analysis",
      description: "Analyze media content with Google Cloud Vision and Video Intelligence for deep insights."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of creators sharing and discovering amazing AI-generated content."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate and analyze content in seconds with our optimized infrastructure."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Available worldwide with multi-language support and localized content."
    },
    {
      icon: Award,
      title: "Professional Quality",
      description: "Enterprise-grade results suitable for commercial and professional use."
    }
  ];

  const stats = [
    { number: "2M+", label: "Media Generated" },
    { number: "500K+", label: "Active Users" },
    { number: "50+", label: "AI Models" },
    { number: "99.9%", label: "Uptime" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MediaGen AI",
    "description": "Advanced AI media generation and analysis platform",
    "url": "https://mediagen.ai",
    "logo": "https://mediagen.ai/logo.png",
    "sameAs": [
      "https://twitter.com/mediagen_ai",
      "https://github.com/mediagen-ai"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "customer service",
      "email": "support@mediagen.ai"
    },
    "foundingDate": "2024",
    "numberOfEmployees": "10-50",
    "industry": "Artificial Intelligence"
  };

  return (
    <Layout>
      <SeoHead 
        title="About MediaGen AI - Advanced AI Media Platform"
        description="Learn about MediaGen AI, the leading platform for AI-powered media generation and analysis. Discover our mission, features, and the technology behind our innovative solutions."
        keywords="about MediaGen AI, AI media platform, company information, AI technology, media generation"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 dark:from-muted/5 dark:via-primary/5 dark:to-secondary/5">
        {/* Hero Section */}
        <motion.section 
          className="py-20 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 mb-6">
                <Heart className="w-5 h-5 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Powering Creative Excellence</span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              About
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                MediaGen AI
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We're revolutionizing content creation with cutting-edge AI technology, 
              making professional-quality media generation accessible to everyone.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 rounded-full border-primary/20 hover:border-primary/40"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="py-16 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="py-20 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                What Makes Us
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Different</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our platform combines the latest AI innovations with user-friendly design to deliver exceptional results
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-foreground mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              We believe that everyone should have access to professional-quality content creation tools. 
              Our mission is to democratize AI-powered media generation, making it simple, affordable, 
              and accessible to creators, businesses, and individuals worldwide.
            </motion.p>
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Through continuous innovation and community feedback, we're building the future of 
              creative content generation, one pixel at a time.
            </motion.p>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          className="py-20 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-foreground mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Get in Touch
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Have questions or want to learn more? We'd love to hear from you.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Support
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 rounded-full border-primary/20 hover:border-primary/40"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Live Chat
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default About;