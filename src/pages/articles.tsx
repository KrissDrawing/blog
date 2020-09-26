import { graphql, Link } from "gatsby";
import React from "react";
import Navigation from "../components/Navigation/Navigation";

interface Props {
  data: any;
}

const Articles = ({ data }: Props) => {
  return (
    <div>
      <Navigation />
      {data.allDatoCmsArticle.nodes.map(item => (
        <Link to={`/articles/${item.slug}`} key={item.slug}>
          <h2>{item.title}</h2>
          <img src={item.featuredimage.url} />
        </Link>
      ))}
    </div>
  );
};

export const query = graphql`
  query MyQuery {
    allDatoCmsArticle {
      nodes {
        title
        slug
        featuredimage {
          url
        }
      }
    }
  }
`;

export default Articles;
