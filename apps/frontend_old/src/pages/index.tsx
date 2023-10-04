import Head from "next/head";
import Sence from "@/modules/three/sence";
import Sidebar from "@/modules/ui/Sidebar";
import Navbar from "@/modules/ui/Navbar";
import Headbar from "@/modules/ui/Headbar";
import MiroBoard from "@/modules/ui/MiroBoard";
import { useState, useEffect, useMemo } from "react";
import {
  JoyStickController,
  JoyStickControllerProvider,
} from "@/modules/ui/JoyStickController";
import DailyApp from "@/modules/videoDaily";
import useCSR from "@/hooks/useCSR";
import { CursorInfoPopup } from "@/modules/ui/CursorInfoPopup";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";

export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

export default function Page() {
  const isCSR = useCSR();
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  return (
    <>
      <Head>
        <title>Ray-Realms</title>
      </Head>
      <JoyStickControllerProvider>
        <DailyApp>
          <KeyboardControls map={map}>
            <div className=" fixed h-full w-full bg-gray-500">
              <Sence />
              {isCSR && <Navbar />}
              <Headbar />
              <CursorInfoPopup />
              <Sidebar />
              <JoyStickController />
            </div>
          </KeyboardControls>
        </DailyApp>
      </JoyStickControllerProvider>
    </>
  );
}
