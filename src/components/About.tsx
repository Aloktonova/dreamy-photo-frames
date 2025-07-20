import React from 'react';

const About: React.FC = () => (
  <div className="max-w-2xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-lg mt-8 mb-12 text-gray-800">
    <h1 className="text-3xl font-bold mb-4 text-purple-700">About Dreamy Photo Frames</h1>
    <p className="mb-6 text-lg">
      <b>Dreamy Photo Frames</b> is an easy-to-use online tool for making beautiful photo collages and enhancing your images with creative edits. Whether you’re capturing memories or personalizing photos for social sharing, our platform offers everything you need—no design skills required.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-3">How to Use</h2>
    <ol className="list-decimal list-inside space-y-2 mb-6">
      <li><b>Sign Up or Log In:</b> Create a free account or sign in with Google/email for secure access.</li>
      <li><b>Choose a Layout:</b> Pick from 25+ unique layouts: grids, shapes, themed designs, and more. Each template allows for up to 10 photos, ensuring clear, vibrant results.</li>
      <li><b>Upload Your Photos:</b> Drag-and-drop or tap to upload images straight from your device. Arrange or reorder photos as you like.</li>
      <li><b>Edit Photos:</b> Apply AI-powered background removal. Use a wide range of filters, effects, and manual adjustments (brightness, contrast, saturation, etc.). Add stickers, emoji, or custom text to personalize your collage.</li>
      <li><b>Customize Design:</b> Change backgrounds, adjust borders/margins, and add creative overlays. Use undo/redo and live previews to perfect your design.</li>
      <li><b>Save & Share:</b> Download your high-resolution collage instantly. Share directly to WhatsApp, Instagram, Facebook, or other social platforms.</li>
    </ol>

    <h2 className="text-2xl font-semibold mt-8 mb-3">Feature Highlights</h2>
    <ul className="list-disc list-inside space-y-1 mb-6">
      <li><b>AI Background Removal:</b> One-tap erase for creative cutouts.</li>
      <li><b>Professional Layouts:</b> Over 25 expertly crafted templates, all mobile-friendly.</li>
      <li><b>Instant Filters & Effects:</b> Modern looks with adjustable intensity and live previews.</li>
      <li><b>Stickers, Text, & Emoji:</b> Decorate your photos with hundreds of elements.</li>
      <li><b>Secure & Private:</b> Your sessions are encrypted; your data remains private.</li>
      <li><b>Direct Social Sharing:</b> Post your creations to your favorite social networks in seconds.</li>
      <li><b>No Design Skills Needed:</b> Intuitive workflow anyone can use.</li>
    </ul>

    <h2 className="text-2xl font-semibold mt-8 mb-3">Contact Us</h2>
    <p className="mb-6">
      For support, suggestions, or feedback, please contact us:<br/>
      <b>Email:</b> <a href="mailto:hiddenpath@duck.com" className="text-purple-600 underline">hiddenpath@duck.com</a>
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-3">Additional Information</h2>
    <ul className="mb-6 space-y-1">
      <li><b>Version:</b> 1.4 &mdash; Updated July 2025</li>
      <li><b>Privacy & Terms:</b> <a href="#" className="text-purple-600 underline">Privacy Policy</a> | <a href="#" className="text-purple-600 underline">Terms of Service</a></li>
      <li><b>FAQ:</b> <a href="#" className="text-purple-600 underline">Frequently Asked Questions</a></li>
      <li><b>Accessibility:</b> Dreamy Photo Frames is designed to be accessible and usable by everyone.</li>
      <li><b>Credits:</b> Built with React, Supabase, Lucide, and other open-source technologies.</li>
      <li><b>Social Media:</b> <a href="#" className="text-purple-600 underline">Instagram</a> | <a href="#" className="text-purple-600 underline">Twitter/X</a> | <a href="#" className="text-purple-600 underline">Facebook</a></li>
      {/* <li><b>Location:</b> (Add your business address or legal entity here if desired)</li> */}
    </ul>
  </div>
);

export default About; 