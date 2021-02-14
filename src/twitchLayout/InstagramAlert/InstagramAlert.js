import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { gql, useQuery, useSubscription } from "@apollo/client";
import gsap from "gsap";
import { SiInstagram } from "react-icons/si";

export const INSTAGRAM_URL = gql`
  {
    instagramPhoto
  }
`;
export const INSTAGRAM_MASK = graphql`
  {
    mask: file(name: { eq: "instagramMask" }) {
      publicURL
    }
  }
`;

const INSTAGRAM_ALERT_SUBSCRIPTION = gql`
  subscription {
    subscribeAlert(topic: "instagramAlert")
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 30%;
  right: 0;
  display: flex;
  align-items: center;
  width: 330px;
  height: 330px;
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(15px, 15px);
  width: 300px;
  height: 300px;
  mask: url(${({ mask }) => mask}) 0 0/300px 300px;
`;

const ImgBackEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 330px;
  height: 330px;
  mask: url(${({ mask }) => mask}) 5px 10px/320px 320px;
  background-color: black;
  z-index: -1;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  bottom: 20px;
  left: 50%;
  font-size: 50px;
  text-shadow: 2px 2px 5px black;
  h3 {
    margin: 0 15px;
  }
`;

const InstagramAlert = () => {
  const instaPhotoRef = useRef(null);
  const timeline = useRef(null);
  const { data: alertTrigger } = useSubscription(INSTAGRAM_ALERT_SUBSCRIPTION);

  const { loading, error, data } = useQuery(INSTAGRAM_URL);
  const instagramMask = useStaticQuery(INSTAGRAM_MASK);

  useEffect(() => {
    const instaPhoto = instaPhotoRef.current.children;

    timeline.current = gsap
      .timeline()
      .fromTo(
        instaPhoto,
        {
          x: "+=400",
        },
        {
          x: "-=400",
          stagger: { each: 0.1, from: "random" },
        }
      )
      .to(instaPhoto, { duration: 10 })
      .to(instaPhoto, {
        x: "+=400",
        stagger: { each: 0.1, from: "random" },
      });

    return () => timeline.current.kill();
  }, []);

  useEffect(() => {
    timeline.current.restart(true);
  }, [alertTrigger]);
  return (
    <>
      <Wrapper ref={instaPhotoRef}>
        <Img
          mask={instagramMask.mask.publicURL}
          src={
            !loading
              ? data.instagramPhoto
              : "https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/144746383_1007370053122836_7157578032433989886_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=G17L_hN-c7EAX-w7dhC&tp=1&oh=1ad71cc7f0d6ebd021fefe9f6f86587d&oe=60421E1E"
          }
        />
        <UserName>
          <SiInstagram />
          <h3>@krissdrawing</h3>
        </UserName>
        <ImgBackEffect mask={instagramMask.mask.publicURL} />
      </Wrapper>
    </>
  );
};

export default InstagramAlert;
