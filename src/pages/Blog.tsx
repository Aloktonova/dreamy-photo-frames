import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Palette, 
  Users, 
  Zap,
  Camera,
  Share2,
  Star,
  ArrowLeft
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNavBar from '@/components/BottomNavBar';
import { useAuth } from '@/contexts/AuthContext';

const Blog = () => {
  const { user, login, logout } = useAuth();

  const blogPosts = [
    {
      id: 1,
      title: "Top 5 Ways to Use AI to Enhance Your Photos",
      date: "March 15, 2025",
      readTime: "5 min read",
      excerpt: "Discover how Dreamy's AI technology transforms ordinary photos into extraordinary memories. From automatic background removal to intelligent frame suggestions, learn the secrets behind creating stunning visuals that capture every emotion and detail. Our AI doesn't just edit—it understands your vision and amplifies it.",
      category: "AI & Technology",
      featured: true
    },
    {
      id: 2,
      title: "Why Custom Frames Make Your Memories Last Longer",
      date: "March 12, 2025",
      readTime: "4 min read",
      excerpt: "Explore the psychology behind custom photo frames and how they transform fleeting moments into cherished memories. Learn how Dreamy's personalized frame designs create emotional connections that make your photos more meaningful and memorable for years to come.",
      category: "Design & Psychology",
      featured: false
    },
    {
      id: 3,
      title: "Dreamy's Secret to Effortless Design for Everyone",
      date: "March 10, 2025",
      readTime: "6 min read",
      excerpt: "Uncover the design principles that make Dreamy accessible to everyone, regardless of artistic experience. From intuitive drag-and-drop interfaces to smart template suggestions, discover how we've democratized beautiful design and made creativity accessible to all.",
      category: "Design & Accessibility",
      featured: false
    },
    {
      id: 4,
      title: "The Future of Social Media: AI-Enhanced Visual Content",
      date: "March 8, 2025",
      readTime: "7 min read",
      excerpt: "Dive into how AI-powered photo enhancement is revolutionizing social media content creation. Learn how Dreamy's tools help creators stand out in crowded feeds while maintaining authenticity and personal connection with their audience.",
      category: "Social Media & Trends",
      featured: false
    },
    {
      id: 5,
      title: "From Amateur to Artist: How Dreamy Empowers Creativity",
      date: "March 5, 2025",
      readTime: "5 min read",
      excerpt: "Follow the journey of users who transformed from casual photo takers to confident visual storytellers using Dreamy. Discover the features and workflows that help beginners create professional-quality designs that rival those of experienced designers.",
      category: "User Stories & Growth",
      featured: false
    }
  ];

  const categories = [
    { name: "AI & Technology", icon: Sparkles, color: "from-blue-500 to-purple-500" },
    { name: "Design & Psychology", icon: Heart, color: "from-pink-500 to-orange-500" },
    { name: "Design & Accessibility", icon: Palette, color: "from-green-500 to-emerald-500" },
    { name: "Social Media & Trends", icon: Share2, color: "from-purple-500 to-pink-500" },
    { name: "User Stories & Growth", icon: Users, color: "from-orange-500 to-red-500" }
  ];

  return (
    <>
      <Navbar user={user} onLogout={logout} onLogin={login} />
      
      {/* Back to Home Button - Prominent placement */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Dreamy Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Discover insights, tips, and stories about AI-powered photo enhancement, creative design, and the future of visual storytelling.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Star size={20} />
              <span className="text-sm font-medium">Featured Post</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {blogPosts[0].title}
            </h2>
            <div className="flex items-center gap-4 mb-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="text-sm">{blogPosts[0].date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="text-sm">{blogPosts[0].readTime}</span>
              </div>
            </div>
            <p className="text-lg text-white/90 mb-6 leading-relaxed">
              {blogPosts[0].excerpt}
            </p>
            <button className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full transition-all duration-300">
              Read Full Article
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  
                  <button className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors">
                    Read More
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Topics
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover content tailored to your interests
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="group cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {category.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with Dreamy
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Get the latest insights on AI photo enhancement, design trends, and creative inspiration delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
      {user && <BottomNavBar />}
    </>
  );
};

export default Blog; 