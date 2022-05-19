import NextHead from 'next/head';
import { FC } from 'react';

interface HeadProps {
  title: string;
  description: string;
  ogUrl: string;
  ogImage: string;
}

const Head: FC<HeadProps> = ({
  title = 'Next App Template',
  description,
  ogUrl = '',
  ogImage = '',
}) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/* <link rel="icon" sizes="192x192" href="/touch-icon.png" /> */}
    {/* <link rel="apple-touch-icon" href="/touch-icon.png" /> */}
    {/* <link rel="mask-icon" href="/favicon-mask.svg" color="#000000" /> */}
    <meta property="og:url" content={ogUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="twitter:site" content={ogUrl} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);

export default Head;
