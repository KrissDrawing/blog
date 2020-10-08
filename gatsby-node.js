const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/layouts/blogPost.js`);
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  let result;
  try {
    result = await graphql(
      `
        query queryCMSPage {
          allDatoCmsArticle {
            nodes {
              slug
            }
          }
        }
      `,
      { limit: 1000 }
    );
  } catch (error) {
    throw errors;
  }

  // Create blog post pages.
  result.data.allDatoCmsArticle.nodes.forEach(post => {
    createPage({
      // Path for this page — required
      path: `/articles/${post.slug}`,
      component: blogPostTemplate,
      context: {
        slug: post.slug,
      },
    });
  });
};
