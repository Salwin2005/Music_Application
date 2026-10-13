import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { __DB } from "../../../Backend/firebaseconfig";


const CreateAlbum = () => {
  let navigate = useNavigate();

  //! State for Album Details
  let [albumDetails, setAlbumDetails] = useState({
    albumTitle: "",
    albumLang: "",
    albumType: "",
    albumDesc: "",
    albumReleaseDate: "",
    albumSongsCount: "",
    albumThumbnail: "",
    albumStarcast: "",
    albumDirector: "",
    songs: [],
  });

  //! Destructuring albumDetails
  let {
    albumTitle,
    albumLang,
    albumType,
    albumDesc,
    albumReleaseDate,
    albumSongsCount,
    albumThumbnail,
    albumStarcast,
    albumDirector,
    songs,
  } = albumDetails;

  //! State for Song Details
  let [songDetails, setSongDetails] = useState([
    {
      songTitle: "",
      songSingers: "",
      songMusicDirector: "",
      songThumbnail: "",
      songFile: "",
    },
  ]);

  //! State for loading
  let [isLoading, setIsLoading] = useState(false);

  //! Handle Album Inputs
  let handleAlbumInputChange = (e) => {
    let { name, value } = e.target;
    setAlbumDetails({ ...albumDetails, [name]: value });
  };

  //! Handle Album Thumbnail
  let handleAlbumFileChange = (e) => {
    let file = e.target.files[0];
    setAlbumDetails({ ...albumDetails, albumThumbnail: file });
  };

  //! Handle Song Inputs
  let handleSongInputChange = (index, e) => {
    let { name, value } = e.target;
    let updatedSongs = [...songDetails];
    updatedSongs[index][name] = value;
    setSongDetails(updatedSongs);
  };

  //! Handle Song Files
  let handleSongFileChange = (index, e) => {
    let file = e.target.files[0];
    let updatedSongs = [...songDetails];
    let name = e.target.name;

    if(name === "songThumbnail") {
      updatedSongs[index].songThumbnail = file;
    }
    else if (name === "songFile") {
      updatedSongs[index].songFile = file;
    }
    
    setSongDetails(updatedSongs);
  };

  //! Handle Submit
  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //! Step 1: Upload Album Thumbnail
      let uploadedAlbumThumbnailUrl = "";
      if (albumThumbnail) {
        let albumData = new FormData();
        albumData.append("file", albumThumbnail);
        albumData.append("upload_preset", "music_albums");
        albumData.append("cloud_name", "dijgihlao");

        let response = await fetch (
          "https://api.cloudinary.com/v1_1/dijgihlao/upload",
          {
            method: "POST",
            body: albumData,
          }
        );
        
        let albumThumbnailResult = await response.json();
        uploadedAlbumThumbnailUrl = albumThumbnailResult.url;
        console.log("Album Thumbnail:", uploadedAlbumThumbnailUrl);
      }

      //! Step 2: Upload Song Thumbnails and Files
      let songData = [];

      await Promise.all(
        songDetails.map(async (song) => {
          let songDataObject = {};
          let uploadedSongThumbnailURL = "";

          // Upload song thumbnail
          if (song.songThumbnail) {
            let songFileData = new FormData();
            songFileData.append("file", song.songThumbnail);
            songFileData.append("upload_preset", "music_albums");
            songFileData.append("cloud_name", "dijgihlao");

            let response = await fetch(
              "https://api.cloudinary.com/v1_1/dijgihlao/upload",
              {
                method: "POST",
                body: songFileData,
              }
            );

            let uploadedSongThumbnailResult = await response.json();
            uploadedSongThumbnailURL = uploadedSongThumbnailResult.url;
            console.log("Song Thumbnail:", uploadedSongThumbnailURL);
          }

          // Upload song file
          let uploadedSongFileURL = "";
          if (song.songFile) {
            let songFileData = new FormData();
            songFileData.append("file", song.songFile);
            songFileData.append("upload_preset", "music_albums");
            songFileData.append("cloud_name", "dijgihlao");

            let response = await fetch(
              "https://api.cloudinary.com/v1_1/dijgihlao/upload",
              {
                method: "POST",
                body: songFileData,
              }
            );

            let uploadedSongFileResult = await response.json();
            uploadedSongFileURL = uploadedSongFileResult.url;
            console.log("Song File:", uploadedSongFileURL);

            // Prepare Song Data Object
            songDataObject = {
              songFile: uploadedSongFileURL,
              duration: (() => {
                let seconds = Math.floor(uploadedSongFileResult.duration || 0);
                let minutes = Math.floor(seconds / 60);
                let remainingSeconds = seconds % 60;
                return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
              })(),
              size: (uploadedSongFileResult.bytes / (1024 * 1024)).toFixed(2) + " MB",
            };
          }

          songData.push({
            ...songDataObject,
            songThumbnail: uploadedSongThumbnailURL,
            songTitle: song.songTitle,
            songSingers: song.songSingers,
            songMusicDirector: song.songMusicDirector,
          });
        })
      );

      //! Step 3: Save Data to Database
      let payload = {
        ...albumDetails,
        albumThumbnail: uploadedAlbumThumbnailUrl,
        songs: songData,
      };

      let albumCollection = collection(__DB, "music_albums");
      await addDoc(albumCollection, payload);

      toast.success("Album created successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error.code
          ? error.code.slice(5)
          : error.message || "An unexpected error occurred"
      );
    }
    setIsLoading(false);
  };

  //! Add Song
  let addSong = () => {
    setSongDetails([
      ...songDetails,
      {
        songTitle: "",
        songSingers: "",
        songMusicDirector: "",
        songThumbnail: "",
        songFile: "",
      },
    ]);
  };

  //! Remove Song
  let removeSong = (index) => {
    let removedSongs = songDetails.filter((_, i) => i !== index);
    setSongDetails(removedSongs);
  };
  
    
  return (
    <section className="w-full flex flex-col justify-center items-center p-6 text-white">
      {/* //? Starting of Add Album Code */}
      <article className="w-full bg-[#b3b3b3]/50 text-black rounded-t-md">
        <header>
          <h1 className="text-3xl text-center uppercase font-bold py-6">
            Add Album
          </h1>
        </header>
      </article>
      <main className="w-full bg-[#b3b3b3]/50 rounded-b-md">
        <form onSubmit={handleSubmit} className="w-full py-2 px-4">
          <div className="flex justify-around py-2">
            <div className="w-[350px] flex flex-col ">
              <label
                htmlFor="albumTitle"
                className="text-lg font-semibold mb-1 text-black"
              >
                Album Title
              </label>
              <input
              placeholder="Enter Album Title"
                type="text"
                name="albumTitle"
                id="albumTitle"
                className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none"
                value={albumTitle}
                onChange={handleAlbumInputChange}
              />
            </div>
            <div className="w-[350px] flex flex-col">
              <label htmlFor="albumLang" className="text-lg font-semibold mb-1 text-black">
                Album Language
              </label>
              <input
              placeholder="Enter Album Language"
                type="text"
                name="albumLang"
                id="albumLang"
                className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none"
                value={albumLang}
                onChange={handleAlbumInputChange}
              />
            </div>
            <div className="w-[350px] flex flex-col">
              <label htmlFor="albumType" className="text-lg font-semibold mb-1 text-black">
                Album Type
              </label>
              <input
              placeholder="Enter Album Type"
                type="text"
                name="albumType"
                id="albumType"
                className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none"
                value={albumType}
                onChange={handleAlbumInputChange}
              />
            </div>
          </div>
          <div className="flex justify-center py-2">
            <div className="w-[1160px] flex flex-col">
              <label htmlFor="albumDesc" className="text-lg font-semibold mb-1 text-black">
                Album Description
              </label>
              <textarea
              placeholder="Enter Album Description"
                name="albumDesc"
                id="albumDesc"
                className="border border-gray-400 h-[80px] rounded bg-white text-black text-lg px-2 outline-none"
                value={albumDesc}
                onChange={handleAlbumInputChange}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-around py-2">
            <div className="w-[350px] flex flex-col">
              <label
                htmlFor="albumReleaseDate"
                className="text-lg font-semibold mb-1 text-black"
              >
                Album Release Date
              </label>
              <input
              placeholder="Enter Album Release Date"
                type="date"
                name="albumReleaseDate"
                id="albumReleaseDate"
                className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none"
                value={albumReleaseDate}
                onChange={handleAlbumInputChange}
              />
            </div>
            <div className="w-[350px] flex flex-col">
              <label
                htmlFor="albumSongsCount"
                className="text-lg font-semibold mb-1 text-black"
              >
                Number of Songs
              </label>
              <input
              placeholder="Enter Number of Songs"
                type="number"
                name="albumSongsCount"
                id="albumSongsCount"
                className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none"
                value={albumSongsCount}
                onChange={handleAlbumInputChange}
              />
            </div>
            <div className="w-[350px] flex flex-col">
              <label
                htmlFor="albumThumbnail"
                className="text-lg font-semibold mb-1 text-black"
              >
                Upload Album Thumbnail
              </label>
              <input
              placeholder="Upload Album Thumbnail"
                type="file"
                name="albumThumbnail"
                id="albumThumbnail"
                className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none file:bg-gray-800 cursor-pointer file:cursor-pointer file:text-white file:rounded file:p-1 file:text-sm"
                onChange={handleAlbumFileChange}
                accept="image/*"
              />
            </div>
          </div>
          <div className="flex py-2">
            <div className="w-[350px] flex flex-col ml-7">
              <label
                htmlFor="albumStarcast"
                className="text-lg font-semibold mb-1 text-black"
              >
                Album Starcast
              </label>
              <input
              placeholder="Enter Album Starcast"
                type="text"
                name="albumStarcast"
                id="albumStarcast"
                className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none"
                value={albumStarcast}
                onChange={handleAlbumInputChange}
              />
            </div>
            <div className="w-[350px] flex flex-col ml-13">
              <label
                htmlFor="albumDirector"
                className="text-lg font-semibold mb-1 text-black"
              >
                Album Director
              </label>
              <input
              placeholder="Enter Album Director"
                type="text"
                name="albumDirector"
                id="albumDirector"
                className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none"
                value={albumDirector}
                onChange={handleAlbumInputChange}
              />
            </div>
          </div>
          {/* //? Ending of Add Album Code  */}
          {/* //? Starting of Add Songs Details Code */}
          <article className="w-full flex flex-col items-center mt-4">
            <header className="w-[95%] bg-white text-black rounded">
              <h1 className="text-3xl text-center uppercase font-bold py-3">
                Add Songs
              </h1>
            </header>
            {songDetails.map((song, index) => (
              <section
                key={index}
                className="bg-[#7c7c7c] w-[95%] flex flex-col m-auto mt-3 rounded-lg"
              >
                <header>
                  <h1 className="text-2xl font-semibold px-4 py-2">
                    Song-{index + 1}
                  </h1>
                </header>
                <article className="py-2 px-4">
                  <div className="flex justify-around py-2 mb-2">
                    <div className="w-[350px] flex flex-col">
                      <label
                        htmlFor="songTitle"
                        className="text-lg font-semibold mb-1"
                      >
                        Song Title
                      </label>
                      <input
                      placeholder="Enter Song Title"
                        type="text"
                        name="songTitle"
                        id="songTitle"
                        className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none"
                        value={song.songTitle}
                        onChange={(e) => handleSongInputChange(index, e)}
                      />
                    </div>
                    <div className="w-[350px] flex flex-col">
                      <label
                        htmlFor="songSingers"
                        className="text-lg font-semibold mb-1"
                      >
                        Song Singer(s)
                      </label>
                      <input
                      placeholder="Enter Song Singer(s)"
                        type="text"
                        name="songSingers"
                        id="songSingers"
                        className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none"
                        value={song.songSingers}
                        onChange={(e) => handleSongInputChange(index, e)}
                      />
                    </div>
                    <div className="w-[350px] flex flex-col">
                      <label
                        htmlFor="songMusicDirector"
                        className="text-lg font-semibold mb-1"
                      >
                        Song Music Director
                      </label>
                      <input
                      placeholder="Enter Song Music Director"
                        type="text"
                        name="songMusicDirector"
                        id="songMusicDirector"
                        className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none"
                        value={song.songMusicDirector}
                        onChange={(e) => handleSongInputChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-around py-2">
                    <div className="w-[530px] flex flex-col">
                      <label
                        htmlFor="songThumbnail"
                        className="text-lg font-semibold mb-1"
                      >
                        Upload Song Thumbnail
                      </label>
                      <input
                        placeholder="Upload Song Thumbnail"
                        type="file"
                        name="songThumbnail"
                        id="songThumbnail"
                        className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none file:bg-gray-800 cursor-pointer file:cursor-pointer file:text-white file:rounded file:p-1 file:text-sm"
                        onChange={(e) => handleSongFileChange(index, e)}
                        accept="image/*"
                      />
                    </div>
                    <div className="w-[530px] flex flex-col">
                      <label
                        htmlFor="songFile"
                        className="text-lg font-semibold mb-1"
                      >
                        Upload Song File (.mp3)
                      </label>
                      <input
                      placeholder="Upload Song File (.mp3)"
                        type="file"
                        name="songFile"
                        id="songFile"
                        className="border border-gray-400 py-2 rounded bg-white text-black text-lg px-2 outline-none file:bg-gray-800 cursor-pointer file:cursor-pointer file:text-white file:rounded file:p-1 file:text-sm"
                        onChange={(e) => handleSongFileChange(index, e)}
                        accept="audio/*"
                      />
                    </div>
                  </div>
                </article>
                <section className="flex justify-between">
                  {/* //? Starting of Add Song Code */}
                  <aside className="flex px-8 mb-4">
                    {songDetails.length === index + 1 && (
                      <div
                        onClick={addSong}
                        className="bg-white text-black flex items-center gap-2 hover:bg-black hover:text-white cursor-pointer py-2 px-4 rounded"
                      >
                        <span className="font-semibold">Add Song</span>
                        <span className="text-lg">
                          <IoIosAddCircle />
                        </span>
                      </div>
                    )}
                  </aside>
                  {/* //? Ending of Add Song Code */}

                  {/* //? Starting of Remove Song Code */}
                  <aside className="flex px-8 mb-4">
                    {songDetails.length !== 1 && (
                      <div
                        onClick={() => removeSong(index)}
                        className="bg-blue-600 flex items-center gap-2 hover:bg-red-600 cursor-pointer py-2 px-4 rounded"
                      >
                        <span className="font-semibold">Remove Song</span>
                        <span className="text-lg">
                          <IoIosRemoveCircle />
                        </span>
                      </div>
                    )}
                  </aside>
                  {/* //? Ending of Remove Song Code */}
                </section>
              </section>
            ))}
          </article>
          {/*//? Ending of Add Songs Details Code */}
          {/* //? Form Submit Button Code */}
          <article className="my-5 w-full flex justify-center items-center">
            <button className="w-[95%] py-2 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg mt-2 cursor-pointer">
              {isLoading ? "Uploading..." : "Add Album"}
            </button>
          </article>
        </form>
      </main>
    </section>
  );
};

export default CreateAlbum;