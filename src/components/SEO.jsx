import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogUrl,
  twitterTitle,
  twitterDescription
}) {
  const defaultTitle = "Nexnam — Website, App & Digital Solutions Startup";
  const defaultDesc = "Nexnam builds modern websites, apps, landing pages and digital solutions for startups, creators and businesses.";
  const defaultKeywords = "Nexnam, website development, app development, landing page design, tech startup, digital solutions";

  const siteTitle = title || defaultTitle;
  const siteDesc = description || defaultDesc;
  const siteKeywords = keywords || defaultKeywords;
  
  // Resolve canonical URL
  const currentPath = window.location.pathname === "/" ? "" : window.location.pathname;
  const resolvedCanonical = canonicalUrl || `https://www.nexnam.in${currentPath}`;

  // Check if we shouldn't index admin routes (extra precaution)
  const isNoIndex = window.location.pathname.startsWith("/admin-nexnam-panel");

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />
      <meta name="keywords" content={siteKeywords} />
      
      {isNoIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={resolvedCanonical} />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || siteTitle} />
      <meta property="og:description" content={ogDescription || siteDesc} />
      {!isNoIndex && <meta property="og:url" content={ogUrl || resolvedCanonical} />}
      <meta property="og:site_name" content="Nexnam" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle || siteTitle} />
      <meta name="twitter:description" content={twitterDescription || siteDesc} />
    </Helmet>
  );
}
