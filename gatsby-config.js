const path = require('path');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const primary = '#f9f9f9';
const background = '#080808';
const author = 'Olympia Bukkakis';
const siteUrl = 'https://olympiabukkakis.com';
const noindex = [
  '/imprint/',
  '/imprint',
  '/privacy/',
  '/privacy',
  '/404',
  '/404/',
  '/offline-plugin-app-shell-fallback/',
];
const lang = 'en';

module.exports = {
  siteMetadata: {
    title: author,
    shortTitle: author,
    titleTemplate: `%s · ${author}`,
    description: "Olympia Bukkakis' static portfolio website",
    siteUrl,
    author: 'Vincent Reynaud <mail@vincentreynaud.de>',
    navigation: ['work', 'events'],
    image: '/favicon.png', // image placed in the static folder
    location: { region: 'DE-BE', placename: 'Berlin' },
    country: 'de',
    lang,
    license: 'MIT',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src`,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        placeholder: `dominantColor`,
        quality: 75,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 900,
              quality: 75,
              withWebp: false,
              linkImagesToOriginal: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: author,
        short_name: author,
        start_url: '/',
        background_color: background,
        theme_color: primary,
        display: 'minimal-ui',
        icon: 'static/icon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
  ],
};
