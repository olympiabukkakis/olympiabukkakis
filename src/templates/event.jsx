import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Back from "../components/Back";
import EventLink from "../components/EventLink";

export default function Event({ data }) {
  const { picture, title, dateTime, venue, link, longDescription, artwork } = data.event

  return (
    <>
      <SEO title={title} />
      <Layout>
        <Back />
        <article className="event container container-sm">
          <div className="row no-gutters">
            <div className="col-pic col-lg-6">
              <div className="event-artwork">
                <GatsbyImage
                  image={getImage(picture.gatsbyImageData)}
                  alt={title + " artwork"}
                  className="artwork-wrapper"
                  imgStyle={{ height: "auto" }}
                />
              </div>
              {artwork && (
                <div className="event-credits">
                  <small>Artwork: {artwork}</small>
                </div>
              )}
              <EventLink link={link} />
            </div>
            <div className="col-text col-lg-6">
              <div className="event-header row align-items-start">
                <div className="">
                  <h1>{title}</h1>
                  <h3 className="muted font-weight-normal">
                    {dateTime} &middot; {venue}
                  </h3>
                </div>
              </div>
              <div className="event-text" dangerouslySetInnerHTML={{ __html: longDescription.childMarkdownRemark.html }} />
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
};

export const query = graphql`
  query($id: String!) {
    event: contentfulEvent(fields: {id: {eq: $id}}) {
      title
      dateTime(formatString: "DD MMM")
      venue
      link
      longDescription {
        childMarkdownRemark {
          html
        }
      }
      picture {
        gatsbyImageData(layout: CONSTRAINED)
      }
      artwork
    }
  }
`;
