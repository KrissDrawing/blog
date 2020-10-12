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

  const blogPosts = result.data.allDatoCmsArticle.nodes;
  blogPosts.forEach((post, i) => {
    createPage({
      path: `/articles/${post.slug}`,
      component: blogPostTemplate,
      context: {
        slug: post.slug,
        nextPostSlug: blogPosts.length === i + 1 ? null : blogPosts[i + 1].slug,
      },
    });
  });

  const posts = result.data.allDatoCmsArticle.nodes;
  const postsPerPage = 3;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/articles` : `/articles/${i + 1}`,
      component: path.resolve(`src/layouts/articles.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};
