import React, { useEffect, useState, useRef } from "react";
import { gql, useMutation, useSubscription, useQuery } from "@apollo/client";
import { graphql, useStaticQuery } from "gatsby";
import { gsap } from "gsap";
import styled from "styled-components";
import Character from "../Character/Character";

const Wrapper = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 50vh;
  left: 2vh;
`;

const CharacterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-center;
`;

const PointsWrapper = styled.div`
  display: flex;
  font-weight: bold;
  color: white;
  margin-top: -50px;
  align-items: center;
  z-index: 1;
  text-shadow: 3px 3px 3px black;
  & > p {
    margin: 5px;
  }
  & > img {
    margin: 0;
  }
`;

const GET_QUEUE = gql`
  {
    queue
  }
`;

const QUEUE_MUTATION = gql`
  mutation queue($payload: String! = "queue") {
    queue(payload: $payload)
  }
`;

const POINTS_SUBSCRIPTION = gql`
  subscription {
    subscribePoints(topic: "points") {
      rewardPrompt
      userDisplayName
      rewardCost
      id
    }
  }
`;

const Characters = () => {
  const { data: pointsData = "" } = useSubscription(POINTS_SUBSCRIPTION);
  const { loading: loadingQueue, __, data: startQueue } = useQuery(GET_QUEUE);
  const data = useStaticQuery(query);
  const [reward, setReward] = useState([]);
  const [mutateQueue] = useMutation(QUEUE_MUTATION);

  useEffect(() => {
    if (!loadingQueue && startQueue) {
      const fetchQueue = async () => {
        setReward([...JSON.parse(startQueue.queue)]);
      };
      fetchQueue();
    }
  }, [startQueue]);

  useEffect(() => {
    if (pointsData?.subscribePoints?.userDisplayName)
      setReward(prevState => [
        ...prevState,
        {
          subscribePoints: {
            ...pointsData.subscribePoints,
            costume: Math.floor(Math.random() * 5),
          },
        },
      ]);
  }, [pointsData]);

  useEffect(() => {
    if (reward.length > 3) {
      reward.shift();
      setReward([...reward]);
    }
    if (reward.length > 0) {
      mutateQueue({ variables: { payload: JSON.stringify(reward) } });
    }
  }, [reward]);

  return (
    <Wrapper>
      {reward.map((item, i) =>
        item !== "" ? (
          <CharacterWrapper key={item + i}>
            <Character
              color={"#7b2cbf"}
              name={item.subscribePoints.userDisplayName}
              costume={item.subscribePoints.costume}
            />
            <PointsWrapper>
              <p>-{item.subscribePoints.rewardCost}</p>
              <img src={data.balls.childImageSharp.fixed.src} />
            </PointsWrapper>
          </CharacterWrapper>
        ) : null
      )}
    </Wrapper>
  );
};

export const query = graphql`
  {
    balls: file(name: { eq: "balls" }) {
      childImageSharp {
        fixed(width: 32) {
          src
        }
      }
    }
  }
`;

export default Characters;
