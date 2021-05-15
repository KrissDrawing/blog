import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { gql, useSubscription } from "@apollo/client";
import gsap from "gsap";
import { SiInstagram } from "react-icons/si";

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
  width: 350px;
  height: 100px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  border: 5px solid white;
  border-right: none;
  border-radius: 10px 0 0 10px;
  background-color: #ff9e00;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100%;
    background: #240046;
  }
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  color: #7b2cbf;
  position: absolute;
  transform: translate(-50%, 50%);
  bottom: 50%;
  left: 50%;
  font-size: 50px;

  h3 {
    font-weight: bold;
    font-size: 30px;
    margin: 0 0 0 30px;
    color: #240046;
  }
`;

const InstagramAlert = () => {
  const instaPhotoRef = useRef(null);
  const timeline = useRef(null);
  const { data: alertTrigger } = useSubscription(INSTAGRAM_ALERT_SUBSCRIPTION);

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
        <Backdrop></Backdrop>
        <UserName>
          <SiInstagram />
          <h3>@krissdrawing</h3>
        </UserName>
      </Wrapper>
    </>
  );
};

export default InstagramAlert;
