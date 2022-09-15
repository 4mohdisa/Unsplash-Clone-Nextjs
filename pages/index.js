import React, { useState, useEffect } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import Masonry from "react-masonry-css";
import Header from "./components/Header";
const clientID = `?client_id=hIvUu0xyyZ-K0N11CdlkXXUpjj8pxkZTwDx9teD8VRc`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data);
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });

    return () => window.removeEventListener("scroll", event);
  }, []);

  const searchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 2,
  };

  return (
    <>
      <Header />
      <header className="fixed  z-1 top-0 w-full bg-white">
        <nav className="flex item-center justify-between lg:px-6 px-3 py-3">
          <a
            href="#"
            className="w-10 min-w-fit lg:mr-0 mr-2 flex item-center justify-center"
          >
            <img src="/icons/home_icon.svg" alt="home" className="w-full" />
          </a>
          <div className="flex items-center flex-grow cursor-pointer lg:mx-4  p-2 px-4 bg-gray-100 py-2 rounded-full">
            <a className="cursor-pointer" onClick={searchSubmit}>
              <img src="/icons/search_icon.svg" className="icon" />
            </a>
            <input
              type="text"
              placeholder="Search free high resolution photos"
              className="w-full  h-full flex-grow  focus:outline-none px-4 py-1 bg-transparent "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <a className="cursor-pointer hidden lg:inline-flex">
              <img src="/icons/camera_icon.svg" className="icon" />
            </a>
          </div>
          <ul className="flex text-center items-center ">
            <li className=" nav-link">Explore</li>
            <li className=" nav-link">Advertise</li>
            <li className="nav-link">Blog</li>

            <li className="nav-link border-l-2 border-gray-300">
              <div>Log in</div>
            </li>
            <li className="nav-link btn">Submit a photo </li>
            <li>
              <p className="link flex items-center">
                <MenuIcon className="h-6 mr-1" />
              </p>
            </li>
          </ul>
        </nav>
        <div className="px-6">
          <div className="navigations flex items-center justify-center space-x-3 py-4  text-base w-full  text-textGray overflow-x-scroll">
            <p className="link">All</p>
            <p className="link">Color&nbsp;of&nbsp;Water</p>
            <p className="link">Current&nbsp;Events</p>
            <p className="link">Wallpapers</p>
            <p className=" hidden lg:inline-flex link">3D&nbsp;Renders</p>

            <p className=" hidden lg:inline-flex link">
              Textures&nbsp;&&nbsp;Patterns
            </p>
            <p className=" hidden lg:inline-flex  link">Experimental</p>
            <p className=" hidden lg:inline-flex  link">Architecture</p>
            <p className=" hidden lg:inline-flex  link">Nature</p>
            <p className=" hidden lg:inline-flex  link">
              Business&nbsp;&&nbsp;Work
            </p>
            <p className=" hidden lg:inline-flex  link">Fashion</p>
            <p className=" hidden lg:inline-flex  link">Film</p>
            <p className=" hidden lg:inline-flex  link">
              Food&nbsp;&&nbsp;Drink
            </p>
            <p className=" hidden lg:inline-flex  link">
              Health&nbsp;&&nbsp;Wellness
            </p>
            <p className=" hidden lg:inline-flex  link">People</p>
            <p className=" hidden lg:inline-flex  link">Interiors</p>
            <p className=" hidden lg:inline-flex  link">
              Street&nbsp;Photography
            </p>
            <p className=" hidden lg:inline-flex  link">Travel</p>
            <p className=" hidden lg:inline-flex  link">Animals</p>
            <p className=" hidden lg:inline-flex  link">Spirituality</p>
            <p className=" hidden lg:inline-flex  link">
              Arts&nbsp;&&nbsp;Culture
            </p>
            <p className=" hidden lg:inline-flex  link">History</p>
            <p className=" hidden lg:inline-flex  link">Athletics</p>
          </div>
        </div>
      </header>
      <main className="w-full flex items-center justify-center bg-center bg-cover py-64 relative top-0 bg-[url('/images/hero_image.jpg')] before:content-[''] before:absolute before:inset-0 before:opacity-30 before:z-[1] before:bg-gradient-to-b before:from-[#000] to-[#000]">
        <div className="hero z-10 flex items-left ml-8 flex-col justify-center w-full max-w-3xl">
          <div>
            <h1 className="font-bold text-white text-5xl">Unsplash</h1>
          </div>
          <div className="text-white  text-xl my-3">
            <p>
              The internet’s source of{" "}
              <a href="https://unsplash.com/license" className="underline">
                freely-usable images
              </a>
              .
            </p>
            <p>Powered by creators everywhere.</p>
          </div>
          <div className="hidden lg:inline-flex  items-center flex-grow cursor-pointer p-2 px-4 rounded-md bg-gray-100 py-3 ">
            <a className="cursor-pointer" onClick={searchSubmit}>
              <img src="/icons/search_icon.svg" className="icon" />
            </a>
            <input
              type="text"
              placeholder="Search free high resolution photos"
              className="w-full  h-full flex-grow  focus:outline-none px-4 py-1 bg-transparent "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <a className="cursor-pointer hidden lg:inline-flex">
              <img src="/icons/camera_icon.svg" className="icon" />
            </a>
          </div>
          <div className="text-white  text-md mt-3">
            <p>
              <span className="text-bolder text-lg">Trending</span>: flower,
              wallpapers, backgrounds, happy, love
            </p>
          </div>
        </div>
      </main>
      <section className="mt-10">
        <Masonry
          className="flex w-auto xl:px-20 lg:px-2 md:px-2 px-2"
          options={{ isFitWidth: true }}
          breakpointCols={breakpointColumnsObj}
        >
          {photos.map((image, index) => (
            <div key={index}>
              <div className="flex align-center justify-center">
                <li className="list-none ml-2 mb-2">
                  <img src={image.urls.regular} alt="Image" />
                </li>
              </div>
            </div>
          ))}
        </Masonry>
      </section>
    </>
  );
}
