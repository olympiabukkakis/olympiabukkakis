import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import Back from "../components/Back";
import SEO from "../components/SEO";

function Events({ data }) {
  const { events, pictures } = data;

  return (
    <>
      <SEO title="Events" />
      <Layout>
        <Back />
        <section id="events" className="container container-sm">
          {events.edges.map(({ node }) => {
            const eventRegex = new RegExp(node.frontmatter.id, "i");
            const [picture] = pictures.edges.filter(({ node }) => node.base.match(eventRegex));

            // try-out
            const dateArr = node.frontmatter.date.split(" ");
            const day = dateArr[0];
            const month = dateArr[1].toUpperCase();

            return (
              <article className="event" key={node.id}>
                <Link to={node.fields.slug}>
                  <GatsbyImage
                    image={picture.node.childImageSharp.gatsbyImageData}
                    alt={node.frontmatter.title + " event poster"}
                    style={{ width: "100%", height: "33vmin", marginBottom: "1.5rem" }}
                  />
                </Link>

                <Link to={node.fields.slug}>
                  <h2 className="event-title">{node.frontmatter.title}</h2>
                </Link>
                <h2 className="event-details">
                  <small>
                    {node.frontmatter.date} {node.frontmatter.time && <span>&middot; {node.frontmatter.time} </span>}{" "}
                    &middot; {node.frontmatter.venue}
                  </small>
                </h2>
                <p className="event-description">{node.frontmatter.description}</p>
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
    events: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "event" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            id
            title
            date(formatString: "DD MMM")
            time
            venue
            description
            link
          }
          fields {
            slug
          }
        }
      }
    }
    pictures: allFile(
      filter: { sourceInstanceName: { eq: "images" }, base: { regex: "/cover/" } }
      sort: { fields: [name], order: ASC }
    ) {
      edges {
        node {
          id
          base
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, height: 500) 
          }
        }
      }
    }
  }
`;

export default Events;
