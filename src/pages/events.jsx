import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import Back from "../components/Back";
import SEO from "../components/SEO";

function Events({ data }) {
  return (
    <>
      <SEO title="Events" />
      <Layout>
        <Back />
        <section id="events" className="container container-sm">
          {data.events.edges.map(({ node }, i) => {
            const { picture, title, dateTime, venue, shortDescription } = node

            // try-out
            // const dateArr = date.split(" ");
            // const day = dateArr[0];
            // const month = dateArr[1].toUpperCase();

            return (
              <article className="event" key={i}>
                <Link to={node.fields.id}>
                  <GatsbyImage
                    image={getImage(picture.gatsbyImageData)}
                    alt={title + " event poster"}
                    style={{ width: "100%", height: "33vmin", marginBottom: "1.5rem" }}
                  />
                </Link>

                <Link to={node.fields.id}>
                  <h2 className="event-title">{title}</h2>
                </Link>
                <h2 className="event-details">
                  <small>
                    {dateTime} &middot; {venue}
                  </small>
                </h2>
                <p className="event-description"
                  dangerouslySetInnerHTML={{ __html: shortDescription.childMarkdownRemark.html }}
                ></p>
              </article>
            );
          })}
        </section>
      </Layout>
    </>
  );
}

export const query = graphql`
  query {
    events: allContentfulEvent(sort: {fields: dateTime, order: DESC}) {
      edges {
        node {
          title
          dateTime(formatString: "DD MMM")
          venue
          shortDescription {
            childMarkdownRemark {
              html
            }
          }
          picture: pictureCover {
            gatsbyImageData(layout: CONSTRAINED)
          }
          fields {
            id
          }
        }
      }
    }
  }
`;

export default Events;
