
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  LayoutGrid, 
  Palette, 
  Image, 
  Settings, 
  Wand2,
  RefreshCw 
} from 'lucide-react';
import { themes } from '@/data/themes';
import { Theme } from '@/types/styles';
import { LayoutTemplate } from '@/data/layoutTemplates';
import LayoutSelector from './LayoutSelector';

interface CollageToolbarProps {
  currentTheme: Theme;
  currentLayout?: LayoutTemplate;
  onThemeChange: (theme: Theme) => void;
  onLayoutChange: (layout: LayoutTemplate) => void;
  onGenerateLayout: () => void;
  onOpenBackgroundPanel: () => void;
  onOpenStickerPanel: () => void;
}

const CollageToolbar = ({
  currentTheme,
  currentLayout,
  onThemeChange,
  onLayoutChange,
  onGenerateLayout,
  onOpenBackgroundPanel,
  onOpenStickerPanel
}: CollageToolbarProps) => {
  const [layoutSelectorOpen, setLayoutSelectorOpen] = useState(false);

  return (
    <>
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-8">
        <Tabs defaultValue="style" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 mb-6">
            <TabsTrigger value="style" className="flex items-center gap-2">
              <Palette size={16} />
              <span className="hidden sm:inline">Style</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <LayoutGrid size={16} />
              <span className="hidden sm:inline">Layout</span>
            </TabsTrigger>
            <TabsTrigger value="background" className="flex items-center gap-2">
              <Image size={16} />
              <span className="hidden sm:inline">Background</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Wand2 size={16} />
              <span className="hidden sm:inline">AI Tools</span>
            </TabsTrigger>
            <TabsTrigger value="effects" className="flex items-center gap-2 hidden lg:flex">
              <Settings size={16} />
              <span>Effects</span>
            </TabsTrigger>
            <TabsTrigger value="more" className="flex items-center gap-2 hidden lg:flex">
              <RefreshCw size={16} />
              <span>More</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="style" className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-medium text-gray-700">Choose Theme:</h3>
              <div className="flex gap-2 flex-wrap">
                {themes.map((theme) => (
                  <Button
                    key={theme.id}
                    onClick={() => onThemeChange(theme)}
                    variant={currentTheme.id === theme.id ? "default" : "outline"}
                    size="sm"
                    className={`transition-all duration-300 ${
                      currentTheme.id === theme.id
                        ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg scale-105'
                        : 'hover:scale-105'
                    }`}
                  >
                    {theme.name}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Collage Layout</h3>
                <p className="text-sm text-gray-500">
                  Current: {currentLayout?.name || 'Custom Layout'}
                </p>
              </div>
              <Button
                onClick={() => setLayoutSelectorOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition-transform"
              >
                <LayoutGrid size={16} className="mr-2" />
                Choose Layout
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="background" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-700">Background & Border</h3>
              <Button
                onClick={onOpenBackgroundPanel}
                variant="outline"
                className="hover:scale-105 transition-transform"
              >
                <Image size={16} className="mr-2" />
                Customize
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">AI-Powered Tools</h3>
                <p className="text-sm text-gray-500">Let AI create perfect layouts for you</p>
              </div>
              <Button
                onClick={onGenerateLayout}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 transition-transform"
              >
                <Wand2 size={16} className="mr-2" />
                Generate AI Layout
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-700">Stickers & Effects</h3>
              <Button
                onClick={onOpenStickerPanel}
                variant="outline"
                className="hover:scale-105 transition-transform"
              >
                <Settings size={16} className="mr-2" />
                Add Stickers
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="more" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-16 flex-col">
                <RefreshCw size={20} className="mb-1" />
                <span className="text-xs">Reset All</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Settings size={20} className="mb-1" />
                <span className="text-xs">Settings</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <LayoutSelector
        currentLayout={currentLayout}
        onSelectLayout={onLayoutChange}
        isOpen={layoutSelectorOpen}
        onClose={() => setLayoutSelectorOpen(false)}
      />
    </>
  );
};

export default CollageToolbar;
