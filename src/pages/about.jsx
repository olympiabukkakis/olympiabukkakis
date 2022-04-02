import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Tooltip } from 'reactstrap';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Back from '../components/Back';
import BtnCopy from '../components/BtnCopy';
import { isNavbarBrandUp } from '../helpers/es6';

function About({ data }) {
  const { about, aboutPicture } = data;

  return (
    <>
      <SEO />
      <Layout themeLight={true} scaleUp={isNavbarBrandUp()}>
        <Back />
        <section id='about' className='container container-sm'>
          <div className='row'>
            <div className='col-pic col-md-6'>
              {/* <GatsbyImage image={aboutPicture.childImageSharp.gatsbyImageData} alt="Olympia Bukkakis' portrait" className='portrait' /> */}
              <small>Photography: {about.frontmatter.photographer}</small>
              <p className='contact'>
                Contact: <br />
                <BtnCopy copyItem='info@olympiabukkakis.com'>
                  <span>info</span>
                  <span className='text-nowrap'>&#64;olympiabukkakis</span>
                  <span>.com</span>
                </BtnCopy>
              </p>
            </div>
            <div className='col-text col-md-6'>
              <div className='' dangerouslySetInnerHTML={{ __html: about.html }} />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default About;

export const query = graphql`
  query {
    about: markdownRemark(frontmatter: { type: { eq: "about" } }) {
      id
      html
      frontmatter {
        photographer
      }
    }
  }
`;
