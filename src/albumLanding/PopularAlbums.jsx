import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { __DB } from "../Backend/firebaseconfig";
import { FaMusic } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Spinner from "../Helper/Spinner.jsx";
import TiltedCard from "../ainmations/TitleCard.jsx";

const PopularAlbums = () => {
  let [albums, setAlbums] = useState(null);
  useEffect(() => {
    let fetchAlbums = async () => {
      try {
        //now we will fetch the albums from the database
        let albumCollectionRef = collection(__DB, "music_albums");
        let getAlbums = await getDocs(albumCollectionRef);
        console.log(getAlbums);
        let albumData = getAlbums.docs.map((album) => ({
          ...album?.data(),
          songs: album?.data()?.songs || [],
        }));
        console.log("Album Data: ", albumData);
        setAlbums(albumData);
      } catch (error) {
        console.log("Error while Fetching: ", error);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <section className="w-[80vw] text-white ">
      {albums ? (
        <article>
          <header className="w-full p-5 flex items-center gap-3">
            <span className="text-3xl text-black">
              <FaMusic />
            </span>
            <h1 className="text-3xl font-semibold text-black">
              Popular Albums
            </h1>
          </header>
          <main className="w-full">
            <div className="px-6 flex  items-center gap-5">
              {albums.map((album, index) => {
                return (
                  <NavLink
                    to={`album-details/${album?.albumTitle}`}
                    key={index}
                    state={album}
                  >
                    <div className="w-[250px] h-[350px] bg-[#a1a1a1] p-4 rounded-lg ">
                      
                      <img
                        src={album?.albumThumbnail}
                        alt={album?.albumTitle}
                        className="w-full h-[250px] object-cover rounded-md hover:scale-105 transition-all duration-100 ease-linear"
                      />
                      <h1 className="py-2 text-center mt-2 rounded text-xl font-semibold">
                        {album?.albumTitle}
                      </h1>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </main>
        </article>
      ) : (
        <section className="w-[100%] h-[100vh] fixed top-0 left-[7%]">
          <Spinner />
        </section>
      )}
    </section>
  );
};

export default PopularAlbums;
