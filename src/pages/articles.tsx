import { graphql, Link } from "gatsby";
import React from "react";
import Navigation from "../components/Navigation/Navigation";
import styled from "styled-components";

const FeaturedImage = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  width: 30vw;
  object-fit: cover;
`;
interface Props {
  data: any;
}

const Articles = ({ data }: Props) => {
  return (
    <div>
      <Navigation />
      {data.allDatoCmsArticle.nodes.map(item => (
        <>
          <Link to={`/articles/${item.slug}`} key={item.slug}>
            <h2>{item.title}</h2>
          </Link>
          <FeaturedImage src={item.featuredimage.url} />
        </>
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
