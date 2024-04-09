import React, { useRef, useEffect, useState } from "react";
import "../scss/Video.scss";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      video.play();
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []); // This effect runs only once when the component mounts

  useEffect(() => {
    const video = videoRef.current;
    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }, [isPlaying]); // This effect runs whenever `isPlaying` state changes

  return (
    <div className="video">
      <video
        className="video__item"
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
      />
    </div>
  );
};

export default VideoPlayer;
