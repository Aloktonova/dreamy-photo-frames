import React from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Facebook, Instagram, Download, Printer, Share2, X, Whatsapp } from 'lucide-react';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  caption?: string;
}

const shareOptions = [
  {
    label: 'WhatsApp',
    icon: <Whatsapp className="w-8 h-8 text-green-500" />,
    handler: (imageUrl: string, caption: string) => {
      const text = encodeURIComponent((caption || '') + ' ' + imageUrl);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    },
  },
  {
    label: 'Instagram',
    icon: <Instagram className="w-8 h-8 text-pink-500" />,
    handler: (imageUrl: string) => {
      // Instagram web does not support direct image sharing; prompt download
      window.open('https://www.instagram.com/', '_blank');
    },
  },
  {
    label: 'Facebook',
    icon: <Facebook className="w-8 h-8 text-blue-600" />,
    handler: (imageUrl: string) => {
      const url = encodeURIComponent(imageUrl);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    },
  },
  {
    label: 'Print',
    icon: <Printer className="w-8 h-8 text-gray-700" />,
    handler: (imageUrl: string) => {
      const win = window.open(imageUrl, '_blank');
      if (win) win.print();
    },
  },
  {
    label: 'Download',
    icon: <Download className="w-8 h-8 text-indigo-600" />,
    handler: (imageUrl: string) => {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = 'collage.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
  {
    label: 'Other',
    icon: <Share2 className="w-8 h-8 text-orange-500" />,
    handler: (imageUrl: string, caption: string) => {
      if (navigator.share) {
        navigator.share({
          title: 'Dreamy Photo Frames',
          text: caption,
          url: imageUrl,
        });
      } else {
        window.prompt('Copy and share this link:', imageUrl);
      }
    },
  },
];

const ShareModal: React.FC<ShareModalProps> = ({ open, onClose, imageUrl, caption = 'Check out my collage from Dreamy Photo Frames!' }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/40 z-50" />
      <DialogContent className="fixed left-1/2 top-1/2 max-w-md w-full -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-4 sm:p-8 z-50 flex flex-col items-center">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <X className="w-6 h-6" />
        </button>
        <img
          src={imageUrl}
          alt="Collage preview"
          className="w-full max-w-xs max-h-60 object-contain rounded-lg mb-4 border"
        />
        <div className="w-full flex flex-wrap justify-center gap-4 mb-4">
          {shareOptions.map((option) => (
            <button
              key={option.label}
              className="flex flex-col items-center justify-center w-20 h-20 bg-gray-50 rounded-xl shadow hover:bg-gray-100 focus:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              onClick={() => option.handler(imageUrl, caption)}
              aria-label={option.label}
            >
              {option.icon}
              <span className="mt-2 text-xs font-medium text-gray-700">{option.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary mt-2"
        >
          Cancel
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal; 