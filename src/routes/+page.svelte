<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });

  const features = [
    {
      icon: 'auto_awesome',
      title: 'AI-Powered Templates',
      description: 'Choose from hundreds of beautiful, professionally designed templates'
    },
    {
      icon: 'photo_frame',
      title: 'Dreamy Frames',
      description: 'Add magical frames with sparkles, clouds, and ethereal effects'
    },
    {
      icon: 'palette',
      title: 'Creative Filters',
      description: 'Transform your photos with vintage, dreamy, and modern filters'
    },
    {
      icon: 'touch_app',
      title: 'Drag & Drop',
      description: 'Intuitive editing with simple drag-and-drop functionality'
    },
    {
      icon: 'phone_android',
      title: 'Mobile Optimized',
      description: 'Works perfectly on desktop, tablet, and mobile devices'
    },
    {
      icon: 'download',
      title: 'High Quality Export',
      description: 'Download your collages in high resolution for printing'
    }
  ];

  const templates = [
    { name: '2x2 Grid', preview: '⊞', popular: true },
    { name: 'Heart Shape', preview: '♥', popular: true },
    { name: 'Scrapbook', preview: '📔', popular: false },
    { name: 'Polaroid Stack', preview: '📷', popular: true },
    { name: 'Circle Collage', preview: '○', popular: false },
    { name: 'Timeline', preview: '→', popular: false }
  ];
</script>

<svelte:head>
  <title>Dreamy Photo Frames - Create Beautiful Photo Collages Online</title>
  <meta name="description" content="Create stunning photo collages with our free online editor. Beautiful templates, dreamy frames, and magical filters. No download required - start creating now!" />
  <meta name="keywords" content="photo collage maker, online photo editor, collage templates, photo frames, free collage maker, photo editing, dreamy photos" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Dreamy Photo Frames - Create Beautiful Photo Collages" />
  <meta property="og:description" content="Free online photo collage maker with beautiful templates and dreamy effects" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/hero-image.jpg" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Dreamy Photo Frames - Photo Collage Maker" />
  <meta name="twitter:description" content="Create stunning photo collages online for free" />
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Dreamy Photo Frames",
    "description": "Free online photo collage maker with templates and effects",
    "url": "https://dreamy-photo-frames.com",
    "applicationCategory": "PhotoEditingApplication",
    "operatingSystem": "Web Browser",
    "screenshot": "/hero-image.jpg",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Dreamy Photo Frames"
    }
  }
  </script>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
  <!-- Navigation -->
  <nav class="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-white text-lg">photo_library</span>
          </div>
          <span class="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Dreamy Photo Frames
          </span>
        </div>
        
        <div class="hidden md:flex items-center space-x-8">
          <a href="#features" class="text-gray-600 hover:text-pink-600 transition-colors">Features</a>
          <a href="#templates" class="text-gray-600 hover:text-pink-600 transition-colors">Templates</a>
          <a href="#how-it-works" class="text-gray-600 hover:text-pink-600 transition-colors">How it Works</a>
          <a href="/editor" class="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors">
            Start Creating
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Create Magical
          </span>
          <br />
          <span class="text-gray-800">Photo Collages</span>
        </h1>
        
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform your memories into stunning visual stories with our intuitive collage maker. 
          Choose from beautiful templates, add dreamy frames, and create something magical.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="/editor" 
            class="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <span class="material-symbols-outlined mr-2">auto_awesome</span>
            Start Creating for Free
          </a>
          
          <button class="flex items-center text-gray-600 hover:text-pink-600 transition-colors">
            <span class="material-symbols-outlined mr-2">play_circle</span>
            Watch How it Works
          </button>
        </div>
        
        <div class="mt-12 text-sm text-gray-500">
          ✨ No download required • 🆓 Completely free • 📱 Works on all devices
        </div>
      </div>
    </div>
    
    <!-- Floating Elements -->
    <div class="absolute top-20 left-10 animate-float">
      <div class="w-16 h-16 bg-pink-200 rounded-full opacity-60"></div>
    </div>
    <div class="absolute top-40 right-20 animate-gentle-bounce">
      <div class="w-12 h-12 bg-purple-200 rounded-full opacity-60"></div>
    </div>
    <div class="absolute bottom-20 left-1/4 animate-float">
      <div class="w-20 h-20 bg-blue-200 rounded-full opacity-40"></div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-20 bg-white/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Everything You Need to Create
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Our powerful yet simple tools make it easy to turn your photos into beautiful collages
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each features as feature}
          <div class="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div class="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center mb-4">
              <span class="material-symbols-outlined text-white text-2xl">{feature.icon}</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p class="text-gray-600">{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Templates Preview -->
  <section id="templates" class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Beautiful Templates
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose from our collection of professionally designed templates or create your own
        </p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {#each templates as template}
          <div class="aspect-square bg-white rounded-xl p-4 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer relative group">
            <div class="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center text-4xl">
              {template.preview}
            </div>
            <div class="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="text-white font-medium">{template.name}</span>
            </div>
            {#if template.popular}
              <div class="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                Popular
              </div>
            {/if}
          </div>
        {/each}
      </div>
      
      <div class="text-center">
        <a 
          href="/editor" 
          class="inline-flex items-center bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors"
        >
          <span class="material-symbols-outlined mr-2">visibility</span>
          View All Templates
        </a>
      </div>
    </div>
  </section>

  <!-- How it Works -->
  <section id="how-it-works" class="py-20 bg-white/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How It Works
        </h2>
        <p class="text-xl text-gray-600">
          Create beautiful collages in just 3 simple steps
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-white font-bold text-xl">1</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Choose Template</h3>
          <p class="text-gray-600">Pick from our collection of beautiful templates or start with a blank canvas</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-white font-bold text-xl">2</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Upload Photos</h3>
          <p class="text-gray-600">Drag and drop your favorite photos or use our stock photo library</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-white font-bold text-xl">3</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Customize & Download</h3>
          <p class="text-gray-600">Add frames, filters, and text. Then download your masterpiece!</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
    <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
        Ready to Create Something Amazing?
      </h2>
      <p class="text-xl text-white/90 mb-8">
        Join thousands of creators who trust Dreamy Photo Frames for their collage needs
      </p>
      <a 
        href="/editor" 
        class="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined mr-2">rocket_launch</span>
        Start Creating Now
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-lg">photo_library</span>
            </div>
            <span class="font-bold text-xl">Dreamy Photo Frames</span>
          </div>
          <p class="text-gray-400 mb-4">
            Create beautiful photo collages with our free online editor. No download required.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Support</a>
          </div>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4">Features</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white transition-colors">Templates</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Frames</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Filters</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Text Tools</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4">Resources</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Tutorials</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 Dreamy Photo Frames. All rights reserved.</p>
      </div>
    </div>
  </footer>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
  
  html {
    scroll-behavior: smooth;
  }
</style>