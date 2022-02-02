import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Image from 'gatsby-image';
import anime from '../../node_modules/animejs/lib/anime.es.js';
import { isNavbarBrandUp } from '../helpers/es6';

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

    // if (window.scrollY < 50 && window.location.pathname == '/') {
    //   console.log('trigger scale up when on landing');
    //   this.scaleUp(navBrand);
    // }

    if (this.isNavbarBrandScaledDown(hero)) {
      localStorage.setItem('navbarBrand_mode', 'down');
      // this.scaleDown(navBrand);
    } else {
      localStorage.setItem('navbarBrand_mode', 'up');
      // this.scaleUp(navBrand);
    }

    this.setState({
      hero,
      navBrand,
      navLinks,
    });
  }

  isNavbarBrandScaledDown = (hero) => {
    return window.scrollY > hero.scrollHeight - 800;
  };

  handleScroll = () => {
    if (window.scrollY > 1) {
      this.state.navLinks.forEach((el) => this.show(el));
    } else {
      this.state.navLinks.forEach((el) => this.hide(el));
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
    const { work, pictures } = this.props.data;

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
            {work.edges.map(({ node }) => {
              const workRegex = new RegExp(node.frontmatter.id, 'i');
              let [picture] = pictures.edges.filter(
                ({ node }) => node.base.match(workRegex) && node.base.match(/cover/i)
              );
              if (!picture) [picture] = pictures.edges.filter(({ node }) => node.base.match(workRegex));

              return (
                <div className='work' key={node.id}>
                  <Link to={node.fields.slug}>
                    {typeof picture !== 'undefined' && (
                      <Image
                        fluid={picture.node.childImageSharp.fluid}
                        alt={node.frontmatter.title + ' picture'}
                        style={{ width: '100%', height: '50vmin', marginBottom: '2rem' }}
                      />
                    )}
                  </Link>

                  <h2 className='work-title'>
                    <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                    <small className='work-date'>
                      {' '}
                      &middot; {node.frontmatter.startDate}
                      {node.frontmatter.endDate !== '' && <span> &ndash; {node.frontmatter.endDate}</span>}
                    </small>
                  </h2>

                  <p className='work-description'>{node.frontmatter.description}</p>
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
    work: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "work" } } }
      sort: { fields: [frontmatter___startDate], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            id
            title
            startDate(formatString: "MMM YYYY")
            endDate
            description
          }
          fields {
            slug
          }
        }
      }
    }
    pictures: allFile(filter: { sourceInstanceName: { eq: "images" } }, sort: { fields: [name], order: ASC }) {
      edges {
        node {
          id
          base
          childImageSharp {
            fluid(maxHeight: 990) {
              ...GatsbyImageSharpFluid_noBase64
            }
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
