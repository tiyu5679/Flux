import React from "react";

export const SongCard = ({ thumbnail, songName, artist, ind, songURL }) => {

  return (
    <div className="card-container flex w-[80%] md:[70%] bg-white rounded-3xl drop-shadow-lg hover:bg-slate-100">
      <div className="index-container py-[5vh] flex justify-center w-[7vh] md:[10vh]">
        <h1 className="text-2xl md:text-3xl">{ind + 1}</h1>
      </div>
      <div className="thumbnail-container my-4">
        <img
          className="w-[10vh] h-[10vh] md:w-[15vh] md:h-[15vh] rounded-xl drop-shadow-lg"
          src={thumbnail}
          alt=""
        />
      </div>
      <div className="song-information-container my-[3vh] md:my-[5vh] ml-[2.5vh] md:ml-[5vh]">
        <h1 className="md:text-3xl font-bold">{songName}</h1>
        <h1 className="md:text-lg text-slate-500 font-semibold">{artist}</h1>
      </div>
      <div className="actions-container py-10 md:ml-[30vh]">
        <audio className="w-[100px] md:w-[40vh]" src={songURL} controls></audio>
      </div>
    </div>
  );
};