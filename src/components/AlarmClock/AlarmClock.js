import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import { gql, useMutation, useQuery } from "@apollo/client";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SetAlarm = styled.input`
  width: 30px;
  height: 30px;
  margin: 20px;
`;

const getAlarm = gql`
  {
    getAlarm {
      hour
      minute
    }
  }
`;

const setAlarm = gql`
  mutation setAlarmMutation($hour: Int!, $minute: Int!) {
    setAlarm(hour: $hour, minute: $minute) {
      hour
      minute
    }
  }
`;
const dismissAlarm = gql`
  mutation {
    dismissAlarm
  }
`;

const AlarmClock = () => {
  const [isAlarm, setIsAlarm] = useState(false);
  const [alarmTime, setalarmTime] = useState(moment());
  const format = "HH:mm";

  const [mutateSetAlarm] = useMutation(setAlarm);
  const [mutatedismissAlarm] = useMutation(dismissAlarm);
  const { loading, error, data } = useQuery(getAlarm);

  useEffect(() => {
    if (data && data.getAlarm && isAlarm === false) setIsAlarm(true);
  }, [data]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const onChange = value => {
    setalarmTime(value);
  };

  const toggleAlarm = () => {
    if (!isAlarm)
      mutateSetAlarm({
        variables: { hour: alarmTime.hour(), minute: alarmTime.minute() },
      });
    else {
      mutatedismissAlarm();
    }
    setIsAlarm(!isAlarm);
  };

  return (
    <Wrapper>
      {/* {console.log(data.getAlarm)}
      {console.log(isAlarm)} */}
      <TimePicker
        showSecond={false}
        defaultValue={
          data.getAlarm
            ? moment().set({
                hour: data.getAlarm.hour,
                minute: data.getAlarm.minute,
              })
            : alarmTime
        }
        //   className="xxx"
        onChange={onChange}
        format={format}
        disabled={isAlarm}
      />
      <SetAlarm
        type="checkbox"
        onChange={toggleAlarm}
        value={isAlarm}
        checked={isAlarm}
      />
    </Wrapper>
  );
};

export default AlarmClock;
