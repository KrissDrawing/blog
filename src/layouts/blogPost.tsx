import { graphql } from "gatsby";
import React from "react";

export const query = graphql`
  query querySingleArticle($slug: String!) {
    datoCmsArticle(slug: { eq: $slug }) {
      title
      author
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

interface Props {
  data: any;
}

const blogPost = ({ data }: Props) => {
  return (
    <div>
      <h1>{data.datoCmsArticle.title}</h1>
      <p>{data.datoCmsArticle.author}</p>
      <img src={data.datoCmsArticle.featuredimage.url} />
      <div>
        {data.datoCmsArticle.articleContent.map(item => {
          const itemKey = Object.keys(item)[1];

          switch (itemKey) {
            case "paragraphContent":
              return <p key={item.id}>{item[itemKey]}</p>;
              break;
            case "headingContent":
              return <h3 key={item.id}>{item[itemKey]}</h3>;
              break;
            case "imageContent":
              return <img key={item.id} src={item[itemKey].url} />;
              break;

            default:
              return null;
              break;
          }
        })}
      </div>
    </div>
  );
};

export default blogPost;
