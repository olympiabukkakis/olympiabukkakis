import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Back from "../components/Back";
import EventLink from "../components/EventLink";

export default function Event({ data }) {
  const { event, pictures } = data;
  const eventRegex = new RegExp(event.frontmatter.id, "i");
  const coverRegex = new RegExp("cover", "i");
  // const eventPictures = pictures.edges.filter(
  //   ({ node }) => node.base.match(eventRegex) && !node.base.match(coverRegex)
  // );

  return (
    <>
      <SEO title={event.frontmatter.title} />
      <Layout>
        <Back />
        <article className="event container container-sm">
          <div className="row no-gutters">
            <div className="col-pic col-lg-6">
              {/* <div className="event-artwork">
                {eventPictures.map(({ node }) => (
                  <GatsbyImage
                    key={node.id}
                    image={node.childImageSharp.gatsbyImageData}
                    alt={event.frontmatter.title + " artwork"}
                    className="artwork-wrapper"
                    imgStyle={{ height: "auto" }}
                  />
                ))}
              </div> */}
              {event.frontmatter.artwork && (
                <div className="event-credits">
                  <small>Artwork: {event.frontmatter.artwork}</small>
                </div>
              )}
              <EventLink link={event.frontmatter.link} />
            </div>
            <div className="col-text col-lg-6">
              <div className="event-header row align-items-start">
                <div className="">
                  <h1>{event.frontmatter.title}</h1>
                  <h3 className="muted font-weight-normal">
                    {event.frontmatter.date} {event.frontmatter.time && <span>&middot; {event.frontmatter.time} </span>}
                    &middot; {event.frontmatter.venue}
                  </h3>
                </div>
              </div>
              <div className="event-text" dangerouslySetInnerHTML={{ __html: event.html }} />
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    event: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        id
        title
        date(formatString: "DD MMM")
        time
        venue
        description
        link
        artwork
      }
    }
  }
`;
