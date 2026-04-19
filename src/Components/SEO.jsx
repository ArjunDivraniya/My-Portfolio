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
    : `${siteTitle} | Cloud-Native Full Stack Engineer`;

  const defaultDescription =
    'Portfolio of Arjun Divraniya, a cloud-native full stack engineer building resilient MERN applications, scalable systems, and DevOps-driven digital products.';

  const defaultKeywords =
    'Arjun Divraniya, Full Stack Developer, Cloud Native, DevOps, MERN Stack, AWS, Docker, Portfolio, Software Engineer';

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
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="Arjun Divraniya" />
      <meta name="robots" content="index,follow" />
      <meta name="theme-color" content="#0f172a" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

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