import Head from "next/head";
import Sence from "@/modules/three/sence";
import Sidebar from "@/modules/ui/Sidebar";
import Navbar from "@/modules/ui/Navbar";
import Headbar from "@/modules/ui/Headbar";
import MiroBoard from "@/modules/ui/MiroBoard";
import { useState, useEffect } from "react";
import {
  JoyStickController,
  JoyStickControllerProvider,
} from "@/modules/ui/JoyStickController";
import DailyApp from "@/modules/videoDaily";
import useCSR from "@/hooks/useCSR";
import { CursorInfoPopup } from "@/modules/ui/CursorInfoPopup";


export default function Page() {
  const isCSR = useCSR();
  const [isMiroOpen, setIsMiroOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Ray-Realms</title>
      </Head>
      <JoyStickControllerProvider>
        <DailyApp>
          <div className=" fixed h-full w-full bg-gray-500">
            <Sence />
            {isCSR && <Navbar />}
            <Headbar />
            <CursorInfoPopup />
            <Sidebar isMiroOpen={isMiroOpen} setIsMiroOpen={setIsMiroOpen} />
            <JoyStickController />
            {isCSR && (
              <div
                style={{
                  display: isMiroOpen ? "block" : "none",
                }}
              >
                <MiroBoard />
              </div>
            )}
          </div>
        </DailyApp>
      </JoyStickControllerProvider>
    </>
  );
}
