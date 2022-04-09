import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Back from "../components/Back";
import { GatsbyImage } from "gatsby-plugin-image";
import SEO from "../components/SEO";

export default function Work({ data }) {
  const { title, startDate, endDate, longDescription, video, photographer, pictures } = data.work;

  return (
    <>
      <SEO title={title} />
      <Layout>
        <Back />
        <article className="work container container-sm">
          <div className="work-header">
            <h1>{title}</h1>
            <h3 className="muted font-weight-normal">
              {startDate}
              {endDate !== "" && <span> &ndash; {endDate}</span>}
            </h3>
          </div>
          <div className="work-text" dangerouslySetInnerHTML={{ __html: longDescription.childMarkdownRemark.html }} />

          <div className="work-gallery">
            {video !== "" && (
              <div className="work-video">
                <iframe
                  src={video}
                  title={title + " trailer"}
                  width="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            )}
            {/* {workPictures.map(({ node }) => (
              <GatsbyImage
                key={node.id}
                image={node.childImageSharp.gatsbyImageData}
                title={title + " photograph"}
                alt={title + " photograph"}
                style={{ width: "100%", marginBottom: "0.75rem", display: "inline-block" }}
                imgStyle={{ height: "auto" }}
              />
            ))} */}
          </div>
          {photographer && (
            <div className="work-credits">
              <small>Photography: {photographer}</small>
            </div>
          )}
        </article>
      </Layout>
    </>
  );
};

export const query = graphql`
  query($id: String!) {
    work: contentfulWork(fields: {id: {eq: $id}}) {
      title
      startDate(formatString: "MMMM YYYY")
      endDate(formatString: "MMMM YYYY")
      longDescription {
        childMarkdownRemark {
          html
        }
      }
      video
      photographer
      pictures {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
  }
`;
