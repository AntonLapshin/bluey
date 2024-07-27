import React, { useRef, useEffect } from "react";

interface AudioProps {
  src: string;
  playRef: any;
}

export const Audio: React.FC<AudioProps> = ({ src, playRef }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      playRef.current = () => {
        audioRef.current?.play();
      };
    }
  }, [playRef]);

  return <audio ref={audioRef} src={src} />;
};
