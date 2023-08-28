import React, { useState } from "react";

// Importing Components
import { SongCard } from "./SongCard";

// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from "@apollo/client";

const GET_SONGS_DATA = gql`
query MyQuery {
  songs {
    audioFile {
      url
    }
    songName
    thumbnail {
      url
    }
    artist {
      artistName
    }
  }
}
`;

export const Content = () => {

  const { loading, error, data } = useQuery(GET_SONGS_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="content-container">
      <div className="heading flex justify-center">
        <h1 className="text-4xl font-bold">View Posts</h1>
      </div>
      <div className="posts-container mt-8 pb-[8vh]">
        {data.songs.map((song, index) => {
          return (
            <div className="content-container">
              <div className="song-card-container flex justify-center mt-5">
                <SongCard
                  key={index}
                  ind={index} 
                  thumbnail={song.thumbnail.url}
                  songName={song.songName}
                  artist={song.artist.artistName}
                  songURL={song.audioFile.url}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};