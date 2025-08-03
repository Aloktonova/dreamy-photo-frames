import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid3X3,
  List,
  Search,
  Filter,
  Heart,
  Download,
  Share2,
  Image,
  Video,
  Clock,
  User,
  Eye,
  TrendingUp,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/SeoHead';
import { toast } from 'sonner';

interface MediaItem {
  id: string;
  media_type: 'image' | 'video';
  media_url: string;
  prompt: string;
  style?: string;
  tags?: string[];
  likes_count: number;
  created_at: string;
  user_id: string;
}

const Showcase = () => {
  const { user } = useAuth();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  useEffect(() => {
    loadMediaItems();
  }, [filterType, sortBy]);

  const loadMediaItems = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('media_generated')
        .select('*')
        .eq('is_public', true);

      if (filterType !== 'all') {
        query = query.eq('media_type', filterType);
      }

      switch (sortBy) {
        case 'popular':
          query = query.order('likes_count', { ascending: false });
          break;
        case 'trending':
          // For trending, we'll use a combination of recent + likes
          query = query.order('created_at', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query.limit(50);

      if (error) {
        console.error('Error loading media:', error);
        toast.error('Failed to load showcase items');
        return;
      }

      setMediaItems((data || []) as MediaItem[]);
    } catch (error) {
      console.error('Error loading media:', error);
      toast.error('Failed to load showcase items');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = mediaItems.filter(item =>
    item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleLike = async (itemId: string) => {
    if (!user) {
      toast.error('Please sign in to like items');
      return;
    }

    try {
      // For now, just update the local state
      setMediaItems(prev => 
        prev.map(item => 
          item.id === itemId 
            ? { ...item, likes_count: item.likes_count + 1 }
            : item
        )
      );
      toast.success('Liked!');
    } catch (error) {
      console.error('Error liking item:', error);
      toast.error('Failed to like item');
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "MediaGen AI Showcase",
    "description": "Discover amazing AI-generated images and videos created by our community",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredItems.length
    }
  };

  return (
    <Layout>
      <SeoHead 
        title="AI Media Showcase"
        description="Discover amazing AI-generated images and videos created by our community. Get inspired and create your own."
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Community Showcase
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover incredible AI-generated content from our creative community
            </p>
          </motion.div>

          {/* Filters and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search prompts, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={(value: 'all' | 'image' | 'video') => setFilterType(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Media</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value: 'recent' | 'popular' | 'trending') => setSortBy(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{filteredItems.length}</div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Image className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">
                  {filteredItems.filter(item => item.media_type === 'image').length}
                </div>
                <div className="text-sm text-muted-foreground">Images</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Video className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">
                  {filteredItems.filter(item => item.media_type === 'video').length}
                </div>
                <div className="text-sm text-muted-foreground">Videos</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold">
                  {filteredItems.reduce((sum, item) => sum + item.likes_count, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Likes</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Media Grid/List */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-square bg-muted rounded-lg" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded mb-2" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300">
                      {viewMode === 'grid' ? (
                        <>
                          <div className="relative overflow-hidden rounded-t-lg">
                            <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 to-blue-900 flex items-center justify-center">
                              {item.media_type === 'image' ? (
                                <Image className="w-12 h-12 text-purple-500" />
                              ) : (
                                <Video className="w-12 h-12 text-blue-500" />
                              )}
                            </div>
                            <div className="absolute top-2 left-2">
                              <Badge variant={item.media_type === 'image' ? 'default' : 'secondary'}>
                                {item.media_type}
                              </Badge>
                            </div>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <p className="text-sm font-medium line-clamp-2 mb-2">
                              {item.prompt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(item.created_at).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleLike(item.id)}
                                  className="flex items-center gap-1 hover:text-red-500 transition-colors"
                                >
                                  <Heart className="w-3 h-3" />
                                  {item.likes_count}
                                </button>
                                <button className="hover:text-blue-500 transition-colors">
                                  <Share2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </CardContent>
                        </>
                      ) : (
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 to-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                              {item.media_type === 'image' ? (
                                <Image className="w-8 h-8 text-purple-500" />
                              ) : (
                                <Video className="w-8 h-8 text-blue-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <Badge variant={item.media_type === 'image' ? 'default' : 'secondary'}>
                                  {item.media_type}
                                </Badge>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleLike(item.id)}
                                    className="flex items-center gap-1 text-sm hover:text-red-500 transition-colors"
                                  >
                                    <Heart className="w-4 h-4" />
                                    {item.likes_count}
                                  </button>
                                  <button className="hover:text-blue-500 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <p className="font-medium mb-1">{item.prompt}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(item.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {!loading && filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find more content.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Showcase;