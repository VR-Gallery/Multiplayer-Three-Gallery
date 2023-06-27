import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { atom } from "recoil";
import { useRecoilValue } from "recoil";

export const coursorInfoPopupState = atom<{
  text: string;
  id: string;
  show: boolean;
}>({
  key: "coursorInfoPopup",
  default: {
    text: "",
    id: "",
    show: false,
  },
});

export const CursorInfoPopup: FC = () => {
  const { text, show } = useRecoilValue(coursorInfoPopupState);

  const [mousePos, setMousePos] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  useEffect(() => {
    // get mouse position
    const onMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      className={classNames(
        "bg-w fixed h-16 max-w-min overflow-hidden transition-[width] duration-500 delay-0 ease-in-out cursor-none pointer-events-none",
        {
          "w-0": !show,
          "w-full": show,
        }
      )}
      style={{
        top: `${mousePos.y - 48}px`,
        left: `${mousePos.x - 4}px`,
      }}
    >
      <div className="relative w-min pr-8">
        {/* x 偏差 4px y 偏差 48px */}
        <div className=" relative top-12 h-2 w-2 rounded-full bg-white"></div>
        <div className=" relative top-8 h-[1px] w-8 -rotate-45 bg-white"></div>
        <div className=" relative -top-[3px] left-[27px] h-[24px] w-min whitespace-nowrap border-b border-b-white px-4 text-white ">
          {text}
        </div>
      </div>
    </div>
  );
};
