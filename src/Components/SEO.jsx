import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  image = 'https://res.cloudinary.com/dncosrakg/image/upload/v1739989872/uag9e6plq4hm1v1ajl4p.png',
  url,
  type = 'website',
}) => {
  const siteTitle = 'Arjun Divraniya';
  const siteUrl = 'https://arjundivraniya.in';
  const fullTitle = title
    ? `${title} | ${siteTitle}`
    : `${siteTitle} | Full Stack Developer`;

  const defaultDescription =
    'Portfolio of Arjun Divraniya - Full Stack Developer, Competitive Programmer, and Tech Enthusiast. Building meaningful web applications with modern technologies.';

  const currentUrl =
    url ||
    (typeof window !== 'undefined'
      ? `${siteUrl}${window.location.pathname}`
      : siteUrl);

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Arjun Divraniya" />
      <meta name="robots" content="index,follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default SEO;