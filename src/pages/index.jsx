import React, { Component } from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Image from "gatsby-image";
import anime from "../../node_modules/animejs/lib/anime.es.js";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: null,
      heroBrand: null,
      navBrand: null,
      navLinks: null
    };
  }

  // not sure if getting the navBrand here is a good idea...
  componentDidMount() {
    this.setState({
      hero: document.getElementById("hero"),
      navBrand: document.querySelector(".navbar-brand"),
      navLinks: document.querySelectorAll(".nav-link")
    });
  }

  handleScroll = () => {
    if (window.scrollY > 1) {
      this.state.navLinks.forEach(el => this.show(el));
    } else {
      this.state.navLinks.forEach(el => this.hide(el));
    }

    if (window.scrollY > this.state.hero.scrollHeight - 800) {
      this.scaleDown(this.state.navBrand);
    } else {
      this.scaleUp(this.state.navBrand);
    }
  };

  scaleDown = el => {
    if (el.classList.contains("scale-up") || !el.classList.contains("scale-down")) {
      el.classList.remove("scale-up");
      el.classList.add("scale-down");
    }
  };

  scaleUp = el => {
    if (el.classList.contains("scale-down")) {
      el.classList.remove("scale-down");
      el.classList.add("scale-up");
    }
  };

  // now useless..
  hide = el => {
    if (el.classList.contains("show") || !el.classList.contains("hide")) {
      el.classList.remove("show");
      el.classList.add("hide");
    }
  };

  show = el => {
    if (el.classList.contains("hide")) {
      el.classList.remove("hide");
      el.classList.add("show");
    }
  };

  render() {
    const { work, pictures } = this.props.data;

    return (
      <>
        <SEO />
        <Layout handleScroll={this.handleScroll} hideNav={true} scaleUp={true}>
          <section id="hero" />
          <section id="work" className="container container-sm">
            {work.edges.map(({ node }) => {
              const workRegex = new RegExp(node.frontmatter.id, "i");
              let [picture] = pictures.edges.filter(
                ({ node }) => node.base.match(workRegex) && node.base.match(/cover/i)
              );
              if (!picture) [picture] = pictures.edges.filter(({ node }) => node.base.match(workRegex));

              return (
                <div className="work" key={node.id}>
                  <Link to={node.fields.slug}>
                    {typeof picture !== "undefined" && (
                      <Image
                        fluid={picture.node.childImageSharp.fluid}
                        alt={node.frontmatter.title + " picture"}
                        style={{ width: "100%", height: "50vmin", marginBottom: "2rem" }}
                      />
                    )}
                  </Link>

                  <h2 className="work-title">
                    <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                    <small className="work-date"> &middot; {node.frontmatter.date}</small>
                  </h2>

                  <p className="work-description">{node.frontmatter.description}</p>
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
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            id
            title
            date(formatString: "MMM YYYY")
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
