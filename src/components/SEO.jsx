import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

/* Tips
 * description: keep bellow 158 chars, most important information in the first 120 chars
 * https://seosherpa.com/meta-descriptions/
 *
 */


const SEO = ({ title, tagline, description, lang, location = {}, country, image, robots = null }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);

  const {
    defaultTitle,
    shortTitle,
    defaultTitleTemplate,
    defaultDescription,
    siteUrl,
    author,
    defaultLocation,
    defaultLang = 'en',
    defaultCountry = 'de',
    defaultImage,
  } = site.siteMetadata;
  const { region, placename } = location;
  const { defaultRegion = 'DE-BE', defaultPlacename = 'Berlin' } = defaultLocation;

  const seo = {
    title: title || defaultTitle,
    titleTemplate: tagline ? `%s · ${author} · ${tagline}` : defaultTitleTemplate,
    ogTitle: `${title ? `${title} ` : ''}${shortTitle}`,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
    region: region || defaultRegion,
    lang: lang || defaultLang,
    placename: placename || defaultPlacename,
    country: country || defaultCountry,
    author,
    robots: robots || 'index, follow',
  };

  return (
    <Helmet titleTemplate={title && seo.titleTemplate}>
      <html lang={seo.lang} />
      <title itemProp='name' lang={seo.lang}>
        {seo.title}
      </title>
      <link rel='canonical' href={seo.url} />
      <meta name='title' content={seo.title} />
      <meta name='description' content={seo.description} />
      <meta http-equiv='content-language' content={`${seo.lang}-${seo.country}`} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={seo.ogTitle} />
      <meta property='og:description' content={seo.description} />
      <meta property='og:url' content={seo.url} />
      {seo.image ? <meta property='og:image' content={seo.image} /> : null}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={seo.url} />
      <meta property='twitter:title' content={seo.ogTitle} />
      <meta property='twitter:description' content={seo.description} />
      <meta property='twitter:image' content={seo.image} />
      <meta name='geo.region' content={seo.region} />
      <meta name='geo.placename' content={seo.placename} />
      <meta name='author' content={seo.author} />
      <meta name='theme-color' content='primary-color' />
      <meta name='color-scheme' content='dark light' />
      {robots ? <meta name='robots' content={seo.robots} /> : null}
    </Helmet>
  );
};

export default SEO;

const query = graphql`
  query {
    site {
      siteMetadata {
        defaultTitle: title
        shortTitle
        defaultTitleTemplate: titleTemplate
        siteUrl
        author
        defaultDescription: description
        defaultImage: image
        defaultCountry: country
        defaultLang: lang
        defaultLocation: location {
          defaultRegion: region
          defaultPlacename: placename
        }
      }
    }
  }
`;
