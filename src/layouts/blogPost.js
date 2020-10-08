import { graphql } from "gatsby";
import React from "react";
import styled from "styled-components";
import Category from "../components/Category/Category";
import Navigation from "../components/Navigation/Navigation";
import { CategoryDate } from "./elements";
import Layout from "./Layout";

export const query = graphql`
  query querySingleArticle($slug: String!) {
    datoCmsArticle(slug: { eq: $slug }) {
      title
      author
      date
      category
      abstract
      featuredimage {
        url
      }
      articleContent {
        ... on DatoCmsHeading {
          headingContent
          id
        }
        ... on DatoCmsParagraph {
          paragraphContent
          id
        }
        ... on DatoCmsImage {
          imageContent {
            url
          }
          id
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  margin-top: 100px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  & > div {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 720px) {
    & > div {
      width: 60%;
    }
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  max-height: 70vh;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.3);
`;

const Abstract = styled.p`
  border: 2px solid white;
  padding: 10px;
`;

const blogPost = ({ data }) => {
  return (
    <Layout>
      <Navigation />
      <Wrapper>
        <div>
          <FeaturedImage src={data.datoCmsArticle.featuredimage.url} />
          <h3>{data.datoCmsArticle.title}</h3>
          <CategoryDate large>
            <p>{data.datoCmsArticle.date}</p>
            <Category category={data.datoCmsArticle.category} />
          </CategoryDate>

          <Abstract>
            <p>Streszczenie</p>
            {data.datoCmsArticle.abstract}
          </Abstract>
          <div>
            {data.datoCmsArticle.articleContent.map(item => {
              const itemKey = Object.keys(item)[1];

              switch (itemKey) {
                case "paragraphContent":
                  return <p key={item.id}>{item[itemKey]}</p>;
                case "headingContent":
                  return <h3 key={item.id}>{item[itemKey]}</h3>;
                case "imageContent":
                  return <img key={item.id} src={item[itemKey].url} />;
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default blogPost;
