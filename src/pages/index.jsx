import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { isBrowser, isNavbarBrandUp } from '../helpers/esm';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: null,
      heroBrand: null,
      navBrand: null,
      navLinks: null,
    };
  }


  // not sure if getting the navBrand here is a good idea...
  componentDidMount() {
    const hero = document.getElementById('hero');
    const navBrand = document.querySelector('.navbar-brand');
    const navLinks = document.querySelectorAll('.nav-link');

    if (this.isNavbarBrandScaledDown(hero)) {
      localStorage.setItem('navbarBrand_mode', 'down');
    } else {
      localStorage.setItem('navbarBrand_mode', 'up');
    }

    this.setState({
      hero,
      navBrand,
      navLinks,
    });
  }

  isNavbarBrandScaledDown = (hero) => {
    if (isBrowser()) {
      return window.scrollY > hero.scrollHeight - 800;
    }
    return false
  };

  handleScroll = () => {
    if (isBrowser()) {
      if (window.scrollY > 1) {
        this.state.navLinks.forEach((el) => this.show(el));
      } else {
        this.state.navLinks.forEach((el) => this.hide(el));
      }
    }
    if (this.isNavbarBrandScaledDown(this.state.hero)) {
      this.scaleDown(this.state.navBrand);
    } else {
      this.scaleUp(this.state.navBrand);
    }
  };

  scaleDown = (el) => {
    if (el.classList.contains('scale-up') || !el.classList.contains('scale-down')) {
      el.classList.remove('scale-up');
      el.classList.add('scale-down');
      localStorage.setItem('navbarBrand_mode', 'down');
    }
  };

  scaleUp = (el) => {
    if (el.classList.contains('scale-down') || !el.classList.contains('scale-up')) {
      el.classList.remove('scale-down');
      el.classList.add('scale-up');
      localStorage.setItem('navbarBrand_mode', 'up');
    }
  };

  hide = (el) => {
    if (el.classList.contains('show') || !el.classList.contains('hide')) {
      el.classList.remove('show');
      el.classList.add('hide');
    }
  };

  show = (el) => {
    if (el.classList.contains('hide')) {
      el.classList.remove('hide');
      el.classList.add('show');
    }
  };

  render() {
    const { works } = this.props.data;

    return (
      <>
        <SEO />
        <Layout
          handleScroll={this.handleScroll}
          hideNav={true}
          scaleUp={isNavbarBrandUp(this.props.location?.action !== 'PUSH')}
        >
          <section id='hero' />
          <section id='work' className='container container-sm'>
            {works.edges.map(({ node }) => {
              const { title, startDate, endDate, shortDescription, pictures } = node
              const [picture] = pictures
              const workPath = `works/${node.fields.id}`

              return (
                <div className='work' key={node.id}>
                  <Link to={workPath}>
                    {typeof picture !== 'undefined' && (
                      <GatsbyImage
                        image={getImage(picture.gatsbyImageData)}
                        alt={title}
                        style={{ width: '100%', height: '50vmin', marginBottom: '2rem' }}
                      />
                    )}
                  </Link>

                  <h2 className='work-title'>
                    <Link to={workPath}>{title}</Link>
                    <small className='work-date'>
                      {' '}
                      &middot; {startDate}
                      {endDate && <span> &ndash; {endDate}</span>}
                    </small>
                  </h2>

                  <div className='work-description' dangerouslySetInnerHTML={{ __html: shortDescription.childMarkdownRemark.html }}></div>
                </div>
              );
            })}
          </section>
        </Layout>
      </>
    );
  }
}

export const query = graphql`
  query {
    works: allContentfulWork(sort: {fields: startDate, order: DESC}) {
      edges {
        node {
          title
          startDate(formatString: "MMMM YYYY")
          endDate
          shortDescription {
            childMarkdownRemark {
              html
            }
          }
          pictures {
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

export default Index;

// this.scaleDown();
// anime({
//   targets: ".navbar-brand",
//   scale: {
//     value: 0.25,
//     duration: 200,
//     easing: "easeOutQuart"
//   }
// });

// this.scaleUp(this.state.heroBrand);
// anime({
//   targets: ".navbar-brand",
//   scale: {
//     value: 1,
//     duration: 200,
//     easing: "easeOutQuart"
//   }
// });
