import { graphql, Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { DiscussionEmbed } from "disqus-react";
import ArticleBanner from "../components/ArticleBanner/ArticleBanner";
import Category from "../components/Category/Category";
import Navigation from "../components/Navigation/Navigation";
import { CategoryDate } from "./elements";
import Layout from "./Layout";

export const query = graphql`
  query querySingleArticle($slug: String!, $nextPostSlug: String) {
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
    next: datoCmsArticle(slug: { eq: $nextPostSlug }) {
      title
      date
      category
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

const blogPost = ({ data, pageContext }) => {
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
            Streszczenie
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
          {pageContext.nextPostSlug === null ? null : (
            <ArticleBanner
              item={{ ...data.next, slug: pageContext.nextPostSlug }}
            />
          )}
        </div>
        <DiscussionEmbed
          shortname="krissdrawing"
          config={{
            url: `${process.env.PAGE_URL}/articles/${pageContext.slug}`,
            identifier: pageContext.slug,
            title: data.datoCmsArticle.title,
          }}
        />
      </Wrapper>
    </Layout>
  );
};

export default blogPost;
