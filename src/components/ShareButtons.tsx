import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Download, Share2, Instagram, MessageCircle } from "lucide-react";

const ShareButtons = ({ imageUrl }: { imageUrl: string }) => {
  const shareOnTwitter = () => {
    const text = encodeURIComponent("Check out my collage from Dreamy Photo Frames!");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(imageUrl)}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent("Check out my collage! " + imageUrl);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "collage.jpg";
    link.click();
  };

  const shareNative = () => {
    if (navigator.share) {
      navigator.share({
        title: "Dreamy Photo Frames Collage",
        text: "Check out my collage!",
        url: imageUrl,
      });
    } else {
      alert("Native sharing is not supported on this device/browser.");
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button onClick={shareOnWhatsApp} className="bg-green-500 hover:bg-green-600 text-white flex flex-col items-center px-4 py-2 rounded-lg">
        <MessageCircle className="mb-1" /> WhatsApp
      </Button>
      <Button onClick={downloadImage} className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white flex flex-col items-center px-4 py-2 rounded-lg">
        <Instagram className="mb-1" /> Download for Instagram
      </Button>
      <Button onClick={shareOnFacebook} className="bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center px-4 py-2 rounded-lg">
        <Facebook className="mb-1" /> Facebook
      </Button>
      <Button onClick={shareNative} className="bg-gray-800 hover:bg-gray-900 text-white flex flex-col items-center px-4 py-2 rounded-lg">
        <Share2 className="mb-1" /> Other
      </Button>
    </div>
  );
};

export default ShareButtons; 