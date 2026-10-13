import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { GlobalAudioPlayer } from "../Context/AudioPlayerContext";

const AlbumDetails = () => {
  let location = useLocation();

  let {
    songs,
    setSongs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex,
  } = useContext(GlobalAudioPlayer);
  console.log(location);

  let albumData = location?.state;
  console.log("Album Data:", albumData);

  let songlist = albumData?.songs;
  console.log("Song List", songlist);

  //create one function which will handle the songs
  let handleSongChange = (index) => {
    setSongs(songlist);
    setCurrentSongIndex(index);
    if (currentSongIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    // Etract the album details only from the state
    <section className="w-full min-h-[calc(100vh-70px)] flex flex-col items-center">
      {/* album details */}
      <article className="w-[95%] flex gap-2 h-[430px] bg-[#303430] px-8 py-5 rounded-md mt-5 ">
        {/* left aside -album thumbnail*/}
        <aside className="basis-[30%] h-[350px] p-1 relative">
          <img
            src={albumData?.albumThumbnail}
            alt={albumData?.albumTitle}
            className="w-full h-[380px] rounded-md"
          />
          <span className="py-1 px-3 bg-[gray] rounded absolute top-[-10px] right-[-8px] ">
            {albumData?.albumType}
          </span>
        </aside>
        {/* righr aside -album details*/}
        <aside className="basis-[70%] h-[350px]">
          <h1 className="text-5xl font-bold tracking-wide px-2">
            {albumData?.albumTitle}
          </h1>
          <p className="px-2 py-3">
            <span className="text-lg font-semibold mr-1 text-justify">
              Description:
            </span>
            <span className="text-gray-200 ">{albumData?.albumDesc}</span>
          </p>
          <p className="px-2 py-3">
            <span className="text-lg font-semibold mr-1 text-justify">
              Release Date:
            </span>
            <span className="text-gray-200 ">
              {albumData?.albumReleaseDate}
            </span>
          </p>
          <p className="px-2 py-3">
            <span className="text-lg font-semibold mr-1 text-justify">
              Language:
            </span>
            <span className="text-gray-200 ">{albumData?.albumLang}</span>
          </p>
          <p className="px-2 py-3">
            <span className="text-lg font-semibold mr-1 text-justify">
              Star Cast:
            </span>
            <span className="text-gray-200 ">{albumData?.albumStarcast}</span>
          </p>
          <p className="px-2 py-3">
            <span className="text-lg font-semibold mr-1 text-justify">
              Director:
            </span>
            <span className="text-gray-200 ">{albumData?.albumDirector}</span>
          </p>
          <p className="px-2 py-3">
            <span className="text-lg font-semibold mr-1 text-justify">
              Number of Tracks
            </span>
            <span className="text-gray-200 ">{albumData?.albumSongsCount}</span>
          </p>
        </aside>
      </article>
      {/* song list container */}
      <main className="mt-5 w-full mb-8 rounded-b-md">
        <header className="w-full">
          <h1 className="text-black text-3xl font-semibold py-2 px-8">
            Song Collection
          </h1>
        </header>
        <table className="ml-8 w-[95%] mb-50 ">
          <thead>
            <tr
              className="bg-[#303430] rounded-t-md"
            >
              <td className="py-2 px-3 text-lg font-semibold">Track Number:</td>
              <td className="py-2 px-3 text-lg font-semibold">Poster:</td>
              <td className="py-2 px-3 text-lg font-semibold">Song Name:</td>
              <td className="py-2 px-3 text-lg font-semibold">Song Singers:</td>
              <td className="py-2 px-3 text-lg font-semibold">
                Song Music Director:
              </td>
              <td className="py-2 px-3 text-lg font-semibold">Duration:</td>
              <td className="py-2 px-3 text-lg font-semibold">Size</td>
            </tr>
          </thead>
          <tbody>
            {songlist.length > 0 ? (
              songlist.map((song, index) => {
                return (
                  <tr key={index} onClick={() => {
                    handleSongChange(index)
                  }} className="bg-[gray] hover:bg-[#585858] transition-all cursor-pointer duration-75 ease-in-out">
                    <td className="text-center">{index + 1}</td>
                    <td className="flex justify-center items-center py-2 px-2">
                      <img
                        src={song?.songThumbnail}
                        alt={song?.songTitle}
                        className="w-[100px] h-[90px] rounded-md"
                      />
                    </td>
                    <td className=" px-2 ">{song?.songTitle}</td>
                    <td className="p-1">{song?.songSingers}</td>
                    <td className="p-2">{song?.songMusicDirector}</td>
                    <td className="text-center p-2">{song?.duration}</td>
                    <td className="text-center p-2">{song?.size}</td>
                  </tr>
                );
              })
            ) : (
              <p>Song collection not found</p>
            )}
          </tbody>
          <tfoot></tfoot>
        </table>
      </main>
    </section>
  );
};

export default AlbumDetails;
