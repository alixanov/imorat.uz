// src/components/BackgroundVideo.js
import React from 'react';
import video from "../../assets/mixkit-aerial-view-of-a-city-during-the-night-4308-full-hd.mp4";

const BackgroundVideo = () => {
     return (
          <video
               autoPlay
               loop
               muted
               playsInline
               className="background__video"
          >
               <source src={video} type="video/mp4" />
               Ваш браузер не поддерживает HTML5 видео.
          </video>
     );
};

export default BackgroundVideo;
