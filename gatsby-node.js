// const path = require("path");
// const { createFilePath } = require("gatsby-source-filesystem");

// const getFileId = (path) => {
//   return path
//     .split("/")
//     .reverse()[0]
//     .replace(".md", "");
// };

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions;
//   if (node.internal.type === "MarkdownRemark") {
//     const slug = createFilePath({ node, getNode, basePath: "pages" });
//     createNodeField({
//       node,
//       name: "slug",
//       value: slug,
//     });
//   }
// };

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;
//   return graphql(`
//     {
//       allMarkdownRemark {
//         edges {
//           node {
//             fileAbsolutePath
//             html
//             fields {
//               slug
//             }
//             frontmatter {
//               type
//             }
//           }
//         }
//       }
//     }
//   `).then((result) => {
//     if (result.errors) throw result.errors;

//     const { edges } = result.data.allMarkdownRemark;
//     const work = edges.filter(({ node }) => node.frontmatter.type.trim() === "work");
//     const event = edges.filter(({ node }) => node.frontmatter.type.trim() === "event");

//     const simplePages = edges.filter(
//       ({ node }) => getFileId(node.fileAbsolutePath) === "imprint" || getFileId(node.fileAbsolutePath) === "privacy"
//     );

//     simplePages.forEach(({ node }) => {
//       const id = getFileId(node.fileAbsolutePath);
//       createPage({
//         path: `/${id}`,
//         component: path.resolve(`./src/templates/simplePage.jsx`),
//         context: {
//           id,
//           html: node.html,
//         },
//       });
//     });

//     work.forEach(({ node }) => {
//       createPage({
//         path: node.fields.slug,
//         component: path.resolve("./src/templates/work.jsx"),
//         context: {
//           slug: node.fields.slug,
//         },
//       });
//     });

//     event.forEach(({ node }) => {
//       createPage({
//         path: node.fields.slug,
//         component: path.resolve("./src/templates/event.jsx"),
//         context: {
//           slug: node.fields.slug,
//         },
//       });
//     });
//   });
// };
