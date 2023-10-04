import React, { useCallback, useState, FC } from "react";
import {
  useLocalParticipant,
  useDevices,
  useDaily,
  useDailyEvent,
  DailyVideo,
} from "@daily-co/daily-react";
import { useJoinedDailyApp, useLeaveDailyApp } from "../index";
import { Button, Select, Option, Input, Alert } from "@material-tailwind/react";
import { playerState } from "@/modules/three/player";
import { joinState } from "@/modules/three/sence";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DailyEventObject } from "@daily-co/daily-js";
import classNames from "classnames";

type CharacterSelectProps = {
  options: {
    label: string;
    name: string;
    url: string;
  }[];
  onSelected: (label: string) => void;
  selected: string;
};

const CharacterSelect: FC<CharacterSelectProps> = ({
  options,
  onSelected,
  selected,
}) => {
  return (
    <div className="flex items-end justify-between">
      {options.map(({ url, name, label }) => (
        <div
          className={classNames(
            {
              "h-64 w-48": selected === label,
              "h-48 w-36": selected !== label,
            },
            "relative flex cursor-pointer flex-col items-center justify-center gap-2 transition-all duration-500"
          )}
          onClick={() => onSelected(label)}
        >
          <img
            className={classNames(
              "h-full w-full rounded-2xl object-cover transition-all duration-200",
              {
                " border-8 border-blue-600": selected === label,
                " border-0": selected !== label,
              }
            )}
            src={url}
            alt={name}
          />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
};

const HairCheck: FC = () => {
  const [player, setPlayerState] = useRecoilState(playerState);
  const setJoin = useSetRecoilState(joinState);
  const { joinCall } = useJoinedDailyApp();
  const { leaveCall } = useLeaveDailyApp();

  const localParticipant = useLocalParticipant();
  const {
    microphones,
    speakers,
    cameras,
    setMicrophone,
    setCamera,
    setSpeaker,
  } = useDevices();
  const callObject = useDaily();

  const [getUserMediaError, setGetUserMediaError] =
    useState<DailyEventObject | null>(null);

  useDailyEvent(
    "camera-error",
    useCallback((event) => {
      setGetUserMediaError(event);
    }, [])
  );
  const videoMediaError =
    getUserMediaError?.error?.blockedMedia.includes("video");
  const audioMediaError =
    getUserMediaError?.error?.blockedMedia.includes("audio");
  const mediaErrorMessages = getUserMediaError?.error?.msg;

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!callObject) return;
    callObject.setUserName(e.target.value);
    setPlayerState({
      ...player,
      name: e.target.value,
    });
  };

  const updateMicrophone = (value: string | undefined) => {
    setMicrophone(value || "");
  };

  const updateSpeakers = (value: string | undefined) => {
    setSpeaker(value || "");
  };

  const updateCamera = (value: string | undefined) => {
    setCamera(value || "");
  };

  const joinWithDaily = () => {
    joinCall();
    setJoin({
      isJoined: true,
      isDailyJoined: true,
    });
  };

  const joinWithoutDaily = () => {
    leaveCall();
    setJoin({
      isJoined: true,
      isDailyJoined: false,
    });
  };

  return (
    <>
      {/* Video preview */}
      <div className="relative -top-12 m-auto h-36 w-64 rounded-2xl bg-black shadow">
        <DailyVideo
          sessionId={localParticipant?.session_id || ""}
          mirror
          type="video"
        />
      </div>
      <CharacterSelect
        options={[
          {
            name: "男生",
            label: "male",
            url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/player/male.jpg`,
          },
          {
            name: "女生",
            label: "female",
            url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/player/female.jpg`,
          },
        ]}
        onSelected={(label) => {
          setPlayerState({
            ...player,
            useModelType: label as "male" | "female",
          });
        }}
        selected={player.useModelType}
      />
      {/* Username */}

      <Input
        label="Username"
        variant="standard"
        onChange={onNameChange}
        value={localParticipant?.user_name || " "}
      />

      {mediaErrorMessages && (
        <Alert color="red" variant="gradient">
          麥克風或鏡頭無法取得：
          <br />
          {mediaErrorMessages}
        </Alert>
      )}

      {/* Microphone select */}
      {!audioMediaError && (
        <Select
          label="Microphone"
          variant="standard"
          onChange={updateMicrophone}
        >
          {microphones?.map((mic) => (
            <Option
              key={`mic-${mic.device.deviceId}`}
              value={mic.device.deviceId}
            >
              {mic.device.label}
            </Option>
          ))}
        </Select>
      )}

      {/* Speakers select */}
      <Select label="Speakers" variant="standard" onChange={updateSpeakers}>
        {speakers?.map((speaker) => (
          <Option
            key={`speaker-${speaker.device.deviceId}`}
            value={speaker.device.deviceId}
          >
            {speaker.device.label}
          </Option>
        ))}
      </Select>

      {/* Camera select */}
      {!videoMediaError && (
        <Select label="Camera" variant="standard" onChange={updateCamera}>
          {cameras?.map((camera) => (
            <Option
              key={`cam-${camera.device.deviceId}`}
              value={camera.device.deviceId}
            >
              {camera.device.label}
            </Option>
          ))}
        </Select>
      )}

      <div className=" flex justify-center gap-4">
        <Button variant="outlined" onClick={joinWithDaily}>
          加入
        </Button>
        <Button variant="outlined" onClick={joinWithoutDaily} color="green">
          無語音加入
        </Button>
      </div>
    </>
  );
};

export default HairCheck;
