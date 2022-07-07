const path = require('path');
const { simpleFormatString } = require('./src/helpers/common');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
        type ContentfulWork implements Node {
            endDate: Date
        }
    `;
  createTypes(typeDefs);
};

const getNodeType = (string) => {
  return string.toLowerCase().replace('contentful', '');
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'ContentfulWork' || node.internal.type === 'ContentfulEvent') {
    createNodeField({
      node,
      name: 'id',
      value: simpleFormatString(node.title),
    });
    // createNodeField({
    //   node,
    //   name: 'type',
    //   value: getNodeType(node.internal.type),
    // });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      works: allContentfulWork {
        edges {
          node {
            fields {
              id
            }
          }
        }
      }
      events: allContentfulEvent {
        edges {
          node {
            fields {
              id
            }
          }
        }
      }
      imprint: contentfulImprint {
        internal {
          type
        }
        content {
          childMarkdownRemark {
            html
          }
        }
      }
      privacy: contentfulPrivacy {
        internal {
          type
        }
        text {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) throw result.errors;

    const { works, events, imprint, privacy } = result.data;

    works.edges.forEach(({ node }) => {
      createPage({
        path: `works/${node.fields.id}`,
        component: path.resolve('./src/templates/work.jsx'),
        context: {
          id: node.fields.id,
        },
      });
    });

    events.edges.forEach(({ node }) => {
      createPage({
        path: `events/${node.fields.id}`,
        component: path.resolve('./src/templates/event.jsx'),
        context: {
          id: node.fields.id,
        },
      });
    });

    createPage({
      path: `/${getNodeType(imprint.internal.type)}`,
      component: path.resolve(`./src/templates/simplePage.jsx`),
      context: {
        id: getNodeType(imprint.internal.type),
        html: imprint.content.childMarkdownRemark.html,
      },
    });

    createPage({
      path: `/${getNodeType(privacy.internal.type)}`,
      component: path.resolve(`./src/templates/simplePage.jsx`),
      context: {
        id: getNodeType(privacy.internal.type),
        html: privacy.text.childMarkdownRemark.html,
      },
    });
  });
};
