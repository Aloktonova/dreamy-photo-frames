import React from 'react';
import { Helmet } from 'react-helmet-async';

const SeoHead: React.FC = () => (
  <Helmet>
    <title>Dreamy Frames – Turn your ideas into AI-generated dream images.</title>
    <meta name="description" content="Dreamy Frames is the easiest way to turn your ideas into beautiful, AI-generated dream images and collages. No design skills required. Try it free!" />
    <meta name="keywords" content="AI photo editor, collage maker, dream images, photo frames, online editor, creative, design, generator, dreamy frames" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    <meta name="theme-color" content="#7c3aed" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Dreamy Frames" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Dreamy Frames – Turn your ideas into AI-generated dream images." />
    <meta property="og:description" content="Dreamy Frames is the easiest way to turn your ideas into beautiful, AI-generated dream images and collages. No design skills required. Try it free!" />
    <meta property="og:url" content="https://dreamyframes.com/" />
    <meta property="og:site_name" content="Dreamy Frames" />
    <meta property="og:image" content="https://dreamyframes.com/og-image.jpg" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Dreamy Frames – Turn your ideas into AI-generated dream images." />
    <meta name="twitter:description" content="Dreamy Frames is the easiest way to turn your ideas into beautiful, AI-generated dream images and collages. No design skills required. Try it free!" />
    <meta name="twitter:image" content="https://dreamyframes.com/og-image.jpg" />
    <meta name="twitter:site" content="@dreamyframes" />
    <meta name="twitter:creator" content="@dreamyframes" />

    {/* Favicon */}
    <link rel="icon" href="/favicon.ico" />
  </Helmet>
);

export default SeoHead; 