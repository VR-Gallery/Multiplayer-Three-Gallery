import { FC, useEffect, useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { usePlayerEventStore } from '@/components/gameObjects/player/hooks/usePlayerEventHandler';
const useTeleportation = () => {};

type Props = JSX.IntrinsicElements['mesh'] & {
  fontScale?: number;
  gotoPosition: [number, number, number];
  text: string;
};

export const Teleportation: FC<Props> = (props) => {
  const { fontScale = 0.5, gotoPosition, text, ...restProps } = props;
  const [active, setActive] = useState(false);
  const textRef = useRef<THREE.Mesh>(null!);
  const { pushPlayerEvent } = usePlayerEventStore();

  useEffect(() => {
    if (active) {
      textRef.current.scale.set(
        fontScale * 1.2,
        fontScale * 1.2,
        fontScale * 1.2,
      );
    } else {
      textRef.current.scale.set(fontScale, fontScale, fontScale);
    }
  }, [active]);

  const onClick = () => {
    pushPlayerEvent({
      event: 'teleportation',
      payload: {
        position: gotoPosition,
      },
    });
  };

  return (
    <>
      <Text
        font='/NotoSansTC.ttf'
        color='white'
        onPointerOver={() => setActive(true)}
        onPointerOut={() => setActive(false)}
        ref={textRef}
        onClick={onClick}
        {...restProps}
      >
        {text}
      </Text>
    </>
  );
};
