import React, { useRef, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled, { css } from "styled-components";
import gsap from "gsap";
import { FcCursor } from "react-icons/fc";

export const query = graphql`
  {
    octane: file(name: { eq: "octane" }) {
      publicURL
    }
  }
`;

const Car = styled.img`
  width: 300px;
  z-index: 10;
  margin: 0;
  padding: 0;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InfoBannerWrapper = styled.div`
  padding: 20px;
  position: relative;
  width: 220px;
  height: 50px;
`;
const banner = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-weight: bold;
  border: 4px solid #333;
  border-radius: 10px;
`;
const InfoBanner = styled.div`
  ${banner};
  background: white;
`;
const InfoBannerActive = styled.div`
  ${banner};
  background: #444;
  color: white;
`;

const Cursor = styled.span`
  font-size: 50px;
  z-index: 11;
  position: absolute;
  right: -130px;
  bottom: -30px;
`;

const TwitchFollowAlert = () => {
  const carRef = useRef(null);
  const bannerRef = useRef(null);
  const bannerActiveRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const car = carRef.current;
    const banner = bannerRef.current;
    const bannerActive = bannerActiveRef.current;
    const cursor = cursorRef.current;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 600 });
    tl.set(banner, { css: { scaleX: 0 } });
    tl.set(bannerActive, { autoAlpha: 0 });
    tl.set(cursor, { autoAlpha: 0 });

    tl.fromTo(
      car,
      {
        x: "100%",
        y: "random(-100,150,10)",
      },
      { x: "-330", duration: "4", ease: "power1.out" }
    )
      .to(banner, { css: { scaleX: 1 } })
      .fromTo(
        cursor,
        { autoAlpha: 0.5, x: "0", y: "+=50" },
        { autoAlpha: 1, x: "-=100", y: "-=50" }
      )
      .to(bannerActive, { autoAlpha: 1, ease: "back.out" })
      .to(car, { duration: "4", autoAlpha: 0, ease: "power3.in" });
  }, []);

  const data = useStaticQuery(query);
  return (
    <Wrapper ref={carRef}>
      <Car src={data.octane.publicURL} />
      <InfoBannerWrapper>
        <Cursor ref={cursorRef}>
          <FcCursor />
        </Cursor>
        <InfoBanner ref={bannerRef}>🖤DEJ FOLLOW🖤</InfoBanner>
        <InfoBannerActive ref={bannerActiveRef}>
          ❤️DEJ FOLLOW❤️
        </InfoBannerActive>
      </InfoBannerWrapper>
    </Wrapper>
  );
};

export default TwitchFollowAlert;
